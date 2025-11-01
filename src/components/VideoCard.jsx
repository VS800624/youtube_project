import React from 'react'
import { formatCount, timeAgo } from '../utils/helper'

const VideoCard = ({info}) => {
    // console.log(info)
    const {statistics, snippet} = info
    const {channelTitle, title, thumbnails} = snippet
  return (
    <div className='p-2 m-2 w-80 shadow-lg'>
        <img className='rounded-lg' src={thumbnails.medium.url} alt="thumbnail" />
        <ul>
            <li className='font-bold py-2'>{title}</li>
            <li>{channelTitle}</li>
            <div className='flex gap-[10px]'>
              <li>{ formatCount(statistics.viewCount)} views</li>
              <li>{timeAgo(snippet.publishTime)}</li>
            </div>
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