import LocalDAO from "../../class/LocalDAO.js";
import fs from "fs";

let id = 1;
let arrayObj = [];

class ProductDaoLocal extends LocalDAO {
  constructor() {
    super("../../db/products.json");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductDaoLocal();
    }
    return this.instance;
  }
}

export default ProductDaoLocal;
