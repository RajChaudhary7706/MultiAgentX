import Redis from "ioredis"

console.log("REDIS_URL:", process.env.REDIS_URL)

const redis = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379"
)

redis.on("connect", () => {
    console.log("Redis connecting...")
})

redis.on("ready", () => {
    console.log("Redis connected successfully")
})

redis.on("error", (err) => {
    console.error("========== REDIS ERROR ==========")
    console.error(err)
})

export default redis