import { firebaseRoute } from "../config.js";
import admin from "firebase-admin";
import fs from "fs";
import { productsDaoFirebase } from "../daos/index.js";

const serviceAccount = JSON.parse(fs.readFileSync(firebaseRoute, "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https:coderhouse-backend.ecomm-d3765.firebaseio.com",
});
console.log("Base de datos de Firebase conectada con exito");

const asObj = (doc) => ({ id: doc.id, ...doc.data() });
const db = admin.firestore();

class ContainerFirebase {
  constructor(collection) {
    this.collection = collection;
  }

  //PRODUCTS / CARTS- lista los datos recibidos.
  async ListAll() {
    const dbColl = db.collection(this.collection);
    try {
      const data = [];
      const objs = await dbColl.get();
      objs.forEach((doc) => {
        data.push(asObj(doc));
      });
      return data;
    } catch (err) {
      console.log(`Error en operacion de base de datos: ${err}`);
      return { error: "Error en operación de base de datos" };
    }
  }

  //PRODUCTS - crea un producto. Recibe title, price y thumbnail
  async CreateProd(data) {
    const dbColl = db.collection(this.collection);
    try {
      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const date = new Date().toLocaleString();
      const prodToAdd = {
        ...data,
        code: random(1, 9999),
        timestamp: date,
      };
      const saved = await dbColl.add(prodToAdd);
      console.log("Producto creado con exito");
      return asObj(await dbColl.doc(saved.id).get());
    } catch (err) {
      console.log(err);
      return { error: "Error en la creacion del producto" };
    }
  }

  //CARTS
  async CreateCart() {
    const dbColl = db.collection(this.collection);
    try {
      const date = new Date().toLocaleString();
      const cartToAdd = {
        timestamp: date,
        products: [],
      };
      const saved = await dbColl.add(cartToAdd);
      console.log("Carrito creado con exito");
      return asObj(await dbColl.doc(saved.id).get());
    } catch (err) {
      console.log(err);
      return { error: "Error en la creación del carrito" };
    }
  }

  //PRODUCTS - lista item por id.
  async ListById(id) {
    try {
      const dbColl = db.collection(this.collection);
      const item = await dbColl.doc(id).get();
      return asObj(item);
    } catch (err) {
      console.log(err);
      return { error: "item no encontrado" };
    }
  }

  //CART - lista los productos de x carrito
  async GetProds(idCart) {
    const dbColl = db.collection(this.collection);
    try {
      const cart = await dbColl.doc(idCart).get();
      return asObj(cart).products;
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
      return { error: "Error al listar los productos" };
    }
  }

  //CART - inserta un producto en un carrito
  async addProdToCart(idCart, idProd) {
    const dbColl = db.collection(this.collection);
    const prod = await productsDaoFirebase.ListById(idProd);
    try {
      const cart = await dbColl.doc(idCart).get();
      const cartObj = asObj(cart);
      const prodsArray = cartObj.products;
      prodsArray.push(prod);
      await dbColl.doc(idCart).set({ products: prodsArray });
      console.log("Producto agregado con exito");
      const cartUpdated = await dbColl.doc(idCart).get();
      return asObj(cartUpdated);
    } catch (err) {
      console.log(err);
      return { error: "Error al intentar ingresar el producto al carrito" };
    }
  }

  //PRODUCTS - actualiza item por id.
  async UpdateProd(id, obj) {
    const dbColl = db.collection(this.collection);
    const data = [];
    const objs = await dbColl.get();
    objs.forEach((doc) => {
      data.push(asObj(doc));
    });
    const exist = data.some(p => p.id == id)
    if(exist){
      try {
          await dbColl.doc(id).set(obj);
          return this.ListById(id);
        } catch (err) {
          console.log(err);
          return { error: "Error en la actualización del producto" };
        }
    }else{
      return { error: "No se ha encontrado ningun producto con ese ID" }
    }  
  }

  //CART - elimina un producto de un carrito
  async DeleteProd(idCart, idProd) {
    const dbColl = db.collection(this.collection);
    try {
      const cart = await dbColl.doc(idCart).get();
      const cartObj = asObj(cart);
      const prodsArray = cartObj.products;
      const update = prodsArray.filter(p => p.id !== idProd)
      await dbColl.doc(idCart).set({ products: update });
      console.log("Producto eliminado con exito");
      return this.ListById(idCart)
    } catch (err) {
      console.log(err);
      return { error: "Error al intentar eliminar el producto" };
    }
  }

  //PRODUCTS / CARTS - elimina item por id.
  async Delete(id) {
    const dbColl = db.collection(this.collection);
    try {
      await dbColl.doc(id).delete();
      console.log(`Objeto con id: ${id}, ha sido eliminado con exito`);
      return await this.ListAll();
    } catch (err) {
      console.log(err);
      return { Error: "Error en la eliminación del objeto" };
    }
  }
}

export default ContainerFirebase;
