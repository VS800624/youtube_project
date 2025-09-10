import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import logo from "../images/youtube-logo.png"
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestion, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions]  = useState(false)

  const searchCache = useSelector(store => store.search)
  const dispatch = useDispatch()

  /**
   * searchCache = {
   * "iphone" : ["iphone 11", iphone 14]
   * }
   * searchQuery = iphone
   */

   const getSearchSuggestions = async() => {
    console.log("API call - "+searchQuery)
    const data = await fetch(YOUTUBE_SEARCH_API+ searchQuery) 
    const result = await data.json()
    // console.log(result)
    setSuggestions(result[1])

    // update cache
    dispatch(cacheResults({
      [searchQuery] : result[1]
    }))
  }
  
  useEffect(() => {
    // api call
    //  make an api call after every key press
    //  but if the difference between 2 API calls is  < 300ms
    // decline the aoi call
      const timer = setTimeout(() => {
        if(searchCache[searchQuery]) {
          setSuggestions(searchCache[searchQuery])
        } else {
          getSearchSuggestions()
        }
      }, 300)
      return () => {
        clearTimeout(timer)
      }
  }, [searchQuery])

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
  

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <header className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 items-center">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="https://toppng.com/uploads/preview/square-svg-icon-free-menu-icon-sv-11563649031azv921gf4z.png"
          alt="menu"
        />
        <img
          className="h-9 mx-2"
          src={logo}
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            placeholder="Search"
            className="w-1/2 border border-gray-400 p-2 rounded-l-full px-5"
            type="text"
            value = {searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 p-2 px-4 rounded-r-full text-center">
            🔍︎
          </button>
        </div>
        {showSuggestions && ( 
          <div className=" fixed bg-gray-200 py-2 px-5 w-[27rem] shadow-lg rounded-lg border border-gray-100">    
          <ul className="">
            {suggestion.map((s) => (
              <li 
                key={s} 
                className="py-2 px-2 shadow-sm hover:bg-gray-100"
              >
                🔍 {s}
              </li> 
            ))}
          </ul>
        </div>)}
       
      </div>
      <div className="col-span-1 ">
        <img
          className="h-8"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
          alt="user"
        /> 
      </div>
    </header>
  );
};

export default Head;
