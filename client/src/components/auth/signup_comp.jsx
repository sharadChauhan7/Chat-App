
import React,{ useState } from "react";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../style/style";
import { useInputValidation, useStrongPassword, useFileHandler } from "6pp";
import { usernameValidator, phoneValidator } from "../../util/validators";
import { redirect } from "react-router-dom"
import {useAuth} from '../../hooks/authstate'
import axios from "axios";
import Cookies from "js-cookie";

function Signup_comp({ toggleAuth }) {
  let {setLogin,setUser}=useAuth();
  const userName = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const phoneNumber = useInputValidation("", phoneValidator);

  const yourAvatar = useFileHandler("single");


  async function handelSignup(e){
    e.preventDefault();
    let user={name:userName.value,phone:phoneNumber.value,password:password.value};
    let result =await axios.post('http://localhost:3000/auth/register',{user});
    if(result.data.token){
      Cookies.set('authToken',JSON.stringify(result.data.token),{expires:7});
      Cookies.set('user',JSON.stringify(result.data.user),{expires:7});
      console.log("Woring Signup");
      setLogin(true);
      setUser(result.data.user);
      return redirect('/chat');
    }
    console.log(yourAvatar);
      console.log("Error during Signup");
   }

  return (
    <form className="w-full" >
      <div className="flex justify-between">
        <h1 className="text-4xl font-semi-bold mb-5">Signup</h1>
        <Stack position={"relative"} spacing={0} width="3rem">
          <Avatar sx={{ height: "4rem", width: "4rem", objectFit: "cover" }} src={yourAvatar.preview} />
          <IconButton
            sx={{ position: "absolute", bottom: "0", right: "0" ,left:"50px" ,top:"40px",color:"black" }}
            component="label"
          >
            <>
              <CameraAlt />
              <VisuallyHiddenInput
                type="file"
                onChange={yourAvatar.changeHandler}
              />
            </>
          </IconButton>
        </Stack>
      </div>
      <p className="mb-6">Welcome! Please enter your details.</p>
      <div className="mb-5">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          value={userName.value}
          onChange={userName.changeHandler}
          required
        />
        {userName.error && (
          <Typography variant="caption" color="error">
            {userName.error}
          </Typography>
        )}
      </div>
      <div className="mb-5">
        <input
          type="text"
          id="phone"
          placeholder="Phone"
          className="w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          value={phoneNumber.value}
          onChange={phoneNumber.changeHandler}
          required
        />
        {phoneNumber.error && (
          <Typography variant="caption" color="error">
            {phoneNumber.error}
          </Typography>
        )}
      </div>
      <div className="mb-5">
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500"
          value={password.value}
          onChange={password.changeHandler}
          required
        />
        {password.error && (
          <Typography variant="caption" color="error">
            {password.error}
          </Typography>
        )}
      </div>
      <div className="mb-5">
        <button className="w-full bg-black text-xl text-white py-2 rounded-md" onClick={handelSignup}>
          Signup
        </button>
      </div>

      <div className="flex justify-center">
        <p>
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={toggleAuth}
          >
            Login
          </span>
        </p>
      </div>
    </form>
  );
}

export default Signup_comp;
