import { Router } from "express";
import createChannel from "./create";
import deleteChannel from "./delete";
import editChannel from "./edit";

const router = Router({ mergeParams: true });

router.post('/create', createChannel)

router.post('/edit/:channelID', editChannel)

router.delete('/delete/:channelID', deleteChannel)

export default router;