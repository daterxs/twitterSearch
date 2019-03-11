# Twitter search util #

Pensado como un cli en nodejs para buscar twitters a través del api. 

En principio tiene dos formas de store: filesystem y mongodb.
Esta pensado para que se le pueda ir agregando diferentes stores. 

## Modo de uso ##

** Esta pendiente agregar el cli en el bin/ y parametrizarlo**

Por el momento se debe ejecutar el script que esta en ```npm lib/start.js```
y configurar alli los parametros a buscar.

## Configuracion ##

Es necesario pasarle los datos para que se pueda conectar a la api de Twitter.
Puede ser con variables de ambiente o definiendo un archivo .env en la raiz del proyecto.

**Documentacion pendiente**
Por el momento reviscar lib/config.js

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

## Changelog ##

### version 0.1.0 ###
- docker-compose para mongodb
- salva a filesystem o mongodb
- establece un sleep de 15min si el api responde que no quedan mas requests disponibles.
