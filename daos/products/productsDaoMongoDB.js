import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import { URLMongoDB } from "../../config.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const prodSchema = new mongoose.Schema(
  {
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
    stock: String,
    brand: String
  },
  {
    versionKey: false,
  }
);

const model = mongoose.model("products", prodSchema);

class ProductsDaoMongoDB extends ContainerMongoDB {
  constructor() {
    super(model, URLMongoDB);
  }
}

export default ProductsDaoMongoDB;
