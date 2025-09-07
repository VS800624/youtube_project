import React from 'react'
import Button from './Button'

const lists = ["All", "Gaming", "Music", "Live", "Football", "Cricket", "News", "K-Drama", "Movies","Comedy", "WWE"]
//side scroll bar banana hai 

const ButtonsList = () => {
  return (
    <div className='flex '>
      {
        lists.map((list, index) => {
        return <Button key={index} name={list}/>
        })
      }
    </div>
  )
}

export default ButtonsList;