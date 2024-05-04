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
  `).then(() => {
  console.log("Products inserted");
  pool.end();
});
