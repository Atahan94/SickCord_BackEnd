import { Router } from "express";
import create from "./create";
import getAllServers from "./getAllServers";
import deleteS from "./delete";
import channel from "./channel"
import group from "./group"

const router = Router();

router.post('/create', create)

router.get('/getAllServers', getAllServers);

router.delete('/delete/:id', deleteS)

router.use("/:id/channel", channel)

router.use("/:id/group", group)

export default router;