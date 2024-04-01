import express from 'express';
import auth from './routes/auth.js';
import chats from './routes/chats.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { randomId } from './util/randomID.js';
import  sessionStore  from './util/sessionStore.js';


const app = express();
const server = new createServer(app);

const corsOptions = {
  origin: '*',
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const io = new Server(server, { cors: corsOptions });


const port = process.env.PORT || 3000;



app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Socket middleware
io.use((socket, next) => {
  socket.userName = socket.handshake.auth.userName;
  console.log('User Name', socket.userName);
  next();
});

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  console.log('Session ID', sessionID);
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    console.log('Found Session', session);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.userName;
      console.log('User Refreshed');
      return next();
    }
  }
  const userName = socket.handshake.auth.userName;

  if (!userName) {
    return next(new Error("invalid username"));
  }

  // create new session
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.userName = userName;
  // Save Session
  sessionStore.saveSession({ sessionID: socket.sessionID, userID: socket.userID, userName: socket.userName })
  next();
});



// Socekt.io logic goes here
io.on('connection', (socket) => {

  emitAllUsers();

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    userName: socket.userName,
  });
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', {
      userID: socket.id,
      userName: socket.userName,
    })
    emitAllUsers();
  });
  socket.on("private message", ({ content, to }) => {
  socket.to(to).emit("private message", {
    content,
    from: socket.id,
  });
});


});
// Http server
server.listen(port, (req, res) => {
  console.log('Server is running on port 3000');
})

function emitAllUsers() {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      userName: socket.userName,
    });
  }
  io.emit("users", users);
}

app.get('/', (req, res) => {
  res.send('Working fine');
});

app.use('/auth', auth);
app.use('/', chats);