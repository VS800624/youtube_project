import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true,
        isInputOpen: false
    },
    reducers: {
        toggleMenu: (state, action) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false
        },
        closeInput: (state) => {
            state.isInputOpen = true
        }
    }
})

export const {toggleMenu, closeMenu} = appSlice.actions
export default appSlice.reducer