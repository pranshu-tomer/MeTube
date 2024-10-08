import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    loggedIn : false
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        addUser: (state,action) => {
            state.user = action.payload.user
            state.loggedIn = action.payload.loggedIn
        },
        removeUser: (state) => {
            state.user = null
            state.loggedIn = false
        }
    }
})

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer