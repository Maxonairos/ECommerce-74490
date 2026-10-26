# Gamerstore - E-commerce desarrollado por FSoriano.


<a href="https://gamerstore-self.vercel.app/" target="_blank"> <img src="./src/assets/logo.png" width=80px> </a>

<hr>

### Proyecto Final de la clase 74490 - CoderHouse

<hr>

### Índice

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Dependencias](#dependencias)
- [Instalación y scripts](#instalación-y-scripts)
- [Provincias y localidades](#provincias-y-localidades)
- [Funcionalidades](#funcionalidades)
- [Desarrollador](#desarrollador)

## Acerca del Proyecto:

- Se realizó un proyecto de desarrollo de un E-commerce de forma progresiva durante la cursada en CoderHouse.

- Se empleó React js y Vite como frameworks de desarrollo.

- Se sumo React Router DOM para las navegaciones.

- React-Spinners e Icons para algunos iconos y Loaders.

- Se utilizó como framework de CSS a Taildwind CSS para todas las interfaces y Sweet Alert 2 para los mensajes y toast's.

- La aplicación cuenta con un navbar que nos indica la cantidad de productos en nuestro carrito, ademas de indicarnos en que pagina estamos situados, ya sea por categoría o en el mismo Home.

- Cuenta ademas con una pagina 404, para los casos donde el usuario intente dirigirse a una dirección incorrecta.

- Se utilizaron transiciones y efectos para algunos íconos.

- La aplicación cuenta con un Dark Mode nativo, tomando en cuenta la aparencia elegida en el navegador o del mismo sistema. (Taildwind CSS).

- Aplicación full Responsive (Taildwind CSS).

- Se utiliza Firestore para la obtención de productos y registro de ordenes de venta.

- Se publica la aplicación en Vercel.




## Dependencias


`Firestore` `React-Router-DOM` `SweetAlert 2` `React` `React-Spinners` `React-Icons` `Taildwind CSS` `Vite` `Vercel` `GitHub`

<a href="https://firebase.google.com/docs/firestore?hl=es-419" target="_blank"> <img src="https://www.gstatic.com/devrel-devsite/prod/ve73583a8e360906cd2a16ff5571c1edda64ba053fc57f348efff9496af45f422/firebase/images/lockup.svg" alt="firebase" width="90"/></a>

<a href="https://vite.dev/" target="_blank"> <img src="https://vite.dev/logo.svg" alt="Vite" width="50"/> </a>

<a href="https://sweetalert2.github.io/" target="_blank"> <img src="https://sweetalert2.github.io/images/SweetAlert2.png" alt="SweetAlert 2" width="90"/></a>

<a href="https://tailwindcss.com/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Taildwind CSS" width="50" height="20"/> </a>

<a href="https://es.react.dev/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="50"/> </a>

<a href="https://vercel.com/" target="_blank"> <img src="https://vercel.com/mktng/_next/static/media/vercel-logotype-light.700a8d26.svg" alt="Vercel" width="80"/> </a>

## Instalación y scripts

```bash
npm install       # instala las dependencias
npm run dev       # inicia el servidor de desarrollo
npm run lint      # revisa el código con ESLint
npm run build     # genera la versión de producción en dist/
npm run preview   # previsualiza la versión de producción
```

La configuración de Firebase se puede sobrescribir con variables de entorno.
Copiá `.env.example` como `.env.local` y completá los valores de tu proyecto.

## Provincias y localidades

El formulario de checkout carga las provincias argentinas y sus localidades desde la colección `provincias` de Firestore.

Cada documento usa el ID oficial de Georef como ID del documento y contiene:

- `id`: ID de la provincia en Georef.
- `nombre`: nombre de la provincia.
- `localidades`: array de localidades únicas, ordenadas alfabéticamente.
- `totalLocalidades`: cantidad de localidades de la provincia.
- `fuente`: origen de los datos (`Georef - datos.gob.ar`).
- `actualizadoEn`: fecha ISO de la última actualización.

Para regenerar la colección con los datos oficiales de [Georef](https://apis.datos.gob.ar/georef/api/) ejecutá:

```bash
npm run seed:locations
```

El script consulta la API, elimina localidades duplicadas y actualiza los 24 documentos de la colección.

El checkout valida cada campo al salir del input y al enviar el formulario:

- Nombre y apellido: solo letras, espacios, puntos, apóstrofes y guiones (2 a 50 caracteres).
- Código de área: 2 a 4 dígitos; teléfono: 6 a 8 dígitos, ambos sin 0 ni 15.
- Dirección, altura, piso y departamento con formatos acotados.
- Provincia y localidad deben existir en Firestore y pertenecer a la misma jurisdicción.
- Código postal: formato de 4 dígitos o CPA argentino (por ejemplo `X5011FEM`).
- Email válido y confirmación de email coincidente.

Si hay errores, se muestran debajo de cada campo y el foco pasa al primer campo inválido. El botón de compra permanece deshabilitado mientras no se pudieron cargar las ubicaciones.

## Pagos con Mercado Pago

El checkout puede iniciar un pago con Checkout Pro usando la API de `MP-NodeJS/mp`.

1. Copiá la URL del backend en `.env.local` y en Vercel:

   ```bash
   VITE_MP_API_URL=https://<tu-proyecto>.vercel.app
   ```

2. Al confirmar el formulario se guarda la orden en Firestore y se muestra una pantalla con el resumen de productos, comprador, entrega y total. La preferencia de Mercado Pago se crea al presionar **Pagar con Mercado Pago**, y sus identificadores se guardan en la misma orden:

   ```js
   {
     status: "pending",
      paymentPreferenceId: "123456789-abcd-...", // se completa al iniciar el pago
      paymentInitPoint: "https://www.mercadopago.com.ar/...", // URL usada
      paymentSandbox: true,
      paymentStatus: "created",
      paymentStatusDetail: null,
      paymentCreatedAt: "timestamp",
      paymentId: null // se completa al volver de Mercado Pago
   }
   ```

3. El usuario presiona el botón **Pagar con Mercado Pago** y es redirigido al checkout. Al volver a `/checkout/resultado`, la app consulta el pago y actualiza la orden:

   ```js
   {
     status: "paid", // paid | pending | rejected | cancelled | refunded
     paymentId: "123456789", // número de pago
     paymentStatus: "approved",
     paymentStatusDetail: "accredited",
     paymentMethod: "visa",
     paymentAmount: 30000
   }
   ```

> Si `VITE_MP_API_URL` está vacía, el checkout mantiene el comportamiento anterior: guarda la orden y muestra el número de seguimiento, sin iniciar el pago.

> El resumen se muestra antes de salir de Gamerstore. La orden ya existe aunque el usuario todavía no haya iniciado el pago, lo que permite rastrear intentos abandonados. Con `MP_SANDBOX=true`, `checkoutUrl` abre el checkout de sandbox para pagar con usuarios de prueba.

> Para que la orden se actualice al volver de Mercado Pago, las reglas de Firestore deben permitir `update` sobre `orders` (por ejemplo, solo los campos de pago). El detalle de la integración está en `MP-NodeJS/mp/docs/integracion-gamerstore.md`.

## Consulta de compras

La ruta `/consulta-compra` permite consultar una orden por:

- DNI del comprador.
- Número de operación de Mercado Pago.
- ID de la orden de Gamerstore.

El resultado muestra los productos, comprador, total, estado de la orden, estado y detalle del pago, número de operación y preferencia de Mercado Pago.

> La consulta por DNI es una búsqueda pública. Para producción conviene agregar un segundo dato de verificación, como email o código de seguimiento, antes de mostrar datos personales y de la compra.

## Funcionalidades

:heavy_check_mark: `1:` Navegación fluida por Categorias de productos e Items individuales.

:heavy_check_mark: `2:` Agregar productos por cantidad controlando el stock.

:heavy_check_mark: `3:` Carrito totalmente funcional, pudiendo quitar productos o vaciar del mismo con validaciones.

:heavy_check_mark: `4:` Formulario de Orden de Venta.

:heavy_check_mark: `5:` Registro de venta con ID, restando los productos comprados del stock original.

## Desarrollador

| [<img src="https://avatars.githubusercontent.com/u/91910046?s=400&u=ee47a496db7977504d41bb87f9e6ef53c6056c95&v=4" width=115><br><sub>Fabricio Soriano</sub>](https://github.com/Maxonairos) | 
| :---: |
