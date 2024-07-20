import { Router } from "express";
import getFriends from "./getFriends";
import addFriends from "./addFriend";
import getInvitations from "./getInvitations";
import respondInvitation from "./respondInvitation";
import createChat from "./createChat";
import getChat from "./getChats";

const router = Router();

router.get("/getFriends", getFriends);
router.post("/addFriend", addFriends);


router.get("/getInvitations", getInvitations);
router.post("/respondInvitation/:id", respondInvitation);


router.post("/createChat/:id", createChat)
router.get("/getChats", getChat)

export default router;