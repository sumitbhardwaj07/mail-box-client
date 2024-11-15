import { Router } from "express";
import { requestPasswordReset, resetPassword } from "../controllers/forgotpass.controller.js";


const router = Router();


router.route("/requestpasswordreset").post(requestPasswordReset);

router.route("/resetpassword/:token").patch(resetPassword)

export default router