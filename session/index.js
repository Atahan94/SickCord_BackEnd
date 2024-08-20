import session from "express-session";
import connectRedis from "connect-redis";
import { MemoryStore } from "express-session";
import redisClient from "../redis/redis-client";

//const RedisStore = connectRedis(session);
const memoryStore = new MemoryStore();
const RedisStore = connectRedis(session);


export default (app) =>
{  return session({
    store: app.get("env") === "production"
        ? new RedisStore({ client: redisClient })
        : memoryStore,
    name: "sessId",
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get("env") === "production",
      httpOnly: true,
      maxAge: 18000000, // 5 hours
      sameSite: app.get("env") === "production" ? "none" : "lax",
    },
  });}
