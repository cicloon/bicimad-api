API no oficial para BiciMad.
---

Se puede acceder a la API desde http://bicimad-api.herokuapp.com

Cuenta con los siguientes endpoints:

- http://bicimad-api.herokuapp.com/ : sólo realiza un proxy entre los servidores de Bicimad, devolviendo lo mismo que estos, los resultados tienen una caché de 15 minutos.

- http://bicimad-api.herokuapp.com/api-v1/locations/ : datos extraídos de una base de datos propia sincronizada cada 15 minutos con Bicimad.

- http://bicimad-api.herokuapp.com/api-v1/locations/nearest/ : devuelve los resultados ordenados por distancia (en metros) a un punto dado incluyendo la distancia hasta el punto. Los parámetros a pasar por query string son:

  - lat: latitud.
  - long: longitud.
  - distance: distancia máxima de los puntos.
