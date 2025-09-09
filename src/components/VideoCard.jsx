import React from 'react'

const VideoCard = ({info}) => {
    // console.log(info)
    const {statistics, snippet} = info
    const {channelTitle, title, thumbnails} = snippet
  return (
    <div className='p-2 m-2 w-64 shadow-lg'>
        <img className='rounded-lg' src={thumbnails.medium.url} alt="thumbnail" />
        <ul>
            <li className='font-bold py-2'>{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount} views</li>
        </ul>
    </div>
  )
}

export const AdVideoCard = ({info}) => {
  return (
    <div className="p-1 m-1 border border-red-600">
      <VideoCard info={info}/>
    </div>)
}

export default VideoCard;