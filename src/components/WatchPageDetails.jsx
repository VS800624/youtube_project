// import { useState } from "react";


// const WatchPageDetails = ({videoId}) => {
//     const [videoDetails, setVideoDetails] = useState(null);

//      const getVideoDetails = async () => {
//         try {
//           const res = await fetch(
//             `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${GOOGLE_API_KEY}`
//           );
//           const data = await res.json();
//           console.log(data.items[0])
//           setVideoDetails(data.items[0]);
//         } catch (error) {
//           console.error("Error fetching  video details", error);
//         }
//       };
    
//     return (
//         <section>
//               {videoDetails && (
//               <div className="mt-3 p-2 l">
//                 {/* Title */}
//                 <h1 className="text-lg font-bold">{videoDetails.snippet.title}</h1>
            
//                 {/* Channel Info and Subscribe */}
//                 <div className="flex justify-between items-center mt-2">
//                   <div className="flex items-center gap-2">
//                     <img 
//                       src={`https://yt3.ggpht.com/ytc/${videoDetails.snippet.channelId}=s88-c-k-c0x00ffffff-no-rj` || videoDetails.snippet.thumbnails.standard} 
//                       alt="channel-logo" 
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                       <p className="font-semibold">{videoDetails.snippet.channelTitle}</p>
//                       <p className="text-sm text-gray-500">{timeAgo(videoDetails.snippet.publishedAt)}</p>
//                     </div>
//                   </div>
//                   <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800">
//                     Subscribe
//                   </button>
//                 </div>
            
//                 {/* Stats and Actions */}
//                 <div className="flex gap-4 mt-3 flex-wrap">
//                   <button className="bg-gray-200 px-3 py-1 rounded-full">👍 {videoDetails.statistics.likeCount} Likes</button>
//                   <button className="bg-gray-200 px-3 py-1 rounded-full">Share</button>
//                   <button className="bg-gray-200 px-3 py-1 rounded-full">Clip</button>
//                 </div>
            
//                 {/* Description */}
//                 <div className="bg-gray-100 p-3 mt-4 rounded-lg">
//                   <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                     {videoDetails.snippet.description.slice(0, 400)}...
//                   </p>
//                 </div>
//               </div>
//             )}
//         </section>
//     )
// }

// export default WatchPageDetails