import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../../utils/env";
const Register = () => {
  const navigateTo = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);
  const handleInput = (e) => {
    switch (e.target.name) {
      case "username":
        setRegisterData((prevData) => ({
          ...prevData,
          username: e.target.value,
        }));
        break;

      case "email":
        setRegisterData((prevData) => ({ ...prevData, email: e.target.value }));
        break;
      case "password":
        setRegisterData((prevData) => ({
          ...prevData,
          password: e.target.value,
        }));
        break;

      default:
        console.log("invalid input");
    }
  };

  const registerUser = async () => {
    const data = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
    };
    try{
      const req = await axios.post(`${base_url}/api/auth/local/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(req.status === 200 || req.status === 201){
        setShowRegisteredMessage(true);
        setTimeout(() => {
          setShowRegisteredMessage(false);
          navigateTo('/login')
        }, 1500);
      }

    } catch(error){
      console.log(error)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser()
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
            name="username"
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg font-semibold" htmlFor="user-email">
            Email
          </label>
          <input
            onChange={handleInput}
            className="px-2 py-1 border border-gray-300 rounded-md outline-none"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="user-email"
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
          Register
        </button>
        <p className="text-center">Already have an account? <Link to={'/login'} className="text-blue-500 underline ">login</Link></p>
       <p style={{
        visibility: showRegisteredMessage ? "visible" : "hidden"
       }} className="text-green-800 font-semibold text-center text-lg">Register successfull</p>
      </form>
    </div>
  );
};

export default Register;
