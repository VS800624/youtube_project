import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { GOOGLE_API_KEY } from "../utils/constants";
import { timeAgo } from "../utils/helper";
import CommentAPI from "./CommentAPI"


const WatchPage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));
  const dispatch = useDispatch();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [commentsShow , setCommentsShow] = useState(false)
  
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
        const channelRes = await fetch( `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=30&key=${GOOGLE_API_KEY}`)
        channelData =  await channelRes.json()
      }

       // Step 4: Merge + remove duplicates + exclude current video

       const combined = [ ...searchData.items,...channelData.items]
      //  const uniqueVideos = []
      //  const seen = new Set()

      //  for (const item of combined) {
      //   const vid = item.id?.videoId;
      //   if(vid && vid !== videoId && !seen.has(vid)){
      //     seen.add(vid)
      //     uniqueVideos.push(item)
      //   }
      //  }
      //  console.log(uniqueVideos)
      //  setRelatedVideos(uniqueVideos)
      //  setRelatedVideos(searchData.items || []);
       setRelatedVideos(combined || [])

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
    // <div className="flex flex-col w-full">
    //   <div className="px-5 flex ">
    //     <div >
    //       <iframe
    //       className="md:w-[900px] md:h-[600px]  w-[300px] h-[240px]"
    //         // width="900"
    //         // height="600"
    //         src={"https://www.youtube.com/embed/" + videoId}
    //         title="YouTube video player"
    //         frameBorder="0"
    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //         referrerPolicy="strict-origin-when-cross-origin"
    //         allowFullScreen
    //       ></iframe>
    //     </div>
    //     <div className="w-full">
    //       {/* <LiveChat/> */}

    //       {/* Related videos */}
    //       <div className="w-full md:h-[600px] ml-5 overflow-y-scroll ">
    //         <h3 className="font-semibold mb-3 ">Related Videos</h3>
    //         <div className="flex flex-col gap-3">
    //           {relatedVideos && relatedVideos.map((video) => (
    //             <Link key={video.id.videoId} to={"/watch?v="+ video.id.videoId}>
    //                 <div
    //                   key={video.id.videoId}
    //                   className="flex gap-3 cursor-pointer"
    //                   // onClick={() => navigate(`/watch?v=${video.id.videoId}`)}
    //                 >
    //                   {/* Thumbnail */}
    //                     <img
    //                       src={video.snippet.thumbnails.medium.url}
    //                       alt={video.snippet.title}
    //                       className="w-40 h-24 object-cover rounded-md flex-shrink-0"
    //                     />

    //                     {/* Video info */}
    //                     <div className="flex flex-col ml-3 overflow-hidden">
    //                       <h4 className="text-sm font-semibold line-clamp-2">
    //                         {video.snippet.title}
    //                       </h4>
    //                       <p className="text-xs text-gray-600 mt-1">
    //                         {video.snippet.channelTitle}
    //                       </p>
    //                       <p className="text-xs text-gray-500 mt-0.5">
    //                          {timeAgo(video.snippet.publishTime)}
    //                       </p>
    //                   </div>
    //                 </div>
    //             </Link>
    //           ))}
    //         </div>
    //       </div>

          
    //     </div>
    //   </div>
    //   {/* <CommentsContainer  videoId ={videoId}/> */}
    //   <div className="hidden md:inline-block">
    //   <CommentAPI videoId={videoId}/>
    //   </div>
    // </div>
    <div className="flex flex-col w-full px-3 md:px-5">
  <div className="flex flex-col md:flex-row w-full gap-5">
    
    {/* Video Player */}
    <div className="flex justify-center w-full md:w-[70%]">
      <iframe
        className="w-full h-[240px] sm:h-[350px] md:h-[600px] rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>

    {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <button className="bg-white px-3 py-1 rounded-full hover:bg-gray-200">👍 8.9K</button>
            <button className="bg-white px-3 py-1 rounded-full hover:bg-gray-200">Share</button>
            <button className="bg-white px-3 py-1 rounded-full hover:bg-gray-200">Save</button>
          </div>

      {/* Mobile Comments */}
    <div className="md:hidden" onClick={() => setCommentsShow(true)}>
    {!commentsShow && <h3 className="font-bold px-1 m-1">Comments</h3>}
    {( commentsShow &&  
      <div>
        <CommentAPI videoId={videoId} />
      </div>)}
    </div>

    {/* Related Videos */}
    <div className="w-full md:w-[30%] md:h-[600px] overflow-y-auto">
      <h3 className="font-semibold mb-3 text-lg md:text-base">Related Videos</h3>
      <div className="flex flex-col gap-3">
        {relatedVideos && relatedVideos.map((video) => (
          <Link key={video.id.videoId} to={`/watch?v=${video.id.videoId}`}>
            <div className="flex md:flex-row gap-3 cursor-pointer">
              {/* Thumbnail */}
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-md flex-shrink-0"
              />

              {/* Video info */}
              <div className="flex flex-col overflow-hidden">
                <h4 className="text-sm font-semibold line-clamp-2">
                  {video.snippet.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {video.snippet.channelTitle}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {timeAgo(video.snippet.publishTime)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>

  {/* Comments */}

  <div className="mt-5 hidden md:block">
    <CommentAPI videoId={videoId} />
  </div>

</div>

  );
};

export default WatchPage;
