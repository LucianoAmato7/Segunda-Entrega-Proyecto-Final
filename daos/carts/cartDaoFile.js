import ContainerCartsFile from "../../containers/ContainerCartsFiles.js";
import {cartsFileRoute} from "../../config.js"


class CartsDaoFile extends ContainerCartsFile {
  constructor() {
    super(cartsFileRoute);
  }
}

export default CartsDaoFile;
