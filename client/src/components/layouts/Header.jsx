import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/authstate";
import Cookies from 'js-cookie';
function Header() {
  const { login, setLogin, setUser } = useAuth();
  return (
    <div className=" bg-black border-b-2 text-[#EEEEEE] h-[7vh] rounded-sm px-4 flex items-center text-2xl">
      <div className="font-bold">Chat App</div>
      {/* Login & SignUp Button */}
      <div className="ml-auto">
        <Link
          to="/auth"
          onClick={() => {
            Cookies.remove("authToken");
            Cookies.remove("user");
            setLogin(false);
            setUser(null);
          }}
          className="mr-4 font-bold"
        >
          {!login ? "Login" : "Logout"}
        </Link>
        <Link className="font-bold" to="/auth">SignUp</Link>
      </div>
    </div>
  );
}

export default Header;
