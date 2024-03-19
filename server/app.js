import express from 'express';
import auth from './routes/auth.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server= new createServer(app);

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
};
const io = new Server(server,{cors:corsOptions});


const port = process.env.PORT || 3000;



app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Socket middleware
io.use((socket,next)=>{
    console.log('Socket middleware');
    socket.userId=socket.handshake.auth.userId;
    console.log(socket.userId);
    next();
});

// Socekt.io logic goes here
io.on('connection',(socket)=>{
    // console.log('User connected');
    // console.log(socket.id);
    socket.on("message",(req)=>{
        console.log(socket.id," said ",req);          
        socket.broadcast.emit('Welcome',socket.id);
    });
    socket.on('disconnect',(socket)=>{
        console.log('User disconnected');
    });
});
// Http server
server.listen(port,(req,res)=>{
    console.log('Server is running on port 3000');
})

app.get('/',(req,res)=>{
    res.send('Working fine');
});

app.use('/auth',auth);