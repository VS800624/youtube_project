import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: "search",
    initialState: {

    },
    reducers: {
        cacheResults: (state, action) => {
            // {"ip": ["iphone", "iphone11"]}
            return {...state, ...action.payload}  //not working
            // state = Object.assign(state, action.payload)   // basically this will merge the payload as well as state  at 1:30:00
        }
    }
})

export const {cacheResults} = searchSlice.actions
export default searchSlice.reducer;





/**
 * LRU cache
 */