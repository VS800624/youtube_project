import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { GOOGLE_API_KEY } from "../utils/constants";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));
  const dispatch = useDispatch();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const videoId = searchParams.get("v");

  // const getRelatedVideos = async () => {
  //   try {
  //     const res = await fetch(
  //       `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=15&key=${GOOGLE_API_KEY}`
  //     );
  //     const data = await res.json();
  //     console.log(data)
  //     setRelatedVideos(data.items || []);
  //   } catch (err) {
  //     console.error("Error fetching related videos:", err);
  //   }
  // };

  const fetchRelated = async () => {
    try {
      // Step 1: Get video details
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`
      );
        const videoData = await videoRes.json();
        const snippet = videoData.items[0]?.snippet;
        const title = snippet?.title || "";
        const channelId = snippet?.channelId;


      // Step 2: Search with title as keyword
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
          title
        )}&maxResults=10&key=${GOOGLE_API_KEY}`
      );
      const searchData = await searchRes.json();
      // setRelatedVideos(searchData.items || []);

      //Step 3: Fetch more videos from the same channel
      let channelData = {item : []}
      if(channelId){
        const channelRes = await fetch( `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=20&key=${GOOGLE_API_KEY}`)
        channelData =  await channelRes.json()
      }

       // Step 4: Merge + remove duplicates + exclude current video

       const combined = [ searchData.items,...channelData.items]
       const uniqueVideos = []
       const seen = new Set()

       for (const item of combined) {
        const vid = item.id?.videoId;
        if(vid && vid !== videoId && !seen.has(vid)){
          seen.add(vid)
          uniqueVideos.push(item)
        }
       }

       setRelatedVideos(uniqueVideos)

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (videoId) {
      // getRelatedVideos()
      fetchRelated();
    }
  }, [videoId]);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);
  return (
    <div className="flex flex-col w-full">
      <div className="px-5 flex ">
        <div>
          <iframe
            width="900"
            height="600"
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full">
          {/* <LiveChat/> */}

          {/* Related videos */}
          <div className="w-full h-[600px] ml-5 overflow-y-scroll">
            <h3 className="font-semibold mb-3 ">Related Videos</h3>
            <div className="flex flex-col gap-3">
              {relatedVideos.map((video) => (
                <Link key={video.id.videoId} to={"/watch?v="+ video.id.videoId}>
                    <div
                      key={video.id.videoId}
                      className="flex gap-3 cursor-pointer"
                      // onClick={() => navigate(`/watch?v=${video.id.videoId}`)}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-40 rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          {video.snippet.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          {video.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CommentsContainer />
    </div>
  );
};

export default WatchPage;
