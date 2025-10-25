import { Router } from "express";
import { sendVerificationCode, validateVerificationCode } from "../controllers/smscontroller";

const router = Router();

router.post("/send-code", sendVerificationCode);
router.post("/validate-code", validateVerificationCode);

export { router };
