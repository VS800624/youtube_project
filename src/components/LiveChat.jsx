import { useEffect, useState } from "react"
import ChatMessage from "./ChatMessage"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "../utils/chatSlice"
import { generateRandomName, makeRandomMessage } from "../utils/helper"



const LiveChat = () => {
    const dispatch = useDispatch()
    const [liveMessage, setLiveMessage] = useState("")
    const chatMessages = useSelector(store => store.chat.messages)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("On Form Submit", liveMessage)
        dispatch(addMessage({
            name: "Vishal Singh",
            message: liveMessage,
        }))
        setLiveMessage("")
    }
    
    useEffect(() => {
        const i = setInterval(() => {
            // API Polling  (write api fetch code here)
            // console.log("Api polling")
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(30)
            }))
        }, 2000)
        return () => clearInterval(i)
    }, [])
    
    return <>
        <div className= "w-full h-[600px] m-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
            <div>

            {
                // Disclaimer not use indexes as keys
                chatMessages && chatMessages.map((chat,index) => {
                    return <ChatMessage key={index} name={chat.name} message={chat.message}/>
                })
            }
            </div>
        </div>
        <form className="w-full p-2 ml-2 border border-black flex" onSubmit={(e) => {handleSubmit(e)}}>
            <input type="text" className="w-2/3 px-2" value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)}/>
            <button className="px-2  mx-auto bg-blue-400 rounded-sm">Submit</button>
        </form>
    </>
}

export default LiveChat

// Note: Don't directly start writing map , always build one component try to render it and ones it is looking fine and working fine then write map.

// Use redux, so When the live data will be polled an action will be dispatched that will call the reducer function which will update the slice of the store and our live chat container will be subscribe to the store it just keep on updated 
// And our live chat container will automatically updated as soon as we poll data into and pushed into the redux store. We just have to put data correctly in the redux store.