import React, { useState } from "react";
import ButtonsList from "./ButtonsList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div className="">
      <ButtonsList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <VideoContainer category={selectedCategory} />
    </div>
  );
};

export default MainContainer;
