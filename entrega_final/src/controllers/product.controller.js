import ProductService from "../services/product.service.js";
import { logger } from "../utils/index.js";

class ProductController {
  constructor() {}

  async getProducts(req, res) {
    const {
      params: { id },
    } = req;
    if (id) {
      try {
        const product = await ProductService.getProductById(id);
        if (!product) {
          res.status(404);
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.render("./pages/error.ejs", {
            code: 404,
            message: "Producto no encontrado",
          });
        }
        res.status(200);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/single-product.ejs", {
          product,
          cartId: req.cookies.cartIdCookie,
          categories: req.cookies.categoriesCookie,
          userId: req.cookies.userIdCookie,
        });
      } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 500,
          message: "Error interno, el servidor tiene mal día",
        });
      }
    } else {
      try {
        const products = await ProductService.getAllProducts();
        if (!products) {
          res.status(404);
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.render("./pages/error.ejs", {
            code: 404,
            message: "No se pudo encontrar ni un producto!",
          });
        }
        res.status(200);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json(products);
      } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 500,
          message: "El servidor necesita un respiro, ¡demasiado trabajo!",
        });
      }
    }
  }

  async getProductsByCategoryName(req, res) {
    const {
      params: { category },
    } = req;
    try {
      const products = await ProductService.getProductsByCategoryName(
        category.charAt(0).toUpperCase() + category.slice(1) // Primera letra mayúscula para search p/ cartegory en Mongo
      );
      if (!products) {
        // No se encuentran productos en la categoría
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: `Producto: ${category} Sin stock`,
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("index.ejs", {
        products,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        sectionTitle: category,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async createProduct(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
      res.status(422);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 422,
        message: "¡Faltan ingredientes! No se pudo crear el producto",
      });
    } else {
      try {
        const createdProduct = await ProductService.createProduct(body);
        res.status(201);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json({ createdProduct });
      } catch (err) {
        // Server sobrecargado
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  async updateProduct(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const newProduct = req.body;
      const product = await ProductService.getProductById(id);
      if (!product) {
        // Producto no encontrado
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Product Not Found",
        });
      }
      const updatedProduct = await ProductService.updateProduct(id, newProduct);
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ updatedProduct });
    } catch (err) {
      // Error interno
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async deleteProductById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const product = await ProductService.getProductById(id);
      if (!product) {
        // Producto no encontrado perdido en la lista!
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Product Not Found",
        });
      }
      const deletedProduct = await ProductService.deleteProductById(id);
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.json({ deletedProduct });
    } catch (err) {
      // Error interno se cayó el carro!
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}

export default new ProductController();
