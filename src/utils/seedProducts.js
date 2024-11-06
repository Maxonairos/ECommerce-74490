import db from "../db/db.js";
import { addDoc, collection } from "firebase/firestore";

const products = [
    {
        "id": "1",
        "nombre": "Monitor Led 24 Pulgadas Acer Gaming Kg241q Sbmiipx 165hz F Color Negro",
        "cantidad": 25,
        "descripcion": "Sumérgete en una experiencia de juego inigualable con el Monitor Gamer Acer Nitro KG1 KG241Q Sbmiipx de 24 pulgadas. Con una resolución Full HD de 1920x1080 píxeles y una relación de aspecto de 16:9, disfrutarás de imágenes nítidas y colores vibrantes en cada partida. Gracias a su frecuencia de actualización de 165 Hz y tiempo de respuesta GTG de 1 ms, podrás apreciar cada detalle en tiempo real, sin desenfoques ni retrasos. Además, la tecnología FreeSync garantiza una sincronización perfecta entre tu monitor y tu tarjeta gráfica, evitando el efecto de tearing y proporcionándote una experiencia de juego fluida y sin interrupciones.",
        "precio": 457,
        "marca": "Acer",
        "categoria": "Monitores",
        "img": [
            "/img/image6-1.webp",
            "/img/image6-2.webp",
            "/img/image6-3.webp",
            "/img/image6-4.webp"
        ]
    },
    {
        "id": "2",
        "img": [
            "/img/image1-1.webp",
            "/img/image1-2.webp",
            "/img/image1-3.webp"
        ],
        "cantidad": 15,
        "descripcion": "La HP 14-EP0792WM es una notebook compacta y versátil, ideal para quienes buscan un equilibrio entre rendimiento y portabilidad. Diseñada para manejar las tareas cotidianas con facilidad, esta notebook es perfecta para estudiantes, profesionales y usuarios domésticos.",
        "precio": 748,
        "marca": "HP",
        "categoria": "Notebooks",
        "nombre": "Notebook Hp Intel Core I3 N305, Ddr4 8gb Ram, 256gb Ssd, Windows 11, Patalla 14 Hd, Moonlight Blue"
    },
    {
        "id": "3",
        "precio": 1650,
        "categoria": "Gamer",
        "cantidad": 23,
        "img": [
            "/img/image24-1.webp",
            "/img/image24-2.webp",
            "/img/image24-3.webp",
            "/img/image24-4.webp",
            "/img/image24-5.webp"
        ],
        "nombre": "Pc Gamer Armada Amd Ryzen 7 5700g | 32 Gb | 1tb Ssd",
        "descripcion": "PC Gamer Armada con AMD Ryzen 7 5600g, Mother ASROCK B450-HDV R4.0 , 32GB DDR5 3200 VENGEANCE, SSD 90GB SATA3 ADATA, Gabinete SOLARMAX 5920 RGB - Fuente Redragon RPGS GC-PS002 600W",
        "marca": "Dynacom"
    },
    {
        "id": "4",
        "categoria": "Notebooks",
        "descripcion": "Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite te ofrece una experiencia de visualización cinematográfica sin interrupciones gracias a su nítida resolución 3K (2880 x 1800) y los 120 Hz supersuaves. Cada detalle cobra vida en la pantalla de 14 pulgadas. Además, cuenta con una emisión reducida de luz azul para un mayor cuidado de los ojos",
        "precio": 1999,
        "cantidad": 20,
        "marca": "Samsung ",
        "nombre": "Notebook Samsung Galaxy Book3 Pro 14 Intel Core I5 12 Núcleos 16gb Color Graphite",
        "img": [
            "/img/image20-1.webp",
            "/img/image20-2.webp",
            "/img/image20-3.webp",
            "/img/image20-4.webp",
            "/img/image20-5.webp"
        ]
    },
    {
        "id": "5",
        "descripcion": "Logitech G203 Lightsync, Mouse Gaming,Sensor para gaming de 8.000 dpi RGB LIGHTSYNC totalmente personalizable,diseño de 6 botones con una forma clásica para juegos,botones personalizables para simplificar tareas, sistema mecánico de tensión de botones con resortes,sensor HERO exclusivo de la marca.",
        "cantidad": 24,
        "nombre": "Mouse Gamer Lightsync G203 Logitech G Series Azul",
        "img": [
            "/img/image10-1.webp",
            "/img/image10-2.webp",
            "/img/image10-3.webp",
            "/img/image10-4.webp"
        ],
        "precio": 36,
        "marca": "Logitech",
        "categoria": "Perifericos"
    },
    {
        "id": "6",
        "marca": "Dynacom",
        "precio": 35,
        "descripcion": "Con este kit de teclado y mouse Dynacom vas a poder llevar tus partidas a otro nivel. Destinado a un público gamer, potenciá tu performance en distintos juegos. Con este combo, podrás darle un uso intensivo a estos dispositivos y disfrutar de interminables horas de diversión.",
        "nombre": "Mouse Y Teclado Gaming Dynacom Retroiluminado Antighosting",
        "cantidad": 25,
        "categoria": "Perifericos",
        "img": [
            "/img/image9-1.webp",
            "/img/image9-2.webp",
            "/img/image9-3.webp",
            "/img/image9-4.webp"
        ]
    },
    {
        "id": "7",
        "descripcion": "Transforma tu experiencia visual con el monitor portátil ARZOPA de 15.6 pulgadas. Equipado con un panel IPS de alta calidad, este monitor ofrece colores vivos y ángulos de visión amplios, perfectos para trabajar, jugar o ver contenido multimedia con claridad y precisión. La pantalla LED Full HD 1080p garantiza una resolución nítida y detalles finos en cada imagen, proporcionando una experiencia visual impresionante.",
        "img": [
            "/img/image19-1.webp",
            "/img/image19-2.webp",
            "/img/image19-3.webp",
            "/img/image19-4.webp"
        ],
        "categoria": "Monitores",
        "cantidad": 27,
        "nombre": "Monitor portatil Arzopa S1 Table 15.6 pulgadas Usb C 1080p Fhd Hdr Color Negro",
        "marca": "Arzopa",
        "precio": 303
    },
    {
        "id": "8",
        "cantidad": 29,
        "img": [
            "/img/image3-1.webp",
            "/img/image3-2.webp",
            "/img/image3-3.webp"
        ],
        "precio": 161,
        "categoria": "Perifericos",
        "nombre": "Teclado Bluetooth Logitech Master Mx Keys",
        "descripcion": "Teclado Bluetooth Logitech Master Mx Keys S Retroiluminado Color del teclado Grafito",
        "marca": "Logitech"
    },
    {
        "id": "9",
        "img": [
            "/img/image22-1.webp",
            "/img/image22-2.webp",
            "/img/image22-3.webp",
            "/img/image22-4.webp",
            "/img/image22-5.webp"
        ],
        "cantidad": 26,
        "categoria": "Gamer",
        "precio": 1090,
        "nombre": "Pc Armada Intel Core I7 12700 32gb (2x16) Ddr5 M.2 1.0tb Ctc",
        "marca": "Intel",
        "descripcion": "Nueva computadora Gamer Intel de 12va Generación, con procesador Core I7-12700 hasta 4.9Ghz de 12 Cores + 20 núcleos de subprocesos con 25Mb de cache y video integrado Intel UHD770 4K. Conectividad HDMI y DISPLAY PORT. Nuevas memorias DDR5 en dual channel y unidad de almacenamiento M.2 Nvme 4.0 para máxima velocidad de transferencia, 4 veces mas rápido que un SSD."
    },
    {
        "id": "10",
        "cantidad": 30,
        "marca": "Genius",
        "precio": 28,
        "img": [
            "/img/image13-1.webp",
            "/img/image13-2.webp",
            "/img/image13-3.webp",
            "/img/image13-4.webp"
        ],
        "descripcion": "Genius SP-HF180 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
        "categoria": "Perifericos",
        "nombre": "Parlante Stereo Genius Usb Ideal Escritorio Pc Notebook Color Negro"
    },
    {
        "id": "11",
        "descripcion": "COMPUTADORA TOTALMENTE ENSAMBLADA GAMER CON GABIENTE NEGRO CON VIDRIO TEMPLADO LATERAL Y FRONTAL LISTA PARA USAR con Ryzen 7, RTX 3060, 16GB RAM y SSD 1TB",
        "nombre": "PC Gamer",
        "categoria": "Gamer",
        "cantidad": 13,
        "img": [
            "/img/image5-1.webp",
            "/img/image5-2.webp",
            "/img/image5-3.webp",
            "/img/image5-4.webp",
            "/img/image5-5.webp"
        ],
        "precio": 465,
        "marca": "Gigabyte"
    },
    {
        "id": "12",
        "img": [
            "/img/image8-1.webp",
            "/img/image8-2.webp",
            "/img/image8-3.webp",
            "/img/image8-4.webp"
        ],
        "nombre": "Mouse Gamer Razer Deathadder V2 X Hyperspeed Soy Gamer Color Negro",
        "categoria": "Perifericos",
        "cantidad": 26,
        "descripcion": "Desde 2005 Razer es la marca líder de estilo de vida para jugadores. Ha diseñado y construido el ecosistema de hardware, software y servicios más grande del mundo. La ubicación de cada botón y curva de los mouses Razer se crearon para adaptarse perfectamente a tu mano. Gracias a estos dispositivos, conseguirás una experiencia de juego cómoda y placentera.",
        "precio": 87,
        "marca": "Razer"
    },
    {
        "id": "13",
        "descripcion": "Monitor Dell P Series TFT LCD negro y plateado 110/220V",
        "categoria": "Monitores",
        "precio": 552,
        "nombre": "Monitor Dell P Series TFT LCD",
        "marca": "Dell",
        "cantidad": 26,
        "img": [
            "/img/image2-1.webp",
            "/img/image2-2.webp",
            "/img/image2-3.webp"
        ]
    },
    {
        "id": "14",
        "nombre": "Mouse Inalámbrico M280 Logitech Color Negro",
        "categoria": "Perifericos",
        "descripcion": "M280 es la combinación perfecta de funcionalidad, estética y comodidad: una forma asimétrica exclusiva que se adapta a la mano, una amplia rueda que mejora los desplazamientos y una superficie de goma suave con una textura especial agradable al tacto.",
        "marca": "Logitech ",
        "cantidad": 27,
        "precio": 14,
        "img": [
            "/img/image12-1.webp",
            "/img/image12-2.webp",
            "/img/image12-3.webp",
            "/img/image12-4.webp"
        ]
    },
    {
        "id": "15",
        "nombre": "Parlante Gamer Xinua Rgb Efectos Luces Touch Pc Notebook Tv",
        "descripcion": "Xinua ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
        "marca": "Xinua",
        "cantidad": 25,
        "precio": 45,
        "categoria": "Perifericos",
        "img": [
            "/img/image14-1.webp",
            "/img/image14-2.webp",
            "/img/image14-3.webp",
            "/img/image14-4.webp"
        ]
    },
    {
        "id": "16",
        "descripcion": "Notebook ASUS Vivobook. Disfrute de las actividades cotidianas con esta computadora portátil ASUS. El procesador Intel Core i3 y 8 GB de RAM le permiten ejecutar programas sin problemas.",
        "precio": 720,
        "marca": "Asus",
        "categoria": "Notebooks",
        "cantidad": 29,
        "img": [
            "/img/image21-1.webp",
            "/img/image21-2.webp",
            "/img/image21-3.webp",
            "/img/image21-4.webp"
        ],
        "nombre": "Notebook Asus Vivobook 14 Intel Core I3 1215u, 8gb De Ram, 128gb Ssd, Full Hd, Windows 11 Home"
    },
    {
        "id": "17",
        "categoria": "Perifericos",
        "cantidad": 30,
        "nombre": "Microsoft Mouse 1850 Wireless Negro",
        "img": [
            "/img/image4-1.webp",
            "/img/image4-2.webp",
            "/img/image4-3.webp",
            "/img/image4-4.webp"
        ],
        "precio": 5,
        "marca": "Microsoft",
        "descripcion": "El mouse Wireless Mobile Mouse 1850 está diseñado para quienes se desplazan constantemente, ya que ofrece la libertad de una conexión inalámbrica y almacenamiento en transceptor integrado para una máxima movilidad. Su cómodo uso en ambas manos y una rueda de desplazamiento para una fácil navegación convierten a este mouse en el dispositivo ideal para su estilo de vida móvil y moderna"
    },
    {
        "id": "18",
        "marca": "Marvo",
        "descripcion": "Este teclado Marvo de alto rendimiento permite que puedas disfrutar de horas ilimitadas de juegos. Está diseñado especialmente para que puedas expresar tanto tus habilidades como tu estilo. Podrás mejorar tu experiencia de gaming, ya seas un aficionado o todo un experto y hacer que tus jugadas alcancen otro nivel.",
        "cantidad": 35,
        "nombre": "Teclado Mecanico Marvo Kg962 Gaming Rainbow 60% Switch Blue",
        "categoria": "Perifericos",
        "precio": 37,
        "img": [
            "/img/image11-1.webp",
            "/img/image11-2.webp",
            "/img/image11-3.webp",
            "/img/image11-4.webp"
        ]
    },
    {
        "id": "19",
        "descripcion": "Experimentá detalles con una claridad excepcional. Al ver tu película preferida o trabajar en tu último proyecto, disfrutá de una densidad de píxeles superior al Full HD. ViewFinity S6 ofrece más espacio para la multitarea o para visualizar vídeos e imágenes con gran detalle.",
        "cantidad": 45,
        "precio": 886,
        "categoria": "Monitores",
        "nombre": "Monitor Samsung Viewfinity S6 27' IPS QHD Negro, Ergonómico, USB Hub, Flicker-Free",
        "marca": "Samsung",
        "img": [
            "/img/image18-1.webp",
            "/img/image18-2.webp",
            "/img/image18-3.webp",
            "/img/image18-4.webp"
        ]
    },
    {
        "id": "20",
        "precio": 30,
        "nombre": "Parlante HP DHE-6000 black",
        "img": [
            "/img/image15-1.webp",
            "/img/image15-2.webp",
            "/img/image15-3.webp",
            "/img/image15-4.webp"
        ],
        "cantidad": 37,
        "descripcion": "HP DHE-6000 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.",
        "categoria": "Perifericos",
        "marca": "HP"
    },
    {
        "id": "21",
        "nombre": "Pc Armada Gamer Amd Ryzen 5 4600g Ram 16gb Radeon Vega Hdmi",
        "cantidad": 55,
        "categoria": "Gamer",
        "descripcion": "PC Gamer Armada con AMD Ryzen 5 4600g 5Ta Generación, Mother ASROCK A520MH ,16GB DDR4 3200 HIKVISION, SSD 480GB SATA3 ADATA, Gabinete SENTEY F10 RGB - FUENTE LNZ550W",
        "marca": "Asus",
        "img": [
            "/img/image23-1.webp",
            "/img/image23-2.webp",
            "/img/image23-3.webp",
            "/img/image23-4.webp"
        ],
        "precio": 461
    },
    {
        "id": "22",
        "precio": 190,
        "nombre": "Monitor Dahua 22 Full Hd 1080p 75hz Led Hdmi Color Negro",
        "img": [
            "/img/image16-1.webp",
            "/img/image16-2.webp",
            "/img/image16-3.webp",
            "/img/image16-4.webp"
        ],
        "cantidad": 30,
        "categoria": "Monitores",
        "descripcion": "Carcasa de plástico ligera y rentable,bisel ultra-estrecho, aspecto elegante, base de metal, cuenta con un ángulo de visión extra amplio de 178°H/178°V para una visualización general. Procesamiento digital de alta fidelidad para un video brillante y vívido, admite múltiples entradas de señal como HDMI, VGA, Diseño de luz anti-azul, protección para los ojos.",
        "marca": "Dahua"
    },
    {
        "id": "23",
        "marca": "Corsair",
        "img": [
            "/img/image7-1.webp",
            "/img/image7-2.webp",
            "/img/image7-3.webp",
            "/img/image7-4.webp"
        ],
        "precio": 129,
        "descripcion": "Corsair es un fabricante mundial de equipos y tecnología de alto rendimiento. Sus productos van dirigidos a jugadores, creadores de contenido y diseñadores. A su vez, con sus teclados podrás conseguir un óptimo desempeño al darle un uso intensivo. Su retroiluminación le da un toque diferente a tu equipo y resalta su composición cuando es utilizado en espacios poco iluminados",
        "categoria": "Perifericos",
        "nombre": "Teclado gamer Corsair K70 MAX Ingles Corsair MGX inglés internacional color gris oscuro con luz RGB",
        "cantidad": 35
    },
    {
        "id": "24",
        "marca": "Samsung",
        "categoria": "Monitores",
        "precio": 350,
        "cantidad": 27,
        "img": [
            "/img/image17-1.webp",
            "/img/image17-2.webp",
            "/img/image17-3.webp",
            "/img/image17-4.webp",
            "/img/image17-5.webp"
        ],
        "descripcion": "Diseño minimalista para máxima concentración. La pantalla sin borde en 3 lados proporciona una estética limpia y moderna, ideal para cualquier entorno de trabajo. En configuraciones de múltiples monitores, las pantallas se alinean para ofrecer una vista prácticamente sin interrupciones.",
        "nombre": "Monitor Samsung LF27T350FHLXZX 27' IPS Full HD 75Hz FreeSync, Diseño Sin Bordes, Dark Blue Gray"
    }
];

const seedProducts = () => {
    const producsRef = collection(db,"productos")
    products.map(( { id, ...dataProduct } )=> {
        addDoc(producsRef, dataProduct)
    })
    console.log("productos cargados")
    return
}

seedProducts()