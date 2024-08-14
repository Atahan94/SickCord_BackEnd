import { createClient } from "redis";

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379' // Redis server URL
    // password: 'yourpassword' // Uncomment and set your password if you configured one
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


export default redisClient;
