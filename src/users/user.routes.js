import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";
import { existentUserEmail, existentUserName } from "../helpers/db-validators.js";

import { userPost } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jws.js";

const router = Router();

router.post(
    "/userRegister",
    [
        check("userName", "Name is required").not().isEmpty(),
        check("userName").custom(existentUserName),
        check("email", "This isn't a valid email").isEmail(),
        check("email").custom(existentUserEmail),
        check("password", "Password must have 6 characters").isLength({ min: 6 }),
        validateFields
    ], userPost
);



export default router;
