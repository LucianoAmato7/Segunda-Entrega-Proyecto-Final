import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import {URLMongoDB} from "../../config.js"
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const cartSchema = new mongoose.Schema({
  timestamp: String,
  products: Array
}, {
  versionKey: false
});

const model = mongoose.model("carts", cartSchema);

class CartsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super(
      model,
      URLMongoDB
    );
  }
}

export default CartsDaoMongoDB;