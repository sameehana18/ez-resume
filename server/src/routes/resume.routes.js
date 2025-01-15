import {Router} from "express";
import { createResume, getAllResumesOfUser, getResumeWithId, deleteResume } from "../controllers/resume.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route("/create-resume").post(verifyJWT, createResume);
router.route("/get-resumes").get(verifyJWT, getAllResumesOfUser);
router.route("/get/:resumeId").get(verifyJWT, getResumeWithId);
router.route("/delete/:resumeId").delete(verifyJWT, deleteResume);

export default router;