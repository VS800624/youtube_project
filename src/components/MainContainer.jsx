import React, { useState } from "react";
import ButtonsList from "./ButtonsList";
import VideoContainer from "./VideoContainer";
import { Sidebar } from "lucide-react";

const MainContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div className="">
      {/* <Sidebar/> */}
      <ButtonsList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <VideoContainer category={selectedCategory} />
    </div>
  );
};

export default MainContainer;
