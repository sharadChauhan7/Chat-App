import User from '../modals/user.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const signup=async(req,res)=>{
    try{
        let user= new User(req.body.user);
        await user.save();
         jwt.sign({user}, process.env.JWT_KEY, { expiresIn:'7d' }, async function(err, token) {
            if(err){
                res.send("Error in generating token");
            }
            res.cookie('authToken',token,{httpOnly:true}).send({token:token,user:user});
          });
    }
    catch(err){
        // console.log error message
        console.log(err.message);

        res.send("Error in saving user");
    }
}

export const login=async(req,res)=>{
    try{
        let {phone,password}=req.body;
        let user= await User.findOne({phone:phone});
        if(user){
            jwt.sign({user}, process.env.JWT_KEY,{ expiresIn:'7d' }, function(err, token) {
                if(err){
                    res.send("Error in decoding token");
                }
                res.cookie('authToken',token,{httpOnly:true}).send({token:token,user:user});
              });
        }
    }catch(err){
        console.log(err.message);
        res.send("Error in login");
    }
}

export const getUser=async(req,res)=>{

    let allUsers=await User.find();
    res.send(JSON.stringify(allUsers));
}

