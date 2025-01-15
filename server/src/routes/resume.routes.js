import {Router} from "express";
import { createResume, getAllResumesOfUser } from "../controllers/resume.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/create-resume").post(verifyJWT, createResume);
router.route("/get-resumes").get(verifyJWT, getAllResumesOfUser);

export default router;