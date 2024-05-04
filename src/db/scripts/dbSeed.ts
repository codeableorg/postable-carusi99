import { configDotenv } from "dotenv";
import { query, pool } from "..";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

query(`
-- Insertar datos de ejemplo en la tabla Users
INSERT INTO Users (username, password, email, firstName, lastName, role, createdAt, updatedAt)
SELECT
    'user' || s.id, -- Genera un nombre de usuario concatenando una cadena con el ID
    'password' || s.id, -- Genera una contraseña concatenando una cadena con el ID
    'user' || s.id || '@example.com', -- Genera un correo electrónico concatenando una cadena con el ID
    'Nombre' || s.id, -- Genera un nombre concatenando una cadena con el ID
    'Apellido' || s.id, -- Genera un apellido concatenando una cadena con el ID
    CASE 
        WHEN s.id % 5 = 0 THEN 'admin'
        ELSE 'user'
    END, -- Asigna roles de manera aleatoria
    NOW(), -- Fecha y hora de creación
    NOW() -- Fecha y hora de actualización
FROM generate_series(1, 50) AS s(id);

-- Insertar datos de ejemplo en la tabla Posts
INSERT INTO Posts (userId, content, createdAt, updatedAt)
SELECT
    (s.id % 50) + 1, -- ID de usuario aleatorio
    'Contenido del post ' || s.id, -- Genera un contenido de post concatenando una cadena con el ID
    NOW(), -- Fecha y hora de creación
    NOW() -- Fecha y hora de actualización
FROM generate_series(1, 100) AS s(id);

-- Insertar datos de ejemplo en la tabla Likes
INSERT INTO Likes (postId, userId, createdAt)
SELECT
    (s.id % 100) + 1, -- ID de post aleatorio
    (s.id % 50) + 1, -- ID de usuario aleatorio
    NOW() -- Fecha y hora del like
FROM generate_series(1, 200) AS s(id);
  `).then(() => {
  console.log("Products inserted");
  pool.end();
});
