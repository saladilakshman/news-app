import "../App.css";
const Skeleton = () => {
  return (
    <>
      <div className="card-layout">
        {Array(10)
          .fill("")
          ?.map((card, index) => {
            return (
              <div key={index} className="card text-transparent">
                <div className="h-80 animate-pulse bg-gray-200 rounded-t"></div>
                <div className="flex justify-between items-center px-4 gap-2 pt-3">
                  <div className="w-[95%]  card-skeleton"></div>
                  <div className="bg-gray-200 rounded-full w-6 h-6 animate-pulse"></div>
                </div>
                <div className="w-[95%] card-skeleton"></div>
                <div className="w-[90%] card-skeleton"></div>
                <div className="w-[80%] card-skeleton"></div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Skeleton;
