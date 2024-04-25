import { librosService } from '../services/libros.services.js'
import { errorMan } from "../daos/utils/errorMan.js";

export async function getlibrosController(req, res, next) {
  try {
    const { limit, page, sort, query } = req.query;

    const libros = await librosService.readMany({
      limit,
      page,
      sort,
      query,
    });

    if (!libros.length) {
      const error = new Error("No se encontraron libros.");
      error.code = errorMan.NOT_FOUND;
      throw error;
    }

    res.json(libros);
  } catch (error) {
    next(error);
  }
}

export async function getLibrosController(req, res, next) {
  try {
    const { id } = req.params;
    const libro = await librosService.readOne(id);
    if (!libro) {
      const error = new Error(`No se encontró ningún libro con el ID ${id}`);
      error.code = errorMan.NOT_FOUND;
      throw error;
    }
    res.json(libro);
  } catch (error) {
    next(error);
  }
}

export async function postLibrosController(req, res, next) {
  try {
    const libro = await librosService.createOne(req.body);

    if (!libro) {
      const error = new Error("No se pudo crear el libro");
      error.code = errorMan.UNEXPECTED_ERROR;
      throw error;
    }

    res.status(201).json(libro);
  } catch (error) {
    next(error);
  }
}

export async function putLibrosController(req, res, next) {
  try {
    const { id } = req.params;
    const libro = await librosService.updateOne(id, req.body);

    if (!libro) {
      const error = new Error(`No se encontró ningún libro con el ID ${id}`);
      error.code = errorMan.NOT_FOUND;
      throw error;
    }
    res.json({
      status: 201,
      message: "libro actualizado correctamente.",
      data: libro,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteLibrosController(req, res, next) {
  try {
    const { id } = req.params;
    const libros = await librosService.deleteOne(id);

    if (!libros) {
      const error = new Error(`No se encontró ningún libro con el ID ${id}`);
      error.code = errorMan.NOT_FOUND;
      throw error;
    }

    res.json({
      status: 201,
      message: "libro eliminado correctamente.",
      data: libros,
    });
  } catch (error) {
    next(error);
  }
}
