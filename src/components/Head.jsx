import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import logo from "../images/youtube-logo.png"

const Head = () => {
  const dispatch = useDispatch();

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
      <div className="col-span-10 text-center">
        <input
          placeholder="Search"
          className="w-1/2 border border-gray-400 p-2 rounded-l-full"
          type="text"
        />
        <button className="border border-gray-400 p-2 px-4 rounded-r-full text-center">
          🔍︎
        </button>
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
