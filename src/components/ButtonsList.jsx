import React from "react";
import Button from "./Button";
import { lists } from "../utils/constants";





//side scroll bar banana hai

const ButtonsList = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex md:overscroll-none overflow-x-scroll md:w-full md:items-center md:justify-center w-[350px] scroll-smooth scrollbar-hide items-center ">
       {Object.entries(lists).map(([list, id], index) => {
        return (
          <Button
            key={index}
            name={list}
             isActive={selectedCategory === list}
            onClick={() => setSelectedCategory(list)}
          />
        );
      })}
    </div>
  );
};

export default ButtonsList;
