import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: false,
        isInputOpen: false
    },
    reducers: {
        toggleMenu: (state, action) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu: (state) => {
            state.isMenuOpen = true
        },
        closeInput: (state) => {
            state.isInputOpen = true
        }
    }
})

export const {toggleMenu, closeMenu} = appSlice.actions
export default appSlice.reducer