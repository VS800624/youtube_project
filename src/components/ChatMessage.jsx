import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center shadow-lg py-2'>
         <img
          className="h-8 rounded-full m-[2px]"
          src="https://www.shutterstock.com/image-illustration/user-sign-flat-style-icon-260nw-384122167.jpg"
          alt="user"
        /> 
        <span className='font-bold px-2'>{name}</span>
        <span>{message}</span>
    </div>
  )
}

export default ChatMessage