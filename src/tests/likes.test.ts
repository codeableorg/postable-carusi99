import { describe, beforeEach, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app"; // Importa tu aplicación Express
import { truncateTable } from "../db/utils"; // Funciones auxiliares para configurar la base de datos
import * as db from "../db";

describe("Backend Testing", () => {
  // Antes de cada prueba, limpiar y configurar la base de datos
  beforeEach(async () => {
    // Limpia todas las tablas relevantes
    await truncateTable("likes");
    await db.query(`
    INSERT INTO Likes (postId, userId, createdAt)
    VALUES (1, 1, NOW()),
           (1, 2, NOW());
           `);
});
it("should like a post", async () => {
    const response = await request(app).post("/posts/1/like").set('Authorization', 'Bearer your-auth-token');
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data.postid).toBe(1);
    expect(response.body.data.userid).toBe(1); // Assuming user 1 liked the post
  });
})