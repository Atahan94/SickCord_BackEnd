import { Router } from "express";
import create from "./create";
import getAllServers from "./getAllServers";
import deleteS from "./delete";
import channel from "./channel"
import group from "./group"
import getAllMembers from "./getAllmembers";
import addMember from "./addMember";
import sessionCheck from "../../auth/protectRoute";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', sessionCheck, upload.single('image') ,create)

router.get('/getAllServers', sessionCheck ,getAllServers);

router.delete('/delete/:id', deleteS)

router.get('/getAllMembers/:id', getAllMembers)

router.post('/:id/addMember/:memberName', addMember)


router.use("/:id/channel", channel)

router.use("/:id/group", group)

export default router;