import { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const result = await data.json();
      if (result.items) {
        setVideos(result.items);
      } else {
        console.error("No videos found:", result);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="flex flex-wrap">
      {videos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        videos.map((video) => ( 
        <Link key={video.id} to={"/watch?v="+ video.id}>
          <VideoCard  info={video} />
        </Link>
      ))
      )}
    </div>
  );
};

export default VideoContainer;
