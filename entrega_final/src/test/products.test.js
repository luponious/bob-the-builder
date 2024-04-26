import { expect } from "chai";
import supertest from "supertest";

let request;

describe("Test Products API", () => {
  before(async () => {
    request = supertest("http://localhost:65535/api/products");
  });

  // [GET] /api/products
  describe("[GET] /api/products", () => {
    it("debe retornar status 200 y todos los productos", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });
  });

  // [GET] /api/products/:id
  describe("[GET] /api/products/:id", () => {
    it("debe retornar status 200 y el producto debe tener el ID pasado", async () => {
      const id_prod = "5f4e8c7d3a6f5b9e2d4c3a10";
      const response = await request.get(`/${id_prod}`);
      expect(response.status).to.eql(200);
      expect(response.body._id).to.eql(id_prod);
    });
  });

  // [POST] /api/products
  describe("[POST] /api/products", () => {
    it("debe retornar status 201 y agregar un producto", async () => {
      const newProduct = {
        title: "Producto test",
        description: "Descripción del producto test",
        code: "test",
        thumbnail: "producto.jpg",
        price: 69.42,
        stock: 5,
      };
      const response = await request.post("/").send(newProduct);
      expect(response.status).to.eql(201);
      const { createdProduct } = response.body;
      expect(createdProduct).to.include.keys(
        "title",
        "description",
        "code",
        "thumbnail",
        "price",
        "stock"
      );
      expect(createdProduct.title).to.eql(newProduct.title);
      expect(createdProduct.description).to.eql(newProduct.description);
      expect(createdProduct.code).to.eql(newProduct.code);
      expect(createdProduct.thumbnail).to.eql(newProduct.thumbnail);
      expect(createdProduct.price).to.eql(newProduct.price);
      expect(createdProduct.stock).to.eql(newProduct.stock);
    });
  });

  // [PUT] /api/products/:id
  describe("[PUT] /api/products/:id", () => {
    it("debe retornar status 200 actualizar el product _id: 62d4e5b6c7a1f8e9d3b2c1f4", async () => {
      const product = {
        title: "Producto test nuevo",
        description: "Descripción del producto test",
        code: "test",
        thumbnail: "producto.jpg",
        price: 1000,
        stock: 2,
      };
      const response = await request
        .put("/62d4e5b6c7a1f8e9d3b2c1f4")
        .send(product);
      expect(response.status).to.eql(200);
      const { newProduct } = response.body;
      expect(newProduct).to.include.keys(
        "title",
        "description",
        "code",
        "thumbnail",
        "price",
        "stock"
      );
      expect(newProduct.title).to.eql(product.title);
      expect(newProduct.description).to.eql(product.description);
      expect(newProduct.code).to.eql(product.code);
      expect(newProduct.thumbnail).to.eql(product.thumbnail);
      expect(newProduct.price).to.eql(product.price);
      expect(newProduct.stock).to.eql(product.stock);
    });
  });

  // [DELETE] /api/products/:id
  describe("[DELETE] /api/products/:id", () => {
    it("debe retornar status 200 y debe borrar el producto con _id: 62d4e5b6c7a1f8e9d3b2c1f4", async () => {
      const id_prod = "62d4e5b6c7a1f8e9d3b2c1f4";
      const response = await request.delete(`/${id_prod}`);
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql("Borrado.");
    });
  });
});
