import React from "react";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../style/style";
import { useInputValidation, useStrongPassword, useFileHandler } from "6pp";
import { usernameValidator, phoneValidator } from "../../util/validators";

function Signup_comp({ toggleAuth }) {
  const userName = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const phoneNumber = useInputValidation("", phoneValidator);

  return (
    <form className="w-full" action="#">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semi-bold mb-5">Signup</h1>
        <Stack position={"relative"} spacing={0} width="3rem">
          <Avatar sx={{ height: "3rem", width: "3rem", objectFit: "cover" }} />
          <IconButton
            sx={{ position: "absolute", bottom: "0", right: "0" }}
            componenet="label"
          >
            <>
              <CameraAlt />
              <VisuallyHiddenInput
                type="file"
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
        />
        {password.error && (
          <Typography variant="caption" color="error">
            {password.error}
          </Typography>
        )}
      </div>
      <div className="mb-5">
        <button className="w-full bg-black text-xl text-white py-2 rounded-md">
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
