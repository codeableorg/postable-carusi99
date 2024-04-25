import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";

// Extendemos el objeto Request para incluir la propiedad user
declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userRole?: string;
    }
  }
}

const jwtSecret = "ultra-secret";

export function authenticateHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  console.log("Middleware authenticateHandler alcanzado"); // Agrega este registro de consola

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("Token no encontrado en las cabeceras"); // Agrega este registro de consola
    return next(new ApiError("No autorizado", 401));
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      userId: number;
      userRole: string;
      iat: number;
      exp: number;
    };

    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (error: any) {
    console.log("Error al verificar el token:", error.message); // Agrega este registro de consola
    return next(new ApiError("No autorizado", 401));
  }
}
