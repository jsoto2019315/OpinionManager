import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";


import { validateJWT } from "../middlewares/validate-jws.js";
import { commentPost, commentPut } from "./comments.controller.js";

const router = Router();

router.post(
    "/addComment",
    [
        validateJWT,
        check("publicationId", "ID isn't a valid MongoDB format").isMongoId(),
        check("commentTitle", "Title is required").not().isEmpty(),
        check("commentContent", "Content is required").not().isEmpty(),
        validateFields
    ], commentPost
);

router.put(
    "/updateComment/:id",
    [
        validateJWT,
        check("commentTitle", "Title is required").not().isEmpty(),
        check("commentContent", "Content is required").not().isEmpty(),
        validateFields
    ], commentPut
);

export default router;