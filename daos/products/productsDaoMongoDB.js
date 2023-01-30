import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const prodSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  price: String,
  thumbnail: String,
  timestamp: String,
  code: {
    type: String,
    unique: true,
  },
  stock: String
}, {
  versionKey: false
});

const model = mongoose.model("products", prodSchema);

class ProductsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super(
      model,
      "mongodb+srv://coderhouse:coderhouse@coderhouse-backend.iwu4lzw.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
  }
}

export default ProductsDaoMongoDB;
