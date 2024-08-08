import { categories } from "../utils/data";
import { GoShareAndroid } from "react-icons/go";
import { NewsContext } from "../App";
import { useContext, useMemo, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../assets/placeholder.jpg";
const News = () => {
  const {
    state: { activecategory, currentnews },
    dispatch,
  } = useContext(NewsContext);
  const fetching = useMemo(
    () => () => {
      axios
        .get(
          `https://gnews.io/api/v4/top-headlines?category=${
            categories[activecategory]
          }&lang=en&apikey=${import.meta.env.VITE_APP_API_KEY}`
        )
        .then((res) => {
          dispatch({
            type: "news-fetch-success",
            payload: res?.data?.articles,
          });
        })
        .catch((err) => {
          dispatch({ type: "news-fetch-failure" });
          alert(err.message, "showing dummy data");
        });
    },
    [activecategory, dispatch]
  );

  useEffect(() => {
    dispatch({ type: "get-news-by-category", payload: activecategory });
    fetching();
  }, [fetching, activecategory, dispatch]);
  return (
    <>
      <div className="card-layout">
        {currentnews?.map(
          ({ title, content, url, image, publishedAt }, index) => {
            return (
              <div key={index} className="card">
                <LazyLoadImage
                  src={image}
                  alt=""
                  placeholderSrc={placeholder}
                  className="rounded-t  h-60 w-fit"
                />
                <div className="flex flex-col gap-3 pb-3 pt-2">
                  <h1 className="text-base lg:text-xl pl-2 font-medium">
                    {title}
                  </h1>
                  <div className="flex justify-between items-center px-2 ">
                    <h3 className="text-base lg:text-lg ">
                      <span className="font-medium">Published on:</span>{" "}
                      {new Date(publishedAt).toLocaleString("en-IN")}
                    </h3>
                    <GoShareAndroid
                      className="text-3xl hover:bg-gray-100 hover:text-black rounded-full p-1"
                      onClick={() => {
                        navigator.share({
                          url: url,
                        });
                      }}
                    />
                  </div>
                  <h1 className="text-base lg:text-base text-pretty pl-2 capitalize">
                    {content.toLowerCase().split("...")[0]}...
                    <a href={url} className="pl-2 text-blue-500">
                      Read more
                    </a>
                  </h1>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default News;
