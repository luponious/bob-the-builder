// Local DAO
import ProductDaoLocal from "./product/ProductDaoLocal.js";
import CartDaoLocal from "./cart/CartDaoLocal.js";

// Memory DAO
import ProductDaoMemory from "./product/ProductDaoMemory.js";
import CartDaoMemory from "./cart/CartDaoMemory.js";


// Mongo DAO
import ProductDaoMongo from "./product/ProductDaoMongo.js";
import CartDaoMongo from "./cart/CartDaoMongo.js";
import OrderDaoMongo from "./order/OrderDaoMongo.js";
import UserDaoMongo from "./user/UserDaoMongo.js";
import MessageDaoMongo from "./message/MessageDaoMongo.js";

let ProductDAO = null;
let CartDAO = null;
let OrderDAO = null;
let MessageDAO = null;
let UserDAO = null;

const PERS = process.env.PERS || "mongo";

switch (PERS) {
  case "local":
    ProductDAO = ProductDaoLocal.getInstance();
    CartDAO = CartDaoLocal.getInstance();
    break;

  case "memory":
    ProductDAO = ProductDaoMemory.getInstance();
    CartDAO = CartDaoMemory.getInstance();
    break;

  case "mongo":
    ProductDAO = ProductDaoMongo.getInstance();
    CartDAO = CartDaoMongo.getInstance();
    OrderDAO = OrderDaoMongo.getInstance();
    MessageDAO = MessageDaoMongo.getInstance();
    UserDAO = UserDaoMongo.getInstance();
    break;
}

export { ProductDAO, CartDAO, UserDAO, OrderDAO, MessageDAO };
