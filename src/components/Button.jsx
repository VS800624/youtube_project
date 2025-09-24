

const Button = ({name, onClick, isActive}) => {
    return (
        <div>
            <button className={`px-5 py-2 m-2  rounded-lg ${isActive ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}`} onClick={onClick}>{name[0]}</button>
        </div>
    )
}

export default Button;