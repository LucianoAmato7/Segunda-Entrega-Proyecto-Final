import ContainerProdsFile from "../../containers/ContainerProdsFiles.js";

class ProductsDaoFile extends ContainerProdsFile {
  constructor() {
    super('./data-txt/products.txt');
  }
}

export default ProductsDaoFile;
