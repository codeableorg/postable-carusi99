import { app } from "./app";
import { pool } from "./db";

const port = 7500;

// Manejar cierre de la aplicación
const gracefulShutdown = () => {
  pool.end(() => {
    console.log("\nApplication ended gracefully");
    process.exit(0);
  });
};
// Eventos de cierre para que no se queden conexiones abiertas
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));