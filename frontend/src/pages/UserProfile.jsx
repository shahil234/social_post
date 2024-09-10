import Container from "../components/common/Container";
import { PlusIcon } from "../utils/reactIcons";

const UserProfile = () => {
  return (
    <Container className={`py-4`}>
      <div className="flex flex-col items-center gap-3">
        <div className="bg-gray-500 w-40 h-40 rounded-full relative border-green-500 border-4">
            <div className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center select-none cursor-pointer font-bold absolute bottom-[10%] right-0">
                <PlusIcon />
            </div>
        </div>
        <span className="text-lg font-semibold">UserName</span>
      </div>
    </Container>
  );
};

export default UserProfile;
