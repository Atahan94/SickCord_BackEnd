import { Router } from "express";
import createGroup from "./create";
import createChannel from "./createChannel";
import editChannel from "./editChannel";
import deleteChannel from "./deleteChannel";
import deleteGroup from "./delete";

const router = Router({ mergeParams: true });

router.post('/create', createGroup)

router.delete("/delete/:groupID", deleteGroup)

router.post('/:groupID/createChannel', createChannel)

router.post('/:groupID/editChannel/:channelID', editChannel)

router.delete('/:groupID/deleteChannel/:channelID', deleteChannel)



export default router;