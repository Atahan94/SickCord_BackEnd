import { Router } from "express";
import login from "./login";
import logOut from "./logout";
import signup from "./signup";
import token from "./token";
import sessionCheck from "./protectRoute";

const router = Router();

router.post('/login', login)
router.post('/logout', logOut)
router.post('/signup', signup)
router.get('/token',sessionCheck, token)

  export default router;