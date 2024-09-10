import Container from "./Container";
import { UserIcon } from "../../utils/reactIcons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigateTo = useNavigate();
  return (
    <Container className={`shadow-md py-2 h-[10vh] flex items-center`}>
      <nav className="flex items-center justify-between w-full">
        <h2 className="text-blue-600 text-2xl font-extrabold">Social Post</h2>
        <div onClick={() => navigateTo('/profile')} className="cursor-pointer">
            <UserIcon color="blue" size={35} />
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
