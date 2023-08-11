import  express  from "express";
import {getUsers} from "../controlles/user.js";

const router = express.Router()

router.get("/", getUsers);

export default router;