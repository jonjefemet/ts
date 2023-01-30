import express from "express";
import UserUpdateAdapter from "../../../../src/modules/users/adapter/UserUpdateAdapter";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.patch("/:id", asyncHandler(async (req, res) => {
    console.log("🚀 ~ file: index.ts:8 ~ router.post ~ res", res)
    const adapter = new UserUpdateAdapter();
    const user = await adapter.execute({ id: req.params.id, ...req.body });
    console.log("🚀 ~ file: index.ts:11 ~ router.patch ~ user", user)

    res.json(user ?? {});
}))

export default router;