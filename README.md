# pokemo-danielJuliao

se maneja una arquitectura modular basada en componentes y servicios 


daniel-juliao-sistem@daniel-juliao-sistem:~/Documentos/desarrollo/pruebasTecnicas/pokemo-danielJuliao/template-test-ng/projects/test-app-ng$ tree
.
├── server.ts
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── components
│   │   │   ├── card
│   │   │   │   ├── card.component.html
│   │   │   │   ├── card.component.scss
│   │   │   │   ├── card.component.spec.ts
│   │   │   │   └── card.component.ts
│   │   │   ├── compras
│   │   │   │   ├── compras.component.html
│   │   │   │   ├── compras.component.scss
│   │   │   │   ├── compras.component.spec.ts
│   │   │   │   └── compras.component.ts
│   │   │   ├── daskboard
│   │   │   │   ├── daskboard.component.html
│   │   │   │   ├── daskboard.component.scss
│   │   │   │   ├── daskboard.component.spec.ts
│   │   │   │   └── daskboard.component.ts
│   │   │   ├── modal-pokemon
│   │   │   │   ├── modal-pokemon.component.html
│   │   │   │   ├── modal-pokemon.component.scss
│   │   │   │   ├── modal-pokemon.component.spec.ts
│   │   │   │   └── modal-pokemon.component.ts
│   │   │   └── tabla
│   │   │       ├── tabla.component.html
│   │   │       ├── tabla.component.scss
│   │   │       ├── tabla.component.spec.ts
│   │   │       └── tabla.component.ts
│   │   ├── models
│   │   │   ├──  keycloakConfig.ts
│   │   │   ├── compraDTO.ts
│   │   │   ├── creditoResponse.ts
│   │   │   ├── productoDTO.ts
│   │   │   └── ventasDTO.ts
│   │   └── servicios
│   │       ├── auth.service.spec.ts
│   │       ├── auth.service.ts
│   │       ├── credito.service.ts
│   │       ├── juliaoSystemCrudHttpService.ts
│   │       ├── pokemon.service.spec.ts
│   │       ├── pokemon.service.ts
│   │       ├── productos.service.spec.ts
│   │       └── productos.service.ts

# importante para correr proyecto 

paso 1
 #  cd templeta-test-ng/projects/template-test-ng
paso 2
 # ng build -watch 

esto para generar la libreria plantilla de daskboard  localmente 


paso 3 
# cd templeta-test-ng/projects/test-app-ng  y ejecutar npm install 

paso 4 
# ejecutar  ng serve 



tener keycloack corriendo localmente pues el manejo de login se usa con keycloack 
crear un realm y un cliente  importante tambien tener configurada una base de datos postgres localmente 
adjunto archivos en la carpeta archivos en formato yml 

para poder correr en un  cluster de  kubernates local tanto keycloack como la base de datos con persistencia 

