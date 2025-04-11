import { Router } from "express";
import {
  getCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  deleteCarrera
} from "../controllers/carrera.controller";

const router = Router();

// Definición de las rutas para Carrera
router.get("/", getCarreras);
router.get("/:id", getCarreraById);
router.post("/", createCarrera);
router.put("/:id", updateCarrera);
router.delete("/:id", deleteCarrera);

export default router;
