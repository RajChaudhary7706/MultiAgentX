import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import agentRouter from "./routes/agent.router.js"

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use("/", agentRouter)
app.get('/api/agent', (req, res) => {
    res.json({ message: "Hello from agent services" })
})

app.listen(PORT, () => {
    console.log(`agent started at ${PORT}`)
    connectdb()
})