import {Router} from "express";
import {registerUser,
    verifyUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verifyemail").post(verifyUser);

export default router;

