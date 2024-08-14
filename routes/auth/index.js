import { Router } from "express";
import login from "./login";
import logOut from "./logout";
import signup from "./signup";
import token from "./token";
import sessionCheck from "./protectRoute";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/login', login)
router.post('/logout', logOut)
router.post('/signup', upload.single('image') ,signup)
router.get('/token',sessionCheck, token)

  export default router;