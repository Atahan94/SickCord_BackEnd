import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' // Redis server URL
    
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


export default redisClient;
