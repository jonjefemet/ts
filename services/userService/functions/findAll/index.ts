import express from "express";
import { CustomError } from "../../../../src/erros/CustomError";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("find All")
})

export default router;