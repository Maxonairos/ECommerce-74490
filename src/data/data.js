const products = [
  {
    id: 1,
    nombre: "Laptop",
    marca: "HP",
    precio: 1250,
    cantidad: 2,
    descripcion: "Laptop HP con procesador Intel Core i5 y 8GB RAM",
    img: "/img/image1.jpg",
    categoria: "laptops"
  },
  {
    id: 2,
    nombre: "Monitor",
    marca: "Dell",
    precio: 289,
    cantidad: 6,
    descripcion: "Monitor Dell de 24 pulgadas Full HD",
    img: "/img/image2.jpg",
    categoria: "monitores"
  },
  {
    id: 3,
    nombre: "Teclado",
    marca: "Logitech",
    precio: 375,
    cantidad: 10,
    descripcion: "Teclado inalámbrico Logitech con retroiluminación",
    img: "/img/image3.jpg",
    categoria: "perifericos"
  },
  {
    id: 4,
    nombre: "Mouse",
    marca: "Microsoft",
    precio: 43,
    cantidad: 10,
    descripcion: "Mouse óptico Microsoft con 5 botones programables",
    img: "/img/image4.jpg",
    categoria: "perifericos"
  },
  {
    id: 5,
    nombre: "PC Gamer",
    marca: "Gigabyte",
    precio: 1857,
    cantidad: 3,
    descripcion: "PC Gamer con Ryzen 7, RTX 3060, 16GB RAM y SSD 1TB",
    img: "/img/image5.jpg",
    categoria: "escritorio"
  },
  {
    id: 6,
    nombre: "Monitor Gaming",
    marca: "Acer",
    precio: 457,
    cantidad: 5,
    descripcion: "Monitor gaming de 27 pulgadas, 144Hz, resolución 2560x1440",
    img: "/img/image6.jpg",
    categoria: "monitores"
  },
  {
    id: 7,
    nombre: "Teclado Mecánico",
    marca: "Corsair",
    precio: 129,
    cantidad: 5,
    descripcion: "Teclado mecánico RGB con switches Cherry MX Red",
    img: "/img/image7.jpg",
    categoria: "perifericos"
  },
  {
    id: 8,
    nombre: "Mouse Gaming",
    marca: "Razer",
    precio: 83,
    cantidad: 4,
    descripcion: "Mouse gaming con sensor óptico 16000 DPI",
    img: "/img/image8.jpg",
    categoria: "perifericos"
  }
]

const condicion = true
const getProducts = () => {
  return new Promise((resolve, reject) => {
    if (condicion) {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    }
  });
};

const getProduct = (idProduct)=>{
  return new Promise ((resolve)=>{
    setTimeout(()=>{
      const product = products.find ((product)=> product.id === parseInt(idProduct))
      resolve(product)
    }, 1000)
  })
}

export { getProducts , getProduct };
