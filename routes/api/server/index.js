import { Router } from "express";
import create from "./create";
import getAllServers from "./getAllServers";
import deleteS from "./delete";

const router = Router();

router.post('/create', create)

router.get('/getAllServers', getAllServers);

router.delete('/delete/:id', deleteS)

export default router;