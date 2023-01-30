import express from "express";

import { cartsDaoFile } from "./daos/index.js";
import { productsDaoFile } from "./daos/index.js";

import { productsDaoMongoDB } from "./daos/index.js";
import { cartDaoMongoDB } from "./daos/index.js";

const app = express();

const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

app.use("/api", router);

//VARIABLE BOOLEANA PARA EL ADMIN
let admin = true;

//FUNCIONALIDADES PRODUCTOS
// ----------------------------------------------|

//devuelve todos los productos
router.get("/products", (req, res) => {
  if (admin) {

    //----TRABAJA CON ARCHIVOS-----
    // productsDaoFile.ListProducts()
    // .then((prods) => {
    //   res.json(prods);
    // });

    //----TRABAJA CON MONGODB-----
    // productsDaoMongoDB.ListAll()
    // .then((data)=>{res.json(data)})

    //----TRABAJA CON FIREBASE-----

  } else {
    res.json({
      error: -1,
      description: "ruta 'api/products' método 'GET' no autorizada",
    });
  }
});

// devuelve un producto según su id
router.get("/products/:id", (req, res) => {
  if (admin) {
    let { id } = req.params;

    //----TRABAJA CON ARCHIVOS-----
    // productsDaoFile.ProdById(id)
    // .then((prod) => {
    //   res.json(prod);
    // });

    //----TRABAJA CON MONGODB-----
    // productsDaoMongoDB.ListById(id)
    // .then((data)=>{
    //   res.json(data)
    // })

    //----TRABAJA CON FIREBASE-----

  } else {
    res.json({
      error: -1,
      description: "ruta '/api/products' método 'GET' no autorizada",
    });
  }
});

//recibe y agrega un producto, y lo devuelve con su id asignado.
router.post("/products", (req, res) => {
  if (admin) {
    let newProd = req.body;

    //----TRABAJA CON ARCHIVOS-----
    // productsDaoFile.CreateProd(newProd)
    // .then((id) => {
    //   res.json(id);
    // });

    //----TRABAJA CON MONGODB-----
    // productsDaoMongoDB.CreateProd(newProd)
    // .then((prod)=>{res.json(prod)})
      
    //----TRABAJA CON FIREBASE-----


  } else {
    res.json({
      error: -1,
      description: "ruta '/api/products' método 'POST' no autorizada",
    });
  }
});

//recibe y actualiza un producto según su id.
router.put("/products/:id", (req, res) => {
  if (admin) {
    let { id } = req.params;
    let prod = req.body;

    //----TRABAJA CON ARCHIVOS-----
    // productsDaoFile.UpdateProdById(prod, id)
    // .then((prods) => {
    //   res.json(prods);
    // });

    //----TRABAJA CON MONGODB-----
    // productsDaoMongoDB.UpdateProd(id, prod)
    // .then((prods)=>{res.json(prods)})

    //----TRABAJA CON FIREBASE-----


  } else {
    res.json({
      error: -1,
      description: "ruta '/api/products' método 'PUT' no autorizada",
    });
  }
});

//elimina un producto según su id.
router.delete("/products/:id", (req, res) => {
  if (admin) {
    let { id } = req.params;

    //----TRABAJA CON ARCHIVOS-----
    // productsDaoFile.DeleteProdById(id)
    // .then((prods) => {
    //   res.json(prods);
    // });

    //----TRABAJA CON MONGODB-----
    // productsDaoMongoDB.Delete(id)
    // .then((data)=>{res.json(data)})

    //----TRABAJA CON FIREBASE-----


  } else {
    res.json({
      error: -1,
      description: "ruta '/api/products' método 'DELETE' no autorizada",
    });
  }
});

//FUNCIONALIDADES CARRITO
// ----------------------------------------------|

//Crea un carrito y devuelve su id.
router.post("/cart", (req, res) => {

  //----TRABAJA CON ARCHIVOS-----
  // cartsDaoFile.CreateCart()
  // .then((id) => {
  //   res.json(id);
  // });

  //----TRABAJA CON MONGODB-----
  // cartDaoMongoDB.CreateCart()
  // .then((data)=>{res.json(data)})

  //----TRABAJA CON FIREBASE-----

});

//Vacía un carrito y lo elimina.
router.delete("/cart/:id", (req, res) => {
  let { id } = req.params;

  //----TRABAJA CON ARCHIVOS-----
  // cartsDaoFile.DeleteCart(id)
  // .then((carts) => {
  //   res.json(carts);
  // });

  //----TRABAJA CON MONGODB-----
  // cartDaoMongoDB.Delete(id)
  // .then((data)=>{res.json(data)})

  //----TRABAJA CON FIREBASE-----

});

//Me permite listar todos los productos que tiene el carrito con dicho id.
router.get("/cart/:idCart/products", (req, res) => {
  let { idCart } = req.params;

  //----TRABAJA CON ARCHIVOS-----
  // cartsDaoFile.GetProds(idCart)
  // .then((prods) => {
  //   res.json(prods);
  // });

  //----TRABAJA CON MONGODB-----
  // cartDaoMongoDB.GetProds(idCart)
  // .then((prods)=>{res.json(prods)})

  //----TRABAJA CON FIREBASE-----

});

//Para incorporar productos al carrito.
router.post("/cart/:idCart/products/:idProd", (req, res) => {
  let { idCart } = req.params;
  let { idProd } = req.params;

  //----TRABAJA CON ARCHIVOS-----
  // cartsDaoFile.addProdToCart(idCart, idProd)
  // .then((carts) => {
  //   res.json(carts);
  // });

  //----TRABAJA CON MONGODB-----
  // cartDaoMongoDB.addProdToCart(idCart, idProd)
  // .then((data)=>{res.json(data)})

  //----TRABAJA CON FIREBASE-----

});

//Eliminar un producto del carrito por su id de carrito y de producto.
router.delete("/cart/:idCart/products/:idProd", (req, res) => {
  let { idCart } = req.params;
  let { idProd } = req.params;

  //----TRABAJA CON ARCHIVOS-----
  // cartsDaoFile.DeleteProd(idCart, idProd)
  // .then((carts) => {
  //   res.json(carts);
  // });

  //----TRABAJA CON MONGODB-----
  // cartDaoMongoDB.DeleteProd(idCart, idProd)
  // .then((data)=>{res.json(data)})

  //----TRABAJA CON FIREBASE-----

});

//En el caso de requerir una ruta no implementada en el servidor:
app.use("*", (req, res) => {
  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.status(404).send({
    error: -2,
    description: `ruta ${fullUrl} método ${req.method} no implementada`,
  });
});

//INICIAMOS EL SERVIDOR
// ----------------------------------------------|

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(`Error en servidor: ${error}`);
});
