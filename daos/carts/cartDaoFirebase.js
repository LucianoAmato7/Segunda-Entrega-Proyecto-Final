import ContainerFirebase from "../../containers/ContainerFirebase.js";

const collection = "carts";

class CartDaoFirebase extends ContainerFirebase {
  constructor() {
    super(collection);
  }
}

export default CartDaoFirebase;
