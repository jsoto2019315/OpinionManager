import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares/validate-fields.js";


import { publicationDelete, publicationGet, publicationPost, publicationPut } from "./publications.controller.js";
import { validateJWT } from "../middlewares/validate-jws.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("mainText", "You must give a text").not().isEmpty(),
        validateFields
    ], publicationPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("mainText", "You must give a text").not().isEmpty(),
        validateFields
    ], publicationPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        validateFields
    ], publicationDelete
);

router.get("/", publicationGet);



export default router;