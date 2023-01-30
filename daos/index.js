import CartsDaoFile from "./carts/cartDaoFile.js";
import ProductsDaoFile from "./products/productsDaoFile.js";

import CartDaoMongoDB from './carts/cartDaoMongoDB.js'
import ProductsDaoMongoDB from './products/productsDaoMongoDB.js'


export const cartsDaoFile = new CartsDaoFile();
export const productsDaoFile = new ProductsDaoFile()

export const cartDaoMongoDB = new CartDaoMongoDB()
export const productsDaoMongoDB = new ProductsDaoMongoDB()

