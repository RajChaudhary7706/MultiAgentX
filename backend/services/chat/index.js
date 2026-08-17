import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
import router from "./routes/chat.route.js"

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use("/", router)
app.get('/', (req, res) => {
    res.json({ message: "Hello from chat services" })
})

app.listen(PORT, () => {
    console.log(`chat started at ${PORT}`)
    connectdb()
})