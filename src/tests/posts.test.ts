import { describe, beforeEach, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app"; // Importa tu aplicación Express
import { truncateTable } from "../db/utils"; // Funciones auxiliares para configurar la base de datos
import * as db from "../db";

describe("Backend Testing", () => {
  // Antes de cada prueba, limpiar y configurar la base de datos
  beforeEach(async () => {
    // Limpia todas las tablas relevantes
    await truncateTable("Posts");

    // Inserta datos de prueba en las tablas
    await db.query(`
      INSERT INTO Posts (userId, content, createdAt, updatedAt)
      VALUES (1, 'Post 1 by user 1', NOW(), NOW()),
             (2, 'Post 1 by user 2', NOW(), NOW());
    `);
  });
  it("should get all posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveLength(2);
  });
  it("should get posts by username", async () => {
    const response = await request(app).get("/posts/user1");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].username).toBe("user1");
  });

  it("should create a new post", async () => {
    const newPost = {
      content: "New post content"
    };
    const response = await request(app).post("/posts").send(newPost);
    expect(response.statusCode).toBe(201);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data.content).toBe(newPost.content);
  });
  it("should update a post", async () => {
    const postIdToUpdate = 1;
    const updatedPostData = {
      content: "Updated post content"
    };
    const response = await request(app).patch(`/posts/${postIdToUpdate}`).send(updatedPostData);
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBeTruthy();
    expect(response.body.data.content).toBe(updatedPostData.content);
  });

});
