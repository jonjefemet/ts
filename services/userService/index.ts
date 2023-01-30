import express from "express";
import { findAllUser, findByIdUser,createUser } from "./functions";

const app = express();

app.use("/api/user", findAllUser, findByIdUser, createUser);

export default app; 