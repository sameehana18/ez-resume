import {Router} from "express";
import {registerUser,
    verifyUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    resetPassword
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verifyemail").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/reset-password").post(resetPassword);



//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
export default router;

