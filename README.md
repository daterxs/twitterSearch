# Twitter search util #

![cli_screenshotext](https://raw.githubusercontent.com/daterxs/twitterSearch/master/data/cli_screen.png)

Pensado como un cli en nodejs para buscar twitters a través del api. 

En principio tiene dos formas de store: filesystem y mongodb.
Esta pensado para que se le pueda ir agregando diferentes stores. 

## Modo de uso ##

### Mediante docker ###
```
git clone https://github.com/daterxs/twitterSearch
cd twitterSearch
docker build -t <usuario>/<image_name> .
```

Una forma de solo ejecutar el cli sin que instale nada y que luego se borre la instancia de docker:
```
docker run --rm --env-file .env <usuario>/<image_name> search --help
```

**.env** es donde debe ponerse el token de twitter. También se puede definir como variable de entorno. 

se puede utilizar docker-compose para levantar una imagen de mongo. Tener en cuenta que no es una imagen de mongodb oficial. 

### Instalacion mediante npm ###

```
git clone https://github.com/daterxs/twitterSearch
cd twitterSearch
npm install
bin/twit --help

```

## Configuracion ##

Es necesario pasarle los datos para que se pueda conectar a la api de Twitter.
Puede ser con variables de ambiente o definiendo un archivo .env en la raiz del proyecto.

> Documentacion pendiente por el momento revisar ```lib/config.js```

```
cat .env
NODE_ENV=dev
CONSUMER_KEY=""
CONSUMER_SECRET=""
ACCESS_TOKEN=""
ACCESS_TOKEN_SECRET=""
```
## Estructura de la aplicacion ##

Se compone de dos servicios: *twitService.js* y *storeService.js*

En *storeService* se podrán ir agregando diferentes medios de almacenamientos. 

En *twitService* esta todo lo referido a la comunicacion con twitter. 

En *endpoints.js* estan las rutas a las api de twitter.

En *model.js* Todo lo relacion a cómo mongodb guarda los twits.

## Pendientes/backlog ##
[x] agregar cli
[x] docker image
[] documentar el acceso y uso de la base
[] refactorizar storeService
[] agregar el endpoint de prometheus
[] tooling para export y salvar los archivos.
[] mejoras para la api del cli en search?
[] subir paquete a NPM
[] documentar todos los eventListeners
[] integracion con docker-compose para que pueda quedar ejecutando.

## Changelog ##

#### version 0.1.0 ####
* docker-compose para mongodb
* salva a filesystem o mongodb
* establece un sleep de 15min si el api responde que no quedan mas requests disponibles.

#### version 0.2.0 ####
* se empieza con testing
* se agrega una factory class
* se desacopla storeService con la idea de que se pueda elegir que handler setear para "searchTwits"
* Dockerfile para el cli
