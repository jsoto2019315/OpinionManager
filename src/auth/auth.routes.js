import { Router } from "express";
import { login } from "./auth.controller.js";
import { check } from "express-validator";
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post(
    "/login",
    [
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ], login
);

export default router