import session from "express-session";
//import connectRedis from "connect-redis";
import { MemoryStore } from "express-session";
//import  redisClient  from "../cache/index.js";

//const RedisStore = connectRedis(session);
const memoryStore = new MemoryStore(); 

 
export default app => session({
    store:  memoryStore,
    name: 'sessId',
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get('env') === 'production' ? true : false,
      httpOnly: false,
      maxAge: 18000000, // 5 hours
      sameSite: app.get('env') === 'production' ? 'none' : 'lax'
    },
  })