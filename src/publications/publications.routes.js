import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";


import { publicationPost, publicationPut } from "./publications.controller.js";
import { validateJWT } from "../middlewares/validate-jws.js";

const router = Router();

router.post(
    "/addNewPublication",
    [
        validateJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("mainText", "You must give a text").not().isEmpty(),
        validateFields
    ], publicationPost
);

router.put(
    "/editPublication/:id",
    [
        validateJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("mainText", "You must give a text").not().isEmpty(),
        validateFields
    ], publicationPut
)


export default router;