import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import carreraRoutes from "./routes/carrera.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Usa las rutas
app.use("/api/carreras", carreraRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos establecida correctamente.");
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a la base de datos:", error);
  });
