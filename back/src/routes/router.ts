import { Router } from "express";
import authModule from "../modules/auth/Auth.ts";
import signUp from "../modules/signup/Signup.ts";
import snailPay from "../modules/snailpay/SnailPay.ts";
export const router: Router = Router();

router.post("/login", authModule);
router.post("/signup", signUp);
router.post("/snailpay", snailPay);
