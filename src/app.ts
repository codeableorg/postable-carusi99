import express from "express";
import { configDotenv } from "dotenv";
import  authRouter from "./routers/auth-router"
import postsRouter from "./routers/posts.routers"

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());

app.use(authRouter);
app.use(postsRouter)
