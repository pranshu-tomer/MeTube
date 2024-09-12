import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/User/User'

export const store = configureStore({
    reducer: {
        user: userSlice,
    }
})