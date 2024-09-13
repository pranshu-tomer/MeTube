import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
    origin:'http://localhost:5173', 
    credentials:true,
    optionSuccessStatus:200,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.route.js'
app.use("/api/v1/users",userRouter)

import videoRouter from './routes/video.route.js'
app.use("/api/v1/videos",videoRouter)

export default app