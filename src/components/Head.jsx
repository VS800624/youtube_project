import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import logo from "../images/youtube-logo.png";
import { YOUTUBE_SEARCH_API, GOOGLE_API_KEY } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import { AiFillYoutube } from "react-icons/ai";
import { ImYoutube2 } from "react-icons/im";
import { HiOutlineMenu } from "react-icons/hi";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInput, setShowInput] = useState(false)
  const navigate = useNavigate()

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  /**
   * searchCache = {
   * "iphone" : ["iphone 11", iphone 14]
   * }
   * searchQuery = iphone
   */

  //  this search is using live api, debouncing and caching

 const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const getSearchSuggestions = async () => {
  if (!searchQuery) return;

  if (isMobile) {
    // MOBILE VERSION (YouTube Data API)
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&key=${GOOGLE_API_KEY}&maxResults=5`
      );
      const data = await res.json();
      // console.log("Mobile API Result:", data);

      // Extract titles
      const suggestions = data.items
        ? data.items.map((item) => item.snippet.title)
        : [];

      setSuggestions(suggestions);

      dispatch(
        cacheResults({
          [searchQuery]: suggestions,
        })
      );
    } catch (err) {
      console.error("Error fetching mobile suggestions:", err);
      setSuggestions([]);
    }
  } else {
    // DESKTOP VERSION (Suggest API)
    try {
      const res = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const result = await res.json();
      console.log("Desktop API Result:", result);

      setSuggestions(result[1]);

      dispatch(
        cacheResults({
          [searchQuery]: result[1],
        })
      );
    } catch (err) {
      console.error("Error fetching desktop suggestions:", err);
      setSuggestions([]);
    }
  }
};



  // const getVideos = async (searchTerm) => {
  //   try {
  //     const res = await fetch(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&key=${GOOGLE_API_KEY}&maxResults=5`
  //     );
  //     const data = await res.json();
  //     console.log("Fetching videos for:", searchTerm);
  //     console.log("API response:", data);
  //     setVideos(data.items);
  //   } catch (err) {
  //     console.error("Error Fetching videos:", err);
  //   }
  // };

  const handleSearch = () => {
  if (searchQuery.trim()) {
    navigate(`/results?search=${searchQuery}`);
  }
};

  useEffect(() => {
    // api call
    //  make an api call after every key press
    //  but if the difference between 2 API calls is  < 300ms
    // decline the aoi call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /**
   * press key - i
   * re-render the component
   * useEffect()
   * start timer => make an api call after 300 ms
   *
   * press key - ip
   * before 300ms if you press new key then
   * destroy the component(useEffect return method)
   * re-render the component
   * useEffect()
   * start timer => make an api call after 500 ms
   *
   * setTimeout(300) - make an api call
   *
   *
   * as soon as the timer code is run there is the place inside the browser where it will just start the setTimeout of 300ms and js will continue doing his works what it will do it just store the setTimeout somewhere and it will start the timer and after 500ms it will call getSearchSuggestions() but what happened is even before 300s we pressed another key stroke so, when we pressed another key stroke it triggers the reconciliation process again when it triggers the reconciliation process again it has to clear things up  this   () => {clearTimeout(timer) }  function is called when the component is unmounted (when the component is again refreshing) so what will happen is this function is called every time my component is re-rendered it is clearing the timer so what will happen even before the 300ms expires it just decline or it just clear this timer up then the component re-renders and the useEffect() is called again and a new timer is set up and now it is again counting again 300ms if the 300ms is passed and no other key is pressed then it will make an api call
   * React calls the returned function when the component unmounts or before the effect runs again.
   * This ensures that you don’t leave any active timers running, preventing memory leaks or unexpected behavior.
   * so, () => { clearTimeout(timer) } is a cleanup function. It stops the timer from executing if it’s no longer needed.
   */

  useEffect(() => {}, [])

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <>
    <header className="flex items-center justify-between md:grid md:grid-flow-col p-5 m-2 shadow-lg sticky top-0  z-50 backdrop-blur">
     {!showInput &&  <div className="flex md:col-span-1 col-span-4 items-center">
          <HiOutlineMenu
            onClick={toggleMenuHandler}
            className="h-8 w-8 cursor-pointer"
          />

      </div>}
        {!showInput && <div className=" ml-[50px] md:mx-auto flex-1 md:block flex justify-center">
        <img className="h-9 mx-2 " src={logo} />
        </div>}
      <div className="md:col-span-10 col-span-5 px-10">
        {/* desktop input */}
        <div className="hidden md:block">
          <input
            placeholder="Search"
            className="w-1/2 border border-gray-400 p-2 rounded-l-full px-5"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch}
          />
          <button className="border border-gray-400 p-2 px-4 rounded-r-full text-center"
           onClick={handleSearch}
          >
            🔍︎
          </button>
        </div>
        {/* mobile input */}
        <div className="md:hidden flex">
          {showInput &&  <i className="fa-solid fa-arrow-left relative text-[1.2rem] left-[-36px] top-[14px]"  onClick={() => {
            window.history.back() 
            setShowInput(!showInput)
            }} ></i>}
          {showInput && <input 
            placeholder="Search"
            className="w-full border border-gray-400 p-2  px-5 "
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch}
          />}
          <button className="absolute top-[20px] right-[10px] md:static p-2 px-4 rounded-r-full text-center"
           onClick={() => {
            handleSearch()
            setShowInput(!showInput)
          }}
          >
            🔍︎
          </button>
        </div>
        {showSuggestions && (
          <div className=" fixed bg-gray-200 py-2 md:px-5 px-2 w-[16rem]  md:w-[27rem] shadow-lg rounded-lg border border-gray-100">
            <ul className="">
              {suggestion.map((s) => (
                <li
                  key={s}
                  className="py-2 px-2 shadow-sm hover:bg-gray-100 cursor-pointer "
                  onMouseDown={() => {
                    setSearchQuery(s);
                    setShowSuggestions(false);
                     handleSearch(); 
                    // getVideos(s);
                  }}
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="md:col-span-1 col-span-3 md:flex hidden">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
          alt="user"
        />
      </div>
    </header>

    {/* <div className="mt-5">
  {videos.map((video) => (
    <div key={video.id.videoId} className="mb-5">
      <h4 className="font-semibold">{video.snippet.title}</h4>
      <img 
        src={video.snippet.thumbnails.medium.url} 
        alt={video.snippet.title} 
        className="cursor-pointer"
        onClick={() => setSelectedVideo(video.id.videoId)}
      />
    </div>
  ))}
</div> */}

    </>
  );
};

export default Head;


//**What’s happening with onClick
//  Input has:
// <input
//   onFocus={() => setShowSuggestions(true)}
//   onBlur={() => setShowSuggestions(false)}
// />

// onBlur fires when the input loses focus.
// Clicking a suggestion causes the input to lose focus, triggering onBlur.
// React handles onClick after onBlur.
// So what happens:
// You click on a suggestion <li>.
// Input loses focus → onBlur runs → setShowSuggestions(false) hides the suggestions.
// The <li> you clicked is removed from the DOM before onClick fires.
// Result: click never registers.

// Why onMouseDown works
// onMouseDown fires when the mouse button is pressed, before the input loses focus.

// Timing:

// Mouse button pressed → onMouseDown fires → you can handle the click logic.

// Then input loses focus → onBlur fires → suggestions hide.

// Because onMouseDown fires earlier than onBlur, your click is registered before the <li> disappears.
//  */