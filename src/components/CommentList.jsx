import React from 'react'
import Comment from './Comment'

const CommentList = ({ comments = [], videoId }) => {
  return comments.map((comment, index) => {
    return (
      <div key={index}>
        <Comment data={comment} />
        {comment.replies && comment.replies.length > 0 && (
          <div className="pl-5 border border-l-black ml-5">
            <CommentList comments={comment.replies} />
          </div>
        )}
      </div>
    )
  })
}

export default CommentList



// getting error in making recursive component (<CommentList/>) in line 11 because some replies are undefined  so i give ({ comments = [] }) -> ensures comments is never undefined.
// Added a check comment.replies && comment.replies.length > 0 before rendering nested CommentList.