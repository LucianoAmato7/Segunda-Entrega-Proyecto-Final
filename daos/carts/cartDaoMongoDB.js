import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
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
      "mongodb+srv://coderhouse:coderhouse@coderhouse-backend.iwu4lzw.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
  }
}

export default CartsDaoMongoDB;