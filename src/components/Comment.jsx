

const Comment = ({data}) => {
    const {name, text, replies} = data
    return (
        <div className="flex items-center shadow-sm bg-gray-100 p-2 rounded-lg my-2">
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png" alt="user" 
             className="h-10"
            />
            <div className="p-3">
                <p className="font-bold">{name}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}


export default Comment;