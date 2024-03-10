import express from 'express';
import User from './modals/user.js';
import auth from './routes/auth.js';
import cors from 'cors';
const app = express();


const port = process.env.PORT || 3000;

const corsOptions = {
    origin:"http://localhost:5173",
    optionsSuccessStatus:200,
    credentials:true,
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue:false,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.listen(port,(req,res)=>{
    console.log('Server is running on port 3000');
})

app.get('/',(req,res)=>{
    res.send('Working fine');
});

app.use('/auth',auth);