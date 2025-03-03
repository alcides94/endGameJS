# endGameJS

<h1>End Game</h1>

Dia 1: 22/02/2025 -> 15 hs 
Generacion de la idea de juego-> Desde que publico la practica pensaba la idea, asi que la decision fue hacerla en base 
a los Militares, Conquistar Territorios, Campañas y Compra de municiones.

Dinero -> Generara dolares (tarda 0.25 seg x numero dolar)
            -> 1 Dolar
            dolares -> sirven para la construccion de edificios 
                        -> dependiendo de la  contruccion se utiliza la cantidad de dolares
                        -> una vez que tenga 2 dolares aparece "Campañas"

Campañas -> vamos a tener diferentes tipos de campañas
            -> Logistica (vale 2 dolares) 
                -> una vez generado Logistica se  mostrara el "Material" que posee el jugador
                -> se habilitan 3 nuevos edificios
                -> se habilita Suministros
            1-> Fabrica -> generara un Municiones completo cada 25 segundos
                        -> habilita la generacion de "Vehiculos Militares"
            2-> Entrenamiento -> Se genera 5 Soldados por cada campaña de entrenamiento
                                -> se puede construir tantas campañas de entrenamiento como quiera 
                                -> precio varia dependiendo la cantidad de cmpañas de entrenamiento que se posea
            3-> Centro de mando -> una vez constuido se podra comprar:
                                        -> Explosivos  (1 Dolar)
                                        -> Armamento (1 Dolar)
                                        -> Chaleco (3 Dolares)
                                        -> Cargador (15 dolares)

            4-> Vehiculos Militares -> habilita "Armeria"
                            -> Vehiculos

            5-> Armeria -> se Realizara el proceso de los "Cargadores"
                            -> se necesitara 5 municiones (se eliminan los cargadores)
                            -> debe poseer 10 soldados
                            -> Se habilita en el panel "Conquistar"
            6-> Consquistar Territorio

Material -> se mostrara lo que posee el jugador (Armamento , Explosivos, Municiones y Chalecos)

Suministros -> Genera de manera aleatoria Armamento y Explosivos (entre 0 y el numero de soldados+2)
            -> una vez que genere se queda inactivo (entre 45 segundos - soldados) y luego se habilita nuevamente

/*Edificios*/
Edificio Coste Descripción
Logistica -> 
            -> Coste: Dolar x 2 
            -> "Cuando se construye se desbloquea el botón Suministros y el marcador de Material. 
            -> Habilita las Fabrica, Entrenamiento y Centro de Mando.

Entrenamiento ->
            -> Coste: Dolar x 6, Explosivos x 6
            -> Se pueden crear varias. 
            -> Cada una genera 5 Soldados. 
            -> Se incrementa su coste en 5 Dolar y 5 Explosivos cada vez que se compra una.
Fabrica -> 
            -> Coste: Dolar x 8, Explosivos x 9, Armamento x5
            -> Genera 1 municion cada 20 segundos. 
            -> Habilita los Vehiculos Militares.

Centro de Mando 
        -> Coste: Explosivos x 8, Armamento x 9 
        -> Habilita el botón Centro de Mando en el panel principal
                -> Al Hacer Click se podra comprar (Armamento, Explosivo, Chaleco)

Vehiculos Militares
        -> Coste: Dolar x 8, Armamento x 10, Municion x 5
        -> Habilita el Armeria
        -> Permite poner en marcha los "Tanques"
            -> Coste 2 de Chaleco y 5 Municiones

Armeria
        -> Coste: Dolar x 5, Explosivo x 8, Tanques x 3, 
        -> Habilita la Conquistar. 
        -> Permite transformar 2 municiones en "Cargador" a la vez debe poseer 10 soldados minimo.
         
Conquistar Territorio
        -> Coste: Dolar x 10, Armamento x 7, Explosivo x 9, Tanques x 3, Cargador x 10
        -> Al construir la taberna se gana el juego


/*MATERIALES*/

Dolar 
        -> Se consigue una unidad cada vez que se pulsa el botón Caja

Explosivo 
        -> Se consiguen X unidades al pulsar el botón Material. 
        -> Siendo X un valor aleatorio entre 0 y el número de trabajadores.
Armamento 
        -> Se consiguen X unidades al pulsar el botón Material. 
        -> Siendo X un valor aleatorio entre 0 y el número de trabajadores.

Soldados
        -> Se consiguen 5 Soldados cada vez que se construye un Entrenamiento
    
Municines 
        -> Se genera automáticamente cada 25 segundos al construir la Fabrica.

Chaleco
        -> Se obtiene una unidad en el mercado a cambio de 3 Dolar

Vahiculos
        -> Se produce una unidad tras pulsar el botón armar 
        -> se cobra 2 de chalecos y 10 municiones

Cargadores
        -> Se obtiene una unidad al cambiar 2 municiones en Armeria. 




Dia 2: Se pulio la idea del juego, se busco las imagenes para que quede bonito ja
        Se agregara un jugador como un objeto Json, para que todo se carge al jugador 
        Se realizo el index el cual envia mediante el localStorage el numbre de usuario para que este sea cargado al objeto
        se procedio a realizar el boton de caja el cual genera la moneda se utilizo un setTimeout para que lo cargue en un tiempo 

        Se estuvo pensando en implementar promesas pero al final no, pusimos un if dentro del setTimeout para que cuando el jugador tenga 2 monedas se ejecute mostrar

Dia 3: Se procede a continuar con el segundo boton de Suministro, se procedio a verificar que se actualice materiales 
        

Dia 4: se procedio a realizar el boton de Entrenamiento, verificando con un if para ver si  se complia con los requisitos para la creacion y actulizando el material

Dia 5: Se pocredio a crear el boton de fabrica, para crear las municiones, como sabemos se que se debe ejecutar cada 20 segundos, se utiliza setInterval, funcion que sirve para ello

Dia 6:  Se procedio a la creacion de armeria, se verifica que se cumpla los requisitos soliictados y se continuo.

