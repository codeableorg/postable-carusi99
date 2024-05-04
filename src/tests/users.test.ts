import { describe, beforeEach, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app"; // Importa tu aplicación Express
import { truncateTables } from "../db/utils"; // Funciones auxiliares para configurar la base de datos
import * as db from "../db";

describe("Backend Testing", () => {
  // Antes de cada prueba, limpiar y configurar la base de datos
  beforeEach(async () => {
    // Limpia todas las tablas relevantes
    await truncateTables(["Users", "Posts", "Likes"]);

    // Inserta datos de prueba en las tablas
    await db.query(`
      INSERT INTO Users (username, password, email, firstName, lastName, role, createdAt, updatedAt)
      VALUES ('user1', 'password1', 'user1@example.com', 'John', 'Doe', 'user', NOW(), NOW()),
             ('user2', 'password2', NULL, 'Jane', NULL, 'admin', NOW(), NOW());
             `);
            });
            
