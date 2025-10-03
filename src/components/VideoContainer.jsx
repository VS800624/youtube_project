import { useEffect, useState } from "react";
import { GOOGLE_API_KEY, lists, YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";

import { Link } from "react-router-dom";

const VideoContainer = ({category}) => {
  const [videos, setVideos] = useState([]);
  const [showInput, setShowInput] = useState(false)
  //  console.log(category)
   const catId = lists[category]
   

  const getVideos = async () => {
    try {
      let url = ""

      if (category === "All") {
        // Most popular videos
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=50&key=${GOOGLE_API_KEY}`;
      } else if (catId) {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${catId}&maxResults=50&key=${GOOGLE_API_KEY}`;
      } else {
        // Fallback for categories with no official ID
        url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(category)}&key=${GOOGLE_API_KEY}`;
      }

      const data = await fetch(url)
      // const data = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&key="+ GOOGLE_API_KEY);
      const result = await data.json();
      console.log(result)
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
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center">
     {/* {videos[0] && <AdVideoCard info ={videos[0]}/>} */}
      {videos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        videos.map((video) => { 
          const videoId = video.id.videoId || video.id
          return (
        <Link key={videoId } to={"/watch?v="+ videoId}>
          <VideoCard  info={video} onClick={() => setShowInput(false)}/>
        </Link> )
      })
      )}
    </div>
  );
};

// if (category === "All") {
//         // Most popular videos
//         url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=50&key=${GOOGLE_API_KEY}`;
//       } else {
//         // Search by category (q param)
//         url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(category)}&key=${GOOGLE_API_KEY}`;
//       }


export default VideoContainer;
