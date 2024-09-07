import dotenv from 'dotenv'
dotenv.config()

import dbConnect from './db/index.js'
import  app  from './app.js'

dbConnect()
.then(() => {
    app.listen(process.env.PORT || 8000,() => {
        console.log("Server is listening");
    })
})
.catch((err) => {
    console.log("MongoDB connection failed")
})