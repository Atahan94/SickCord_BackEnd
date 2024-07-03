import { Router } from "express";
import login from "./login";
import signup from "./signup";
import token from "./token";

const router = Router();

router.post('/login', login)
router.post('/signup', signup)
router.get('/token', token)

  export default router;