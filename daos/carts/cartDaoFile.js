import ContainerCartsFile from "../../containers/ContainerCartsFiles.js";

class CartsDaoFile extends ContainerCartsFile {
  constructor() {
    super("./data-txt/carts.txt");
  }
}

export default CartsDaoFile;
