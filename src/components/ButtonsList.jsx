import React from "react";
import Button from "./Button";

const lists = {
  All: null,           
  Gaming: 20,         
  Music: 10,         
  Sports: 17,         
  News: 25,           
  Entertainment: 24,       
  Education: 27,
  Movies: 1,           
  Comedy: 23,
  "Sci-Tech": 28         
};



//side scroll bar banana hai

const ButtonsList = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex ">
       {Object.entries(lists).map((list, index) => {
        return (
          <Button
            key={index}
            name={list}
             isActive={selectedCategory === list[0]}
            onClick={() => setSelectedCategory(list)}
          />
        );
      })}
    </div>
  );
};

export default ButtonsList;
