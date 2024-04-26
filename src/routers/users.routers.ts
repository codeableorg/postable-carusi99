import express from "express";
import { getUsers, updateUsers, deleteUsers } from "../services/users.service";
import { ApiError } from "../middlewares/error";
import { authenticateHandler } from "../middlewares/authenticate";
import { User } from "../models/auth";

const userRouter = express.Router();

userRouter.get("/me", authenticateHandler, async (req, res, next) => {
  if (req.userId === undefined) {
    return res.status(401).json({ ok: false, message: "No autorizado" });
  }
  try {
    const user = await getUsers(req.userId);
    if (!user) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }
    res.json({
      ok: true,
      data: {
        id: user.id,
        username: user.username,
        firstName: user.firstname,
        email: user.email,
        role: user.role,
        createdAt: user.createdat,
        updatedAt: user.updatedat
      }
    });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/me", authenticateHandler, async (req, res, next) => {
  if (req.userId === undefined) {
    return res.status(401).json({ ok: false, message: "No autorizado" });
  }
  try {
    const user: User = req.body;
    const updatedUser = await updateUsers(req.userId, user);
    if (!user) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }
    res.json({
      ok: true,
      data: {
        id: user.id,
        username: user.username,
        firstName: user.firstname,
        email: user.email,
        role: user.role,
        createdAt: user.createdat,
        updatedAt: user.updatedat
      }
    });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/me", authenticateHandler, async (req, res, next) => {
  if (req.userId === undefined) {
    return res.status(401).json({ ok: false, message: "No autorizado" });
  }
  try {
    const result = await deleteUsers(req.userId);
    if (!result) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }
    res.json({ ok: true, message: "Usuario eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
})
export default userRouter;