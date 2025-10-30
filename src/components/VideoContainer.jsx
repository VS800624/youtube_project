import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GOOGLE_API_KEY, lists } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const category = useSelector((store) => store.category.selectedCategory);
  const catId = lists[category];

  const getVideos = async () => {
    try {
      let url = "";

      if (category === "All") {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=50&key=${GOOGLE_API_KEY}`;
      } else if (catId) {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${catId}&maxResults=50&key=${GOOGLE_API_KEY}`;
      } else {
        url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${encodeURIComponent(
          category
        )}&key=${GOOGLE_API_KEY}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setVideos(data.items || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    getVideos();
  }, [category]);

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center">
      {videos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        videos.map((video) => {
          const videoId = video.id.videoId || video.id;
          return (
            <Link key={videoId} to={"/watch?v=" + videoId}>
              <VideoCard info={video} />
            </Link>
          );
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
