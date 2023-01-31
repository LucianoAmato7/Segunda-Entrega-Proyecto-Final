import ContainerProdsFile from "../../containers/ContainerProdsFiles.js";
import { prodsFileRoute } from "../../config.js";

class ProductsDaoFile extends ContainerProdsFile {
  constructor() {
    super(prodsFileRoute);
  }
}

export default ProductsDaoFile;
