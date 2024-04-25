import "dotenv/config";
import { adminClient } from "..";

const dbName = process.env["PGDATABASE"];

adminClient.connect();

adminClient.query(`DROP DATABASE IF EXISTS "${dbName}"`, (err) => {
  if (err) {
    console.error("Error al eliminar la base de datos", err.stack);
  } else {
    console.log(`Base de datos "${dbName}" eliminada exitosamente`);
  }
  adminClient.end();
});
