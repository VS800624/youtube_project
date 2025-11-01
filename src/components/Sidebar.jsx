import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryIcons } from "../utils/constants";
import { setCategory } from "../utils/categorySlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const selectedCategory = useSelector((store) => store.category.selectedCategory)
  const dispatch =  useDispatch()

  return (
    <>
      {/* Overlay (semi-transparent background) */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed left-0 top-0 mt-[74px] h-screen md:w-60 w-1/2 
                    bg-gray-300/90  shadow-lg p-3 overflow-y-auto 
                    scrollbar-hide z-50 transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="space-y-2">
          {Object.entries(categoryIcons).map(([name, Icon]) => (
            <li
              key={name}
              onClick={() => dispatch(setCategory(name))}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all 
                ${
                  selectedCategory === name
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-800"
                }`}
            >
              <span className="text-xl">{Icon}</span>
              <span className="text-sm md:text-lg font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
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