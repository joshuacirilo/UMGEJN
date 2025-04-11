import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Carrera } from "../entities/Carrera";

const carreraRepository = AppDataSource.getRepository(Carrera);

export const getCarreras = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreras = await carreraRepository.find();
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las carreras" });
  }
};

export const getCarreraById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const carrera = await carreraRepository.findOneBy({ idCarrera: id });

    if (!carrera) {
      res.status(404).json({ message: "Carrera no encontrada" });
      return;
    }

    res.json(carrera);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar la carrera" });
  }
};

export const createCarrera = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevaCarrera = carreraRepository.create(req.body);
    const resultado = await carreraRepository.save(nuevaCarrera);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la carrera" });
  }
};

export const updateCarrera = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const carrera = await carreraRepository.findOneBy({ idCarrera: id });

    if (!carrera) {
      res.status(404).json({ message: "Carrera no encontrada" });
      return;
    }

    carreraRepository.merge(carrera, req.body);
    const resultado = await carreraRepository.save(carrera);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la carrera" });
  }
};

export const deleteCarrera = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await carreraRepository.delete({ idCarrera: id });

    if (result.affected === 0) {
      res.status(404).json({ message: "Carrera no encontrada" });
      return;
    }

    res.json({ message: "Carrera eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la carrera" });
  }
};
