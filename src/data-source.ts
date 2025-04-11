import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "tu_contraseña",
    database: process.env.DB_NAME || "db_empresa",
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entities/*.ts"], // Asegurar que cargue todas las entidades
    migrations: [],
    subscribers: [],
});
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("❌ Error conectando a la base de datos:", error);
    }
};
