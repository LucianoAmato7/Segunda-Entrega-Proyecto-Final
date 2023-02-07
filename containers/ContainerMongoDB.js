import mongoose from "mongoose";
import {productsDaoMongoDB} from '../daos/index.js'

class ContainerMongoDB {
  constructor(model, route) {
    this.model = model;
    this.route = route;
  }


  //PRODUCTS / CARTS - lista los datos recibidos.
  async ListAll() {
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try {
        let data = await this.model.find({});
        return data;
      } catch (error) {
        console.log(`Error en operacion de base de datos: ${error}`);
        return {error: 'Error en operacion de base de datos'}
      }
    } catch (error) {
      console.log("Error en la conexión a la base de datos " + error);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }


  //PRODUCTS - crea un producto. Recibe title, price y thumbnail.
  async CreateProd(data) {
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try {
        function random(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const date = new Date().toLocaleString();
        const prodToAdd = {
          ...data,
          code: random(1, 9999).toString(),
          timestamp: date,
        };
        const newProd = new this.model(prodToAdd);
        await newProd.save();
        console.log("Producto creado con exito");
        return newProd;
      } catch (err) {
        console.log(err);
        return {error: 'Error en la creacion del producto'}
      }
    } catch (error) {
      console.log("Error en la conexión a la base de datos " + error);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }

  //CARTS
  async CreateCart(){
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try{
        const date = new Date().toLocaleString();
        const cartToAdd = {
          timestamp: date,
          products: []
        };
        const newCart = new this.model(cartToAdd);
        await newCart.save();
        console.log("Carrito creado con exito");
        return await this.model.find({});
      }catch(err){
        console.log(err);
        return {error: 'Error en la creación del carrito'}
      }
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }

  //PRODUCTS / CARTS - LISTA PRODUCTO O CARRITO POR ID
  async ListById(id) {
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try {
        const data = await this.model.findById(id);        
        return data;
      } catch (error) {
        console.log(error)
        return { error: "item no encontrado"}
      }
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }

  //CART - lista los productos de x carrito
  async GetProds(idCart){
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try{
        const cart = await this.model.findById(idCart)
        return cart.products
      }catch(err){
        console.log(err);
        return {error: 'Error al listar el carrito'}
      }
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
      return {error: 'Error al listar los productos'}
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }
  
  //CART - inserta un producto en un carrito
  async addProdToCart(idCart, idProd){
    const prod = await productsDaoMongoDB.ListById(idProd)
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try{
        const cart = await this.model.findById(idCart)
        const prodsArray = cart.products
        prodsArray.push(prod)
        await this.model.updateOne({_id: idCart}, {products: prodsArray})
        console.log('Producto agregado con exito');
        return await this.model.findById(idCart)
      }catch(err){
        console.log(err);
        return {error: 'Error al intentar ingresar el producto al carrito'}
      }
    } catch (error){
      console.log(`Error en operacion de base de datos: ${error}`);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }

  //PRODUCTS - recibe y actualiza un producto según su id.
  async UpdateProd(id, obj) {
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try {
        await this.model.updateOne({ _id: id }, obj);
        const prods = await this.model.find({});
        console.log('Producto actualizado');
        return prods;
      } catch (err) {
        console.log(err);
        return {error: 'Error en la actualización del producto'}
      }
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }

  //CART - elimina un producto de un carrito
  async DeleteProd(idCart, idProd){
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('conexion de mongoDB');
      try{
        const cart = await this.model.findById(idCart)
        const prodsArray = cart.products
        const update = prodsArray.filter(p => p._id != idProd)
        await this.model.updateOne({_id: idCart}, {products: update})
        console.log('Producto eliminado con exito');
        return await this.model.findById(idCart)
      }catch(err){
        console.log(err);
        return {error: 'Error al intentar eliminar el producto'}
      }    
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }



  }

  //PRODUCTS / CARTS - elimina por id
  async Delete(id) {
    try {
      await mongoose.connect(this.route, {
        serverSelectionTimeoutMS: 5000,
      });
      try {
        await this.model.deleteOne({ _id: id });
        console.log(`Objeto con id: ${id}, ha sido eliminado con exito`);
        return await this.model.find({})
      } catch (err) {
        console.log(err);
        return {Error: 'Error en la eliminación del objeto'}
      }
    } catch {
      console.log(`Error en operacion de base de datos: ${error}`);
    } finally {
      mongoose.disconnect().catch((err) => {
        throw new Error("error al desconectar la base de datos");
      });
    }
  }
}

export default ContainerMongoDB;
