import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GOOGLE_API_KEY } from "../utils/constants";
import { timeAgo } from "../utils/helper";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const [showInput, setShowInput] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");

  const getVideos = async (term) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${term}&key=${GOOGLE_API_KEY}&maxResults=50`
      );
      const data = await res.json();
      console.log(data);
      setVideos(data.items);
      // setVideos(data.items.filter(item => item.id.kind === "youtube#video"));
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      getVideos(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="mt-5 px-5 mx-auto">
      {videos.map((video) => (
        <div
          key={video.id.videoId}
          className="mb-5 cursor-pointer flex flex-col md:flex-row  gap-4"
          onClick={() => {
            navigate(`/watch?v=${video.id.videoId}`)
            setShowInput(true)
        }}
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="rounded-lg"
          />
          <div className="flex flex-col ml-3 ">
            <h4 className="text-sm font-semibold line-clamp-2">
              {video.snippet.title}
            </h4>
            <p className="text-[1.1rem] text-gray-600 mt-1">
              {video.snippet.channelTitle}
            </p>
            <p className=" text-gray-500 mt-0.5">
              {timeAgo(video.snippet.publishTime)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
