import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/env";
import { useUser } from "../../store/useUser";
const Login = () => {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [loginResponse, setLoginResponse ] = useState({});
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const navigateTo = useNavigate();
  const { setUserInfo,userInfo } = useUser();

  const loginUser = async () => {
    try {
      const res = await axios.post(`${base_url}/api/auth/local`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = res.data;
      if(res.status){
        setShowLoginMessage(true);
        setTimeout(() => {
            setShowLoginMessage(false);
            setLoginResponse({
              jwt: responseData?.jwt,
              username: responseData?.user?.username,
              email: responseData?.user?.email
            })
            // navigateTo('/home')
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const handleInput = (e) => {
    switch (e.target.name) {
      case "identifier":
        setLoginData((prev) => ({ ...prev, identifier: e.target.value }));
        break;

      case "password":
        setLoginData((prev) => ({ ...prev, password: e.target.value }));
        break;
      default:
        console.log("invalid input");
    }
  };
  return (
    <div className=" h-[90vh] flex items-center justify-center">
      <form
        className="sm:w-4/5 md:w-3/5 lg:w-2/5 max-w-[500px] space-y-2 "
        action=""
      >
        <div className="flex flex-col gap-1">
          <label className="text-lg font-semibold" htmlFor="username">
            Username
          </label>
          <input
            onChange={handleInput}
            className="px-2 py-1 border border-gray-300 rounded-md outline-none"
            name="identifier"
            type="text"
            id="username"
            placeholder="Enter username or email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg font-semibold" htmlFor="pass">
            Password
          </label>
          <input
            onChange={handleInput}
            className="px-2 py-1 border border-gray-300 rounded-md outline-none"
            type="password"
            placeholder="Enter your password"
            name="password"
            id="pass"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white text-lg w-full mt-2 rounded-md"
          type="submit"
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 underline ">
            register
          </Link>
        </p>
        <p style={{
          visibility: showLoginMessage ? "visible" : "hidden"
        }} className="text-green-800 font-semibold text-center text-lg">Login Successful</p>
      </form>
    </div>
  );
};

export default Login;
