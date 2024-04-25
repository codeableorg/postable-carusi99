import express from "express";
import { validationHandler } from "../middlewares/validation";
import { userSchema } from "../models/auth";
import { createUser, validateCredentials } from "../services/auth-service";
import jwt from "jsonwebtoken";

const jwtSecret = "ultra-secret";

const authRouter = express.Router();

//POST/register:

authRouter.post(
  "/register",
  validationHandler(userSchema),
  async (req, res, next) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json({
        ok: true,
        message: "Usuario registrado exitosamente",
        data: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

//POST/Login:

authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await validateCredentials(req.body);
    // console.log(req.session);
    const payload = { userId: user.id, userRole: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "60m" });
    res.json({
      ok: true,
      message: "Login exitoso",
      data: { token: token },
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
