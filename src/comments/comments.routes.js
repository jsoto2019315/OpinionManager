import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";


import { validateJWT } from "../middlewares/validate-jws.js";
import { commentDelete, commentGet, commentPost, commentPut } from "./comments.controller.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("publicationId", "ID isn't a valid MongoDB format").isMongoId(),
        check("commentTitle", "Title is required").not().isEmpty(),
        check("commentContent", "Content is required").not().isEmpty(),
        validateFields
    ], commentPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("commentTitle", "Title is required").not().isEmpty(),
        check("commentContent", "Content is required").not().isEmpty(),
        validateFields
    ], commentPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        validateFields
    ], commentDelete
);

router.get("/", commentGet);


export default router;