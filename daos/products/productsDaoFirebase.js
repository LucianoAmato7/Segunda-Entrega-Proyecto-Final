import ContainerFirebase from "../../containers/ContainerFirebase.js";

const collection = "products";

class ProductsDaoFirebase extends ContainerFirebase {
  constructor() {
    super(collection);
  }
}

export default ProductsDaoFirebase;
