import express from "express";
import UserFindAllAdapter from "../../../../src/modules/users/adapter/UserFindAllAdapter";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const adapter = new UserFindAllAdapter();
    const users = await adapter.execute();
    res.json(users ?? []);
}))

export default router;