import express, { json } from "express";
import { getUsers, updateUsers, deleteUsers } from "../services/users.service";
import { ApiError } from "../middlewares/error";
import { authenticateHandler } from "../middlewares/authenticate";
import { User } from "../models/users";

const userRouter = express.Router();

userRouter.get("/me", authenticateHandler, async (req, res, next) => {
  if (req.userId === undefined) {
    return next(new ApiError("Unauthorized", 401));
  }
  try {
    const profile = await getUsers(req.userId);
    return res.json({
      ok: true,
      data: {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        firstName: profile.firstname,
        lastName: profile.lastname,
        createdAt: profile.createdat,
        updatedAt: profile.updatedat,
      },
    });
  } catch (error) {
    next(new ApiError("Unauthorized", 401));
  }

});

//PATCH/me:
userRouter.patch(
  "/user/me",
  authenticateHandler,
  async (req, res, next) => {
    if (req.userId === undefined) {
      return next(new ApiError("Unauthorized", 401));
    }
    try {
      const userData: User = req.body;
      const profile = await updateUsers(req.userId, userData);
      res.json({
        ok: true,
        message: "User updated successfully",
        data: {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          firstName: profile.firstname,
          lastName: profile.lastname,
          createdAt: profile.createdat,
          updatedAt: profile.updatedat,
        },
      });
    } catch (error) {
      next(
        new ApiError(
          "Bad request: only firstName, lastName or email can be edited",
          401
        )
      );
    }
  }
);

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