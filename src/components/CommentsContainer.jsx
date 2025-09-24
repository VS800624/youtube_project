import Comment from "./Comment"
import CommentList from "./CommentList"


const commentData = [
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        replies: [
            {
                name: "John",
                text: "Lorem ipsum dolor sit.",
                replies: [
                    {
                        name: "John",
                        text: "Lorem ipsum dolor sit.", 
                    }
                ]
            },
        ]
    },
    {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        replies: [
            {
                name: "John",
                text: "Lorem ipsum dolor sit.",
                replies: [
                    {
                         name: "John",
                         text: "Lorem ipsum dolor sit.",
                    }
                ]
            },
        ]
    },
]


const CommentsContainer = ({videoId}) => {
    return (
        <div className="m-5 p-2">
            <h2 className="text-xl font-bold">Comments:</h2>
            <CommentList comments={commentData} videoId={videoId}/>
        </div>
    )
}

export default CommentsContainer


/**
 * n level nested comments:
 * we have to use recursion to create more comments
 */