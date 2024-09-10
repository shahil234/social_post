import merge from "../../utils/twMerge";

const Container = ({ children, className }) => {
  return (
    <div className={`${merge("px-2 sm:px-4 md:px-6 lg:px-20", className)}`}>
      {children}
    </div>
  );
};

export default Container;
