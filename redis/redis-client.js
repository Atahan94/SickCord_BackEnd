import { createClient } from "redis";

const redisClient = createClient({
    url: 'redis://red-cr100jbtq21c73cmgmvg:6379' // Redis server URL
    
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


export default redisClient;
