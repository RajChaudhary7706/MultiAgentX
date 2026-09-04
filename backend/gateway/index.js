import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import cookieParser from "cookie-parser"
import protect from "./middleware/auth.middleware.js"
import getCurrentUser from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import morgan from "morgan"
dotenv.config()

const PORT = process.env.PORT
const app = express()


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(morgan('dev'))
app.use(cookieParser())
//middleware
app.use('/api/auth', proxy(process.env.AUTH_SERVICE_URL));
app.use('/api/chat', protect, proxyWithHeader(process.env.CHAT_SERVICE_URL));
app.use('/api/agent', protect, proxy(process.env.AGENT_SERVICE_URL, {
    proxyReqPathResolver: (req) => req.path
}));
app.get('/api/me', protect, getCurrentUser)

app.get('/', (req, res) => {
    res.json({ message: "Hello from gateway" })
})
app.listen(PORT, () => {
    console.log(`Gateway started at ${PORT}`)
})