import { Router } from "express";
import server from "./server";
import user from "./users"
const router = Router();

router.use('/server', server)

router.use('/user', user)

export default router;