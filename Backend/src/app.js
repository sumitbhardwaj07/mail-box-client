import cookieParser from "cookie-parser"
import express from "express"
import cors from"cors"


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import emailRouter from "./routes/email.routes.js"
import forgotpassRouter from "./routes/forgotpass.route.js"
app.use("/api/v1/users", userRouter);

app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/forgotpass", forgotpassRouter )

export {app}