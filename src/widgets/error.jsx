import error from "../assets/error.png";
const Error = () => {
  return (
    <div className=" flex flex-col justify-center items-center gap-3 min-h-[48.3rem] ">
      <img src={error} alt="" className="w-32 " />
      <h2 className="text-base lg:text-xl dark:text-white">
        Sorry! unable to get news on this topic
      </h2>
    </div>
  );
};

export default Error;
