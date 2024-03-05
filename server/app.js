import express from 'express';
import User from './modals/user.js';
const app = express();


const port = process.env.PORT || 3000;


app.listen(port,(req,res)=>{
    console.log('Server is running on port 3000');
})

app.get('/',(req,res)=>{
    res.send('Working fine');
});