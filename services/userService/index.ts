import express from "express";
import { findAllUser, findByIdUser,createUser, updateUser } from "./functions";

const app = express();

app.use("/api/user", findAllUser, findByIdUser, createUser, updateUser);

export default app; 