import express from "express";
import { findAllUser, findByIdUser } from "./functions";

const app = express();

app.use("/api/user", findAllUser, findByIdUser);

export default app; 