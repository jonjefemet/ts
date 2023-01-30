import express from "express";
import UserCreateAdapter from "../../../../src/modules/users/adapter/UserCreateAdapter";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post("/", asyncHandler(async (req, res) => {
    console.log("🚀 ~ file: index.ts:8 ~ router.post ~ res", res)
    const adapter = new UserCreateAdapter();
    const user = await adapter.execute(req.body);
    console.log("🚀 ~ file: index.ts:10 ~ router.post ~ user", user)

    res.json(user ?? {});
}))

export default router;