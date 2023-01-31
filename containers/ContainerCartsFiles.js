import { promises as fs } from "fs";
import { productsDaoFile } from "../daos/index.js";

class ContainerCartsFile {
  constructor(route) {
    this.route = route;
  }

  //Lista todos los carritos existentes.
  async ListCarts() {
    try {
      const dataJSON = await fs.readFile(this.route, "utf-8");
      const carts = dataJSON
        ? JSON.parse(dataJSON)
        : { error: "no se encontraron productos" };
      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  //Crea un carrito y devuelve su id.
  async CreateCart() {
    const cartS = await this.ListCarts();

    let lastElement = cartS.length - 1;

    let id = cartS.length > 0 ? cartS[lastElement].id + 1 : 1;

    let date = new Date().toLocaleString();

    let newCart = { id: id, timestamp: date, products: [] };

    cartS.push(newCart);

    try {
      await fs.writeFile(this.route, JSON.stringify(cartS, null, "\t"));
      console.log(`Se ha crado un carrito bajo el id: ${id}`);
      return id;
    } catch (error) {
      console.log(`Se ha producido un error: ${err}`);
    }
  }

  //Vacía un carrito y lo elimina
  async DeleteCart(id) {
    const cartS = await this.ListCarts();

    let exists = cartS.some((p) => p.id == id);

    if (exists) {
      let update = cartS.filter((p) => p.id != id);
      try {
        await fs.writeFile(this.route, JSON.stringify(update, null, "\t"));
        console.log(`el carrito con el id: ${id}, ha sido eliminado`);
        return cartS;
      } catch (error) {
        console.log(`Se ha producido un error: ${err}`);
      }
    } else {
      return { error: "el carrito que desea eliminar no existe" };
    }
  }

  //Me permite listar todos los productos que tiene el carrito con dicho id.
  async GetProds(id) {
    const cartS = await this.ListCarts();

    let exist = cartS.some((c) => c.id == id);

    let cartByID = exist
      ? cartS.find((c) => c.id == id)
      : { error: "No existe un carrito con esa id" };

    return cartByID.products;
  }

  //Para incorporar productos al carrito.
  async addProdToCart(idCart, idProd) {
    const cartS = await this.ListCarts();

    let prodById = await productsDaoFile.ProdById(idProd);

    let cartById = cartS.find((c) => c.id == idCart);

    let indexOfCart = cartS.indexOf(cartById);

    cartS[indexOfCart].products.push(prodById);

    try {
      await fs.writeFile(this.route, JSON.stringify(cartS, null, "\t"));

      console.log(
        `producto con id ${idProd}, ha sido agregado al carrito con id ${idCart}`
      );

      return cartS;
    } catch (err) {
      console.log(`Se ha producido un error: ${err}`);
    }
  }

  //Eliminar un producto del carrito por su id de carrito y de producto
  async DeleteProd(idCart, idProd) {
    const cartS = await this.ListCarts();

    let cartById = cartS.find((c) => c.id == idCart);

    if (cartById) {
      if (cartById.products.length > 0) {
        let exist = cartById.products.some((p) => p.id == idProd);
        if (exist) {
          let update = cartById.products.filter((p) => p.id != idProd);
          cartById.products = update;
          try {
            await fs.writeFile(this.route, JSON.stringify(cartS, null, "\t"));
            console.log(
              `producto con id: ${idProd}, ha sido eliminado del carrito con id ${idCart}`
            );
            return cartS;
          } catch (err) {
            console.log(`Se ha producido un error: ${err}`);
          }
        } else {
          console.log({ error: "el producto que desea eliminar no existe" });
        }
      } else {
        console.log({
          error: `El carrito con id: ${idCart}, se encuentra vacío`,
        });
      }
    } else {
      console.log({
        error: "El carrito del cual desea eliminar un producto, no existe",
      });
    }
  }
}

export default ContainerCartsFile;
