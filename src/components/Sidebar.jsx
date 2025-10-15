import React from "react";
import { useSelector } from "react-redux";
import {
  Home, Code2, Music, GraduationCap, Podcast,
  Film, Gamepad2, Radio, Dumbbell, Tv, Smile, Wand2
} from "lucide-react";
import { categoryIcons } from "../utils/constants";


const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // hide sidebar if menu closed
  if (!isMenuOpen) return null;

  return (
    <div className="fixed left-0 top-0 mt-[74px] h-screen md:w-60 w-1/2 
                    bg-[#0f0f0f]/90 text-white shadow-lg p-3 overflow-y-auto 
                    scrollbar-hide">
      <ul className="space-y-2">
        {Object.entries(categoryIcons).map(([name, Icon]) => (
          <li
            key={name}
            className="flex items-center gap-3 px-3 py-2 rounded-lg 
                       cursor-pointer hover:bg-gray-700 transition-all"
          >
            <span className="text-xl">{Icon}</span>
            <span className="text-sm md:text-lg font-medium">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};



// const Sidebar = () => {
//   const isMenuOpen = useSelector(store => store.app.isMenuOpen)

//   // Early return pattern
//   // if(!isMenuOpen) return null
  
//   return !isMenuOpen ? null : (
//     <div className="fixed left-0 top-0 mt-[74px] h-screen md:w-60 w-1/2 bg-white/70 shadow-lg p-3 overflow-y-auto scrollbar-hide backdrop-blur">
//       {/* Main Menu */}
//       <ul className="space-y-1">
//        {Object.entries(lists).map(([key, value]) => (
//           <li key={key}>
//             {key}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

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