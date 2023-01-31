import CartsDaoFile from "./carts/cartDaoFile.js";
import ProductsDaoFile from "./products/productsDaoFile.js";

import CartDaoMongoDB from "./carts/cartDaoMongoDB.js";
import ProductsDaoMongoDB from "./products/productsDaoMongoDB.js";

import CartDaoFirebase from "./carts/cartDaoFirebase.js";
import ProductsDaoFirebase from "./products/productsDaoFirebase.js";

export const cartsDaoFile = new CartsDaoFile();
export const productsDaoFile = new ProductsDaoFile();

export const cartDaoMongoDB = new CartDaoMongoDB();
export const productsDaoMongoDB = new ProductsDaoMongoDB();

export const cartDaoFirebase = new CartDaoFirebase();
export const productsDaoFirebase = new ProductsDaoFirebase();
