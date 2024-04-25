import fs from "fs/promises";
import { Libro } from "../../models/libros.model.js";
import { matches, toPOJO } from "../utils/utils.js";
import { errorMan } from "../utils/errorMan.js";

export class LibrosDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readLibros(limit, sortKey) {
    try {
      const { path } = this;
      let librosList = JSON.parse(await fs.readFile(path, "utf-8"));
      if (sortKey) {
        librosList = librosList.sort((a, b) => a[sortKey] - b[sortKey]);
      }
      return limit ? librosList.slice(0, limit) : librosList;
    } catch (error) {
      console.error("#readLibros DAO.FILE Error: ", error.code || error);
      throw new Error("Error reading libros");
    }
  }

  async #writelibros(libros) {
    try {
      const { path } = this;
      await fs.writeFile(path, JSON.stringify(libros, null, 2));
    } catch (error) {
      console.error("#writelibros DAO.FILE Error: ", error.code || error);
      throw new Error("Error writing libros");
    }
  }

  async createOne(data) {
    try {
      if (!data.title || !data.price) {
        const error = new Error("Title and price are required");
        error.code = errorMan.INCORRECT_DATA;
        throw error;
      }

      const libro = new libro(data);
      const libroPojo = libro.toPOJO();
      const libros = await this.#readLibros();

      // Check if the libro code already exists
      const isCodeExists = libros.some((p) => p.code === libroPojo.code);
      if (isCodeExists) {
        const error = new Error("libro code already exists");
        error.code = errorMan.DUPLICATED_KEY;
        throw error;
      }

      libros.push(libroPojo);
      await this.#writelibros(libros);
      return libroPojo;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const { path } = this;
      let librosList = JSON.parse(await fs.readFile(path, "utf-8"));
      const libroFound = librosList.find((libro) => libro._id === id);
      return libroFound ? toPOJO(libroFound) : null;
    } catch (error) {
      throw new Error("Error reading libro");
    }
  }

  async readMany(filter, options) {
    const { page, limit, sort } = options;
    const libros = await this.#readLibros();
    let filteredLibros = libros.filter(matches(filter));

    if (sort) {
      filteredLibros = filteredLibros.sort((a, b) => a[sort] - b[sort]);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedlibros = filteredLibros.slice(startIndex, endIndex);

    return paginatedlibros.map(toPOJO);
  }

  async updateOne(query, updates) {
    const libros = await this.#readLibros();
    const libroIndex = libros.findIndex(matches(query));

    if (libroIndex !== -1) {
      const libro = new libro({ ...libros[libroIndex], ...updates });
      libros[libroIndex] = libro.toPOJO();
      await this.#writelibros(libros);
      return libro.toPOJO();
    } else {
      throw new Error("libro no encontrado");
    }
  }

  async updateMany(query, updates) {
    const libros = await this.#readLibros();
    const librosToUpdate = libros.filter(matches(query));
    librosToUpdate.forEach((libro) => {
      const libroIndex = libros.findIndex((p) => p._id === libro._id);
      libros[libroIndex] = new libro({ ...libro, ...updates }).toPOJO();
    });
    await this.#writelibros(libros);
    return librosToUpdate.map((libro) =>
      new libro({ ...libro, ...updates }).toPOJO()
    );
  }

  async deleteOne(id) {
    const libros = await this.#readLibros();
    const libroIndex = libros.findIndex((libro) => libro._id === id);

    if (libroIndex !== -1) {
      const libro = libros[libroIndex];
      libros.splice(libroIndex, 1);
      await this.#writelibros(libros);
      return toPOJO(libro);
    } else {
      const error = new Error("libro no encontrado");
      error.code = errorMan.NOT_FOUND;
      throw error;
    }
  }

  async deleteMany(query) {
    const libros = await this.#readLibros();
    const librosToDelete = libros.filter(matches(query));
    librosToDelete.forEach((libro) => {
      const libroIndex = libros.findIndex((p) => p._id === libro._id);
      libros.splice(libroIndex, 1);
    });
    await this.#writelibros(libros);
    return librosToDelete.map(toPOJO);
  }
}
