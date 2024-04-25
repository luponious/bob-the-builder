import { daoLibros } from '../daos/libros/libros.dao.js'

const librosDao = await daoLibros()

class LibrosService {
    async readMany({ limit = 10, page = 1, sort, query }) {
      try {
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
  
        if (
          isNaN(parsedLimit) ||
          isNaN(parsedPage) ||
          parsedLimit <= 0 ||
          parsedPage <= 0
        ) {
          const error = new Error(
            "Los parámetros 'limit' y 'page' deben ser números mayores a 0"
          );
          error.code = errorMan.INCORRECT_DATA;
          throw error;
        }
  
        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          lean: true,
          sort:
            sort === "desc"
              ? { price: -1 }
              : sort === "asc"
              ? { price: 1 }
              : null,
        };
  
        const filter = query ? { category: query } : {};
  
        return await daoLibros.readMany(filter, options);
      } catch (error) {
        throw new Error(`Error en librosService.readMany: ${error}`);
      }
    }
  
    async readOne(id) {
      try {
        if (!id) {
          const error = new Error("El ID es requerido");
          error.code = errorMan.INCORRECT_DATA;
          throw error;
        }
  
        console.log("BEFORE DAO READONE");
        const libro = await daoLibros.readOne(id);
        if (!libro) {
          const error = new Error(
            `No se encontró un libro con el ID: ${id}`
          );
          error.code = errorMan.NOT_FOUND;
          throw error;
        }
        return libro;
      } catch (error) {
        throw error;
      }
    }
  
    async createOne(libro) {
      try {
        if (!libro) {
          const error = new Error(
            "No se recibieron datos para crear el libroo"
          );
          error.code = errorMan.INCORRECT_DATA;
          throw error;
        }
  
        const createdlibro = await daoLibros.createOne(libro);
        if (!createdlibro) {
          const error = new Error("No se pudo crear el libroo");
          error.code = errorMan.UNEXPECTED_ERROR;
          throw error;
        }
        return createdlibro;
      } catch (error) {
        throw error;
      }
    }
  
    async updateOne(id, updates) {
      try {
        if (!id) {
          const error = new Error("El ID es requerido");
          error.code = errorMan.INCORRECT_DATA;
          throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
          const error = new Error("No se recibieron datos para actualizar");
          error.code = errorMan.INCORRECT_DATA;
          throw error;
        }
        const updatedlibro = await daoLibros.updateOne(id, updates);
        return updatedlibro;
      } catch (error) {
        throw new Error(`Error en librosService.updateOne: ${error}`);
      }
    }
  
    async deleteOne(id) {
      try {
        if (!id) {
          const error = new Error("El ID es requerido");
          error.code = errorMan.INCORRECT_DATA;
          throw error;
        }
        const deletedlibro = await daoLibros.deleteOne(id);
        return deletedlibro;
      } catch (error) {
        throw error;
      }
    }
  }
  
export const librosService = new LibrosService()