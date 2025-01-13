import {Router} from "express";
import {registerUser,
    verifyUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    resetPassword,
    forgotPassword,
    updateUser
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);



//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/update-user").patch(verifyJWT, upload.single("avatar"), updateUser);
export default router;

