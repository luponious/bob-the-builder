import fs from "fs/promises";
import { Order } from "./mongoose/orders.model.mongoose.js";
import { matches, toPOJO } from "../utils/utils.js";


export class OrdersDaoFiles {
  constructor(path) {
    this.path = path;
  }

}
