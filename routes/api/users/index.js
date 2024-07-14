import { Router } from "express";
import getFriends from "./getFriends";
import addFriends from "./addFriend";

const router = Router();

router.get("/getFriends", getFriends);

router.post("/addFriend", addFriends);

export default router;