import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../utils/constants";
import { timeAgo } from "../utils/helper";

const CommentsContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);

     const fetchComments = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&textFormat=plainText&key=${GOOGLE_API_KEY}`
        );
        const data = await res.json()
        // console.log(data)
        setComments(data.items || [])
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

  useEffect(() => {
    if (videoId) fetchComments();
  }, [videoId]);

  return (
     <div className="mt-6 mx-[20px] w-[90%]">
      <h3 className="font-semibold text-lg mb-4">{comments.length} Comments</h3>
      <div className="flex flex-col gap-4">
        {comments.map((c) => {
          const comment = c.snippet.topLevelComment.snippet;
          return (
            <div
              key={c.snippet.topLevelComment.id}
              className="flex gap-3"
            >
              {/* Profile Picture */}
              <img
                src={comment.authorProfileImageUrl}
                alt={comment.authorDisplayName}
                className="w-10 h-10 rounded-full"
              />

              {/* Comment Content */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{comment.authorDisplayName}</p>
                  <p className="text-xs text-gray-500">{timeAgo(comment.publishedAt)}</p>
                </div>
                <p className="text-sm mt-1">{comment.textDisplay}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span>👍 {comment.likeCount}</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
