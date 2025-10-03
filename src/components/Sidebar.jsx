import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen)

  // Early return pattern
  // if(!isMenuOpen) return null
  
  return !isMenuOpen ? null : (
    <div className="fixed left-0 top-0 mt-[74px] h-screen md:w-60 w-1/2 bg-white/70 shadow-lg p-3 overflow-y-auto scrollbar-hide backdrop-blur">
      {/* Main Menu */}
      <ul className="space-y-1">
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Shorts
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Videos
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Live
        </li>
      </ul>

      {/* Divider */}
      <hr className="my-3" />

      {/* Subscriptions */}
      <h1 className="font-semibold text-sm px-2 mb-1">Subscriptions</h1>
      <ul className="space-y-1">
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Movies
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Sports
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Gaming
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Music
        </li>
      </ul>

      {/* Divider */}
      <hr className="my-3" />

      {/* Watch Later */}
      <h1 className="font-semibold text-sm px-2 mb-1">Watch Later</h1>
      <ul className="space-y-1">
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Movies
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Sports
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Gaming
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          Music
        </li>
      </ul>
    </div>
  )
}

// const Sidebar = () => {
//     const isMenuOpen = useSelector(store => store.app.isMenuOpen)
//   return !isMenuOpen ? null : (
//     <div className="p-5 shadow-lg w-[12rem] h-screen  sticky top-[100px] z-50">
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li>Shorts</li>
//         <li>Videos</li>
//         <li>Live</li>
//       </ul>
//       <h1 className='font-bold pt-5'>Subscriptions</h1>
//       <ul>
//         <li>Movies</li>
//         <li>Sports</li>
//         <li>Gaming</li>
//         <li>Music</li>
//       </ul>
//       <h1 className='font-bold pt-5'>Watch Later</h1>
//       <ul>
//         <li>Movies</li>
//         <li>Sports</li>
//         <li>Gaming</li>
//         <li>Music</li>
//       </ul>
//     </div>
//   )
// }

export default Sidebar