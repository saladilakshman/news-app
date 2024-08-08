import "./App.css";
import { Header, News, Skeleton, Error } from "./widgets/index";
import { useReducer, createContext, useEffect } from "react";
import { dummydata } from "./utils/data";
export const NewsContext = createContext();
function App() {
  const NewsAppState = {
    currentnews: [],
    dummynews: dummydata,
    darkmode: false,
    isloading: true,
    iserror: false,
    activecategory: 0,
    inputvalue: "",
  };
  function newsreducer(state, action) {
    switch (action.type) {
      case "theme-switch":
        return {
          ...state,
          darkmode: !state.darkmode,
        };
      case "data-fetched":
        return {
          ...state,
          isloading: false,
        };
      case "data-fetching":
        return {
          ...state,
          isloading: true,
          iserror: false,
          currentnews: [], // Clear previous news
        };
      case "get-news-by-category":
        return {
          ...state,
          isloading: true,
          iserror: false,
          currentnews: [], // Clear previous news
          activecategory: action.payload,
        };
      case "input-insertion":
        return {
          ...state,
          inputvalue: action.payload.trim().toLowerCase(),
        };
      case "news-fetch-success":
        return {
          ...state,
          isloading: false,
          iserror: false,
          currentnews: action.payload,
        };
      case "news-fetch-failure":
        return {
          ...state,
          isloading: false,
          iserror: false,
          currentnews: state.dummynews,
        };
      case "search-news":
        return {
          ...state,
          isloading: false,
          iserror: false,
          inputvalue: "",
          currentnews: action.payload,
        };
      case "search-news-fail":
        return {
          ...state,
          isloading: false,
          currentnews: [],
          iserror: true,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(
    newsreducer,
    NewsAppState,
    (initialstate) => {
      const isdatastored = window.localStorage.getItem("news-app-state");
      return JSON.parse(isdatastored) || initialstate;
    }
  );
  useEffect(() => {
    window.localStorage.setItem("news-app-state", JSON.stringify(state));
  }, [state]);
  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      <div
        className={`${
          state?.darkmode && "dark"
        }  transition-colors duration-500`}
      >
        <Header />
        <main className="card-main">
          {state?.isloading && <Skeleton />}
          {state?.currentnews && <News />}
          {state?.iserror && <Error />}
        </main>
      </div>
    </NewsContext.Provider>
  );
}

export default App;
