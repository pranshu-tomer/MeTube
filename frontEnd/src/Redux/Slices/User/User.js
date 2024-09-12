import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : 1
}

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        addUser: (state,action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = 0;
        }
    }
})

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer