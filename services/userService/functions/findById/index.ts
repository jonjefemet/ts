import express from "express";
import UserFindByIdAdapter from "../../../../src/modules/users/adapter/UserFindByIdAdapter";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/:id", asyncHandler(async (req, res) => {
    const adapter = new UserFindByIdAdapter();
    const user = await adapter.execute(+req.params.id);
    console.log("🚀 ~ file: index.ts:10 ~ router.get ~ user", user)

    res.json(user ?? {});
}))

export default router;