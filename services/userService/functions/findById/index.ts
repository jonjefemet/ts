import express from "express";
import UserFindByIdAdapter from "../../../../src/modules/users/adapter/UserFindByIdAdapter";

const router = express.Router();

router.get("/:id",(req, res, next) => {
    
    const adapter = new UserFindByIdAdapter();
    adapter.execute(+req.params.id).then(result => {
        console.log("🚀 ~ file: index.ts:11 ~ adapter.execute ~ res", result);
        res.json(result ?? {});
    }).catch(next);

})

export default router;