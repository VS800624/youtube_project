import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { lists } from "../utils/constants";
import { setCategory } from "../utils/categorySlice";

const ButtonsList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((store) => store.category.selectedCategory);

  return (
    <div className="flex overflow-x-scroll scrollbar-hide items-center w-[350px] md:w-full md:justify-center scroll-smooth">
      {Object.entries(lists).map(([list]) => (
        <Button
          key={list}
          name={list}
          isActive={selectedCategory === list}
          onClick={() => dispatch(setCategory(list))}
        />
      ))}
    </div>
  );
};

export default ButtonsList;
