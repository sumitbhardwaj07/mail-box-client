import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { deleteEmail, getInboxEmails, getSentEmails, sendEmail, updateStatus } from "../controllers/email.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/send").post(verifyJWT, upload.single('file'), sendEmail);

router.route("/inbox").get(verifyJWT, getInboxEmails);
router.route("/sent").get(verifyJWT, getSentEmails);
router.route("/:id").delete(verifyJWT, deleteEmail);
router.route("/:id").patch(verifyJWT,updateStatus)

export default router;