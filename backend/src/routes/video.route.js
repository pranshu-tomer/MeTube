import Router from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { uploadVideo } from '../controllers/video.controller.js'
import upload from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/upload").post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    uploadVideo)

export default router