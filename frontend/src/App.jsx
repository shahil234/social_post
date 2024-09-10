import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/common/Navbar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserProfile from "./pages/UserProfile";

const App = () =>{
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element ={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}
export default App;