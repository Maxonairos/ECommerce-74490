const products = [
  {
    id: 1,
    nombre: "Notebook Hp Intel Core I3 N305, Ddr4 8gb Ram, 256gb Ssd, Windows 11, Patalla 14 Hd, Moonlight Blue",
    marca: "HP",
    precio: 748,
    cantidad: 3,
    descripcion: "La HP 14-EP0792WM es una notebook compacta y versátil, ideal para quienes buscan un equilibrio entre rendimiento y portabilidad. Diseñada para manejar las tareas cotidianas con facilidad, esta notebook es perfecta para estudiantes, profesionales y usuarios domésticos.",
    img: ["/img/image1-1.webp","/img/image1-2.webp","/img/image1-3.webp"],
    categoria: "Notebooks"
  },
  {
    id: 2,
    nombre: "Monitor Dell P Series TFT LCD",
    marca: "Dell",
    precio: 552,
    cantidad: 6,
    descripcion: "Monitor Dell P Series TFT LCD negro y plateado 110/220V",
    img: ["/img/image2-1.webp","/img/image2-2.webp","/img/image2-3.webp"],
    categoria: "Monitores"
  },
  {
    id: 3,
    nombre: "Teclado Bluetooth Logitech Master Mx Keys",
    marca: "Logitech",
    precio: 161,
    cantidad: 10,
    descripcion: "Teclado Bluetooth Logitech Master Mx Keys S Retroiluminado Color del teclado Grafito",
    img: ["/img/image3-1.webp","/img/image3-2.webp","/img/image3-3.webp"],
    categoria: "Perifericos"
  },
  {
    id: 4,
    nombre: "Microsoft Mouse 1850 Wireless Negro",
    marca: "Microsoft",
    precio: 5,
    cantidad: 10,
    descripcion: "El mouse Wireless Mobile Mouse 1850 está diseñado para quienes se desplazan constantemente, ya que ofrece la libertad de una conexión inalámbrica y almacenamiento en transceptor integrado para una máxima movilidad. Su cómodo uso en ambas manos y una rueda de desplazamiento para una fácil navegación convierten a este mouse en el dispositivo ideal para su estilo de vida móvil y moderna",
    img: ["/img/image4-1.webp","/img/image4-2.webp","/img/image4-3.webp","/img/image4-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 5,
    nombre: "PC Gamer",
    marca: "Gigabyte",
    precio: 465,
    cantidad: 3,
    descripcion: "COMPUTADORA TOTALMENTE ENSAMBLADA GAMER CON GABIENTE NEGRO CON VIDRIO TEMPLADO LATERAL Y FRONTAL LISTA PARA USAR con Ryzen 7, RTX 3060, 16GB RAM y SSD 1TB",
    img: ["/img/image5-1.webp","/img/image5-2.webp","/img/image5-3.webp","/img/image5-4.webp","/img/image5-5.webp"],
    categoria: "Gamer"
  },
  {
    id: 6,
    nombre: "Monitor Led 24 Pulgadas Acer Gaming Kg241q Sbmiipx 165hz F Color Negro",
    marca: "Acer",
    precio: 457,
    cantidad: 5,
    descripcion: "Sumérgete en una experiencia de juego inigualable con el Monitor Gamer Acer Nitro KG1 KG241Q Sbmiipx de 24 pulgadas. Con una resolución Full HD de 1920x1080 píxeles y una relación de aspecto de 16:9, disfrutarás de imágenes nítidas y colores vibrantes en cada partida. Gracias a su frecuencia de actualización de 165 Hz y tiempo de respuesta GTG de 1 ms, podrás apreciar cada detalle en tiempo real, sin desenfoques ni retrasos. Además, la tecnología FreeSync garantiza una sincronización perfecta entre tu monitor y tu tarjeta gráfica, evitando el efecto de tearing y proporcionándote una experiencia de juego fluida y sin interrupciones.",
    img: ["/img/image6-1.webp","/img/image6-2.webp","/img/image6-3.webp","/img/image6-4.webp"],
    categoria: "Monitores"
  },
  {
    id: 7,
    nombre: "Teclado gamer Corsair K70 MAX Ingles Corsair MGX inglés internacional color gris oscuro con luz RGB",
    marca: "Corsair",
    precio: 129,
    cantidad: 5,
    descripcion: "Corsair es un fabricante mundial de equipos y tecnología de alto rendimiento. Sus productos van dirigidos a jugadores, creadores de contenido y diseñadores. A su vez, con sus teclados podrás conseguir un óptimo desempeño al darle un uso intensivo. Su retroiluminación le da un toque diferente a tu equipo y resalta su composición cuando es utilizado en espacios poco iluminados",
    img: ["/img/image7-1.webp","/img/image7-2.webp","/img/image7-3.webp","/img/image7-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 8,
    nombre: "Mouse Gamer Razer Deathadder V2 X Hyperspeed Soy Gamer Color Negro",
    marca: "Razer",
    precio: 87,
    cantidad: 6,
    descripcion: "Desde 2005 Razer es la marca líder de estilo de vida para jugadores. Ha diseñado y construido el ecosistema de hardware, software y servicios más grande del mundo. La ubicación de cada botón y curva de los mouses Razer se crearon para adaptarse perfectamente a tu mano. Gracias a estos dispositivos, conseguirás una experiencia de juego cómoda y placentera.",
    img: ["/img/image8-1.webp","/img/image8-2.webp","/img/image8-3.webp","/img/image8-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 9,
    nombre: "Mouse Y Teclado Gaming Dynacom Retroiluminado Antighosting",
    marca: "Dynacom",
    precio: 35,
    cantidad: 7,
    descripcion: "Con este kit de teclado y mouse Dynacom vas a poder llevar tus partidas a otro nivel. Destinado a un público gamer, potenciá tu performance en distintos juegos. Con este combo, podrás darle un uso intensivo a estos dispositivos y disfrutar de interminables horas de diversión.",
    img: ["/img/image9-1.webp","/img/image9-2.webp","/img/image9-3.webp","/img/image9-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 10,
    nombre: "Mouse Gamer Lightsync G203 Logitech G Series Azul",
    marca: "Logitech",
    precio: 36,
    cantidad: 16,
    descripcion: "Logitech G203 Lightsync, Mouse Gaming,Sensor para gaming de 8.000 dpi RGB LIGHTSYNC totalmente personalizable,diseño de 6 botones con una forma clásica para juegos,botones personalizables para simplificar tareas, sistema mecánico de tensión de botones con resortes,sensor HERO exclusivo de la marca.",
    img: ["/img/image10-1.webp","/img/image10-2.webp","/img/image10-3.webp","/img/image10-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 11,
    nombre: "Teclado Mecanico Marvo Kg962 Gaming Rainbow 60% Switch Blue",
    marca: "Marvo",
    precio: 37,
    cantidad: 15,
    descripcion: "Este teclado Marvo de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Está diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podrás mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.",
    img: ["/img/image11-1.webp","/img/image11-2.webp","/img/image11-3.webp","/img/image11-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 12,
    nombre: "Mouse Inalámbrico M280 Logitech Color Negro",
    marca: "Logitech ",
    precio: 14,
    cantidad: 7,
    descripcion: "M280 es la combinación perfecta de funcionalidad, estética y comodidad: una forma asimétrica exclusiva que se adapta a la mano, una amplia rueda que mejora los desplazamientos y una superficie de goma suave con una textura especial agradable al tacto.",
    img: ["/img/image12-1.webp","/img/image12-2.webp","/img/image12-3.webp","/img/image12-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 13,
    nombre: "Parlante Stereo Genius Usb Ideal Escritorio Pc Notebook Color Negro",
    marca: "Genius",
    precio: 28,
    cantidad: 10,
    descripcion: "Genius SP-HF180 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
    img: ["/img/image13-1.webp","/img/image13-2.webp","/img/image13-3.webp","/img/image13-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 14,
    nombre: "Parlante Gamer Xinua Rgb Efectos Luces Touch Pc Notebook Tv",
    marca: "Xinua",
    precio: 45,
    cantidad: 15,
    descripcion: "Xinua ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
    img: ["/img/image14-1.webp","/img/image14-2.webp","/img/image14-3.webp","/img/image14-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 15,
    nombre: "Parlante HP DHE-6000 black",
    marca: "HP",
    precio: 30,
    cantidad: 17,
    descripcion: "HP DHE-6000 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
    img: ["/img/image15-1.webp","/img/image15-2.webp","/img/image15-3.webp","/img/image15-4.webp"],
    categoria: "Perifericos"
  },
  {
    id: 16,
    nombre: "Monitor Dahua 22 Full Hd 1080p 75hz Led Hdmi Color Negro",
    marca: "Dahua",
    precio: 190,
    cantidad: 10,
    descripcion: "Carcasa de plástico ligera y rentable,bisel ultra-estrecho, aspecto elegante, base de metal, cuenta con un ángulo de visión extra amplio de 178°H/178°V para una visualización general. Procesamiento digital de alta fidelidad para un video brillante y vívido, admite múltiples entradas de señal como HDMI, VGA, Diseño de luz anti-azul, protección para los ojos.",
    img: ["/img/image16-1.webp","/img/image16-2.webp","/img/image16-3.webp","/img/image16-4.webp"],
    categoria: "Monitores"
  },
  {
    id: 17,
    nombre: "Monitor Samsung LF27T350FHLXZX 27' IPS Full HD 75Hz FreeSync, Diseño Sin Bordes, Dark Blue Gray",
    marca: "Samsung",
    precio: 350,
    cantidad: 7,
    descripcion: "Diseño minimalista para máxima concentración. La pantalla sin borde en 3 lados proporciona una estética limpia y moderna, ideal para cualquier entorno de trabajo. En configuraciones de múltiples monitores, las pantallas se alinean para ofrecer una vista prácticamente sin interrupciones.",
    img: ["/img/image17-1.webp","/img/image17-2.webp","/img/image17-3.webp","/img/image17-4.webp","/img/image17-5.webp"],
    categoria: "Monitores"
  },
  {
    id: 18,
    nombre: "Monitor Samsung Viewfinity S6 27' IPS QHD Negro, Ergonómico, USB Hub, Flicker-Free",
    marca: "Samsung",
    precio: 886,
    cantidad: 5,
    descripcion: "Experimentá detalles con una claridad excepcional. Al ver tu película preferida o trabajar en tu último proyecto, disfrutá de una densidad de píxeles superior al Full HD. ViewFinity S6 ofrece más espacio para la multitarea o para visualizar vídeos e imágenes con gran detalle.",
    img: ["/img/image18-1.webp","/img/image18-2.webp","/img/image18-3.webp","/img/image18-4.webp"],
    categoria: "Monitores"
  },
  {
    id: 19,
    nombre: "Monitor portatil Arzopa S1 Table 15.6 pulgadas Usb C 1080p Fhd Hdr Color Negro",
    marca: "Arzopa",
    precio: 303,
    cantidad: 8,
    descripcion: "Transforma tu experiencia visual con el monitor portátil ARZOPA de 15.6 pulgadas. Equipado con un panel IPS de alta calidad, este monitor ofrece colores vivos y ángulos de visión amplios, perfectos para trabajar, jugar o ver contenido multimedia con claridad y precisión. La pantalla LED Full HD 1080p garantiza una resolución nítida y detalles finos en cada imagen, proporcionando una experiencia visual impresionante.",
    img: ["/img/image19-1.webp","/img/image19-2.webp","/img/image19-3.webp","/img/image19-4.webp"],
    categoria: "Monitores"
  },
  {
    id: 20,
    nombre: "Notebook Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite",
    marca: "Samsung ",
    precio: 1999,
    cantidad: 7,
    descripcion: "Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite te ofrece una experiencia de visualización cinematográfica sin interrupciones gracias a su nítida resolución 3K (2880 x 1800) y los 120 Hz supersuaves. Cada detalle cobra vida en la pantalla de 14 pulgadas. Además, cuenta con una emisión reducida de luz azul para un mayor cuidado de los ojos",
    img: ["/img/image20-1.webp","/img/image20-2.webp","/img/image20-3.webp","/img/image20-4.webp","/img/image20-5.webp"],
    categoria: "Notebooks"
  },
  {
    id: 21,
    nombre: "Notebook Asus Vivobook 14 Intel Core I3 1215u, 8gb De Ram, 128gb Ssd, Full Hd, Windows 11 Home",
    marca: "Asus",
    precio: 720,
    cantidad: 9,
    descripcion: "Notebook ASUS Vivobook. Disfrute de las actividades cotidianas con esta computadora portátil ASUS. El procesador Intel Core i3 y 8 GB de RAM le permiten ejecutar programas sin problemas.",
    img: ["/img/image21-1.webp","/img/image21-2.webp","/img/image21-3.webp","/img/image21-4.webp"],
    categoria: "Notebooks"
  },
  {
    id: 22,
    nombre: "Pc Armada Intel Core I7 12700 32gb (2x16) Ddr5 M.2 1.0tb Ctc",
    marca: "Intel",
    precio: 1090,
    cantidad: 7,
    descripcion: "Nueva computadora Gamer Intel de 12va Generación, con procesador Core I7-12700 hasta 4.9Ghz de 12 Cores + 20 núcleos de subprocesos con 25Mb de cache y video integrado Intel UHD770 4K. Conectividad HDMI y DISPLAY PORT. Nuevas memorias DDR5 en dual channel y unidad de almacenamiento M.2 Nvme 4.0 para máxima velocidad de transferencia, 4 veces mas rápido que un SSD.",
    img: ["/img/image22-1.webp","/img/image22-2.webp","/img/image22-3.webp","/img/image22-4.webp","/img/image22-5.webp"],
    categoria: "Gamer"
  },
  {
    id: 23,
    nombre: "Pc Armada Gamer Amd Ryzen 5 4600g Ram 16gb Radeon Vega Hdmi",
    marca: "Asus",
    precio: 461,
    cantidad: 6,
    descripcion: "PC Gamer Armada con AMD Ryzen 5 4600g 5Ta Generación, Mother ASROCK A520MH ,16GB DDR4 3200 HIKVISION, SSD 480GB SATA3 ADATA, Gabinete SENTEY F10 RGB - FUENTE LNZ550W",
    img: ["/img/image23-1.webp","/img/image23-2.webp","/img/image23-3.webp","/img/image23-4.webp"],
    categoria: "Gamer"
  },
  {
    id: 24,
    nombre: "Pc Gamer Armada Amd Ryzen 7 5700g | 32 Gb | 1tb Ssd",
    marca: "Dynacom",
    precio: 1650,
    cantidad: 3,
    descripcion: "PC Gamer Armada con AMD Ryzen 7 5600g, Mother ASROCK B450-HDV R4.0 , 32GB DDR5 3200 VENGEANCE, SSD 90GB SATA3 ADATA, Gabinete SOLARMAX 5920 RGB - Fuente Redragon RPGS GC-PS002 600W",
    img: ["/img/image24-1.webp","/img/image24-2.webp","/img/image24-3.webp","/img/image24-4.webp", "/img/image24-5.webp"],
    categoria: "Gamer"
  }
]

const condicion = true
const getProducts = () => {
  return new Promise((resolve, reject) => {
    if (condicion) {
      setTimeout(() => {
        resolve(products);
      }, 1500);
    }
  });
};

const getProduct = (idProduct)=>{
  return new Promise ((resolve)=>{
    setTimeout(()=>{
      const product = products.find ((product)=> product.id === parseInt(idProduct))
      resolve(product)
    }, 1500)
  })
}

export { getProducts , getProduct };
