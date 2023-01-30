import { promises as fs } from "fs";

class ContainerProdsFile {
  constructor(route) {
    this.route = route;
  }

  async ListProducts() {
    try {
      const dataJSON = await fs.readFile(this.route, "utf-8");
      const products = dataJSON
        ? JSON.parse(dataJSON)
        : { error: "no se encontraron productos" };
        return products;
    } catch (error) {
      console.log(error);
    }
  }

  async ProdById(id) {
    const prodS = await this.ListProducts();

    let exist = prodS.some((p) => p.id == id);

    if (exist) {
      const prod = prodS.find((prod) => prod.id == id);
      return prod;
    } else {
      return { error: "producto no encontrado" };
    }
  }

  async CreateProd(data) {
    const prodS = await this.ListProducts();

    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let lastElement = prodS.length - 1;

    let id = prodS.length > 0 ? prodS[lastElement].id + 1 : 1;

    let date = new Date().toLocaleString();

    let prodToAdd = { id: id, ...data, timestamp: date, code: random(1, 9999) };

    prodS.push(prodToAdd);

    try {
      await fs.writeFile(this.route, JSON.stringify(prodS, null, "\t"));
      return prodToAdd
    } catch (error) {
      console.log(`Se ha producido un error: ${err}`);
    }
  }

  async UpdateProdById(data, id) {
    const prodS = await this.ListProducts();

    data.id = Number(id);

    let index = prodS.findIndex((data) => data.id == id);

    prodS.splice(index, 1, data);

    try {
      await fs.writeFile(this.route, JSON.stringify(prodS, null, "\t"));
      console.log(`el producto con el id: ${id}, ha sido actualizado`);
      return prodS;
    } catch (err) {
      console.log(`Se ha producido un error: ${err}`);
    }
  }

  async DeleteProdById(id) {
    const prodS = await this.ListProducts();

    let exists = prodS.some((p) => p.id == id);

    if (exists) {
      let item = prodS.find((p) => p.id == id);

      let indice = prodS.indexOf(item);

      prodS.splice(indice, 1);

      try {
        await fs.writeFile(this.route, JSON.stringify(prodS, null, "\t"));
        console.log(`el producto con el id: ${id}, ha sido eliminado`);
        return prodS
      } catch (err) {
        console.log(`Se ha producido un error: ${err}`);
      }
    } else {
      console.log("el producto que desea eliminar no existe");
    }
  }
}

export default ContainerProdsFile;
