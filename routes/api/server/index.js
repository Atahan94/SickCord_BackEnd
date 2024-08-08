import { Router } from "express";
import create from "./create";
import getAllServers from "./getAllServers";
import deleteS from "./delete";
import channel from "./channel"
import group from "./group"
import getAllMembers from "./getAllmembers";
import addMember from "./addMember";
import sessionCheck from "../../auth/protectRoute";

const router = Router();

router.post('/create', sessionCheck ,create)

router.get('/getAllServers', sessionCheck ,getAllServers);

router.delete('/delete/:id', deleteS)

router.get('/getAllMembers/:id', getAllMembers)

router.post('/:id/addMember/:memberName', addMember)


router.use("/:id/channel", channel)

router.use("/:id/group", group)

export default router;