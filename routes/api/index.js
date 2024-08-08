import { Router } from "express";
import server from "./server";
import user from "./users"
import sessionCheck from "../auth/protectRoute";

const router = Router();

router.use('/server', server)

router.use('/user', sessionCheck , user)

export default router;