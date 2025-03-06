window.onload=()=>{
    let usuario=localStorage.getItem("usuario");

    const jugador={
        nombre:usuario,
        dolar:0,
        soldados:0,
        fabrica:0,
        entrenamiento:0,
        logistica:0,
        armamentos:0,
        explosivos:0,
        municiones:0,
        proteccion:0,
        vehiculos:0,
        tanques:0,
        cargadores:0
    }

    const precios={
        logistica:2,
        entrenamiento:[1,1], //6,6 SE CAMBIO POR TODO 1
        fabrica:[1,1,1], //8,9,5 SE CAMBIO POR TODO 1
        armeria:[1,1], //se cambia 8 , 9 por 1,1
        vehiculos: [1,1,1],// se cambio 8,10,5 por 1
        tanques:[1,1],  //se cambio 2,5 por 1
        mando:[1,1,1],//5,8,3 por 1
        cargadores:[1,1], //2,10 por 1
        conquistar:[1,1,1,1,1] //10,7,9,3,10 por 1
    }
    //MOSTRAR NOMBRE DE JUGADOR
    let nombreJug=document.querySelector("#nombreJugador");
    nombreJug.textContent=jugador.nombre;
    
    let imagenes=document.querySelector("#imagenes");
    //GENERACION DE DOLARES
    let caja=document.querySelector("#caja");
    caja.addEventListener("click", function () {
        caja.disabled=true;
        let tiempoEspera=jugador.dolar*250;
        if (tiempoEspera==0){
            tiempoEspera=250; 
        }
        setTimeout(function() {
            jugador.dolar++;
            //console.log(jugador.dolar);
            caja.disabled = false; 
            console.log(jugador);
            if(jugador.dolar>=2){
                mostrarCampanas();
            }

            if (jugador.logistica===1){
                actualizarMaterial();
            }
        }, tiempoEspera);
        
    });
    
    //MOSTRAR BOTON CAMPAÑA
    let campanas=document.querySelector("#campanas")
    function mostrarCampanas() {
        campanas.style.display="block";
    }

    //Mostrar Tipos de Campaña
    let tipos_campanas=document.querySelector("#tipos_campanas");
    let campana=document.querySelector("#campana");
    campana.addEventListener("click", function (e) {
        if (tipos_campanas.style.display === "block") {
            tipos_campanas.style.display = "none"; 
        } else {
            tipos_campanas.style.display = "block";   
        }
    });

    //GENERACION DE BOTONES
    let logistica=document.querySelector("#logistica");
    let mensaje=document.querySelector("#mensajes");
    
    //CREACION  DE BOTONES
    function creacionBotones() {
        
        //CREACION DE BOTON FABRICA
        var fabrica = document.createElement("button");
        fabrica.innerText="Fabrica";
        let imagenFabrica=document.createElement("img");
        imagenFabrica.src="./img/ed_fabrica1.png";
        fabrica.appendChild(imagenFabrica);
        
        //CREACION DE BOTON ENTRENAMIENTO
        var entrenamiento = document.createElement("button");
        entrenamiento.innerText="Entrenamiento";
        let imagenentrenamiento=document.createElement("img");
        imagenentrenamiento.src="./img/ed_entrenamiento.png";
        entrenamiento.appendChild(imagenentrenamiento);

        //CREACION DE BOTON ARMERIA
        var armeria = document.createElement("button");
        armeria.innerText="Armeria";
        let imagenarmeria=document.createElement("img");
        imagenarmeria.src="./img/ed_armeria.png";
        armeria.appendChild(imagenarmeria);



        tipos_campanas.append(fabrica,entrenamiento, armeria);
        
        document.querySelector("#suministros").style.display="block";
        document.querySelector("#materiales").style.display="block";

        //ADHERIMOS LA FUNCION a ENTRENAMIENTO
        entrenamiento.addEventListener("click", function () {
            if (jugador.dolar>=precios.entrenamiento[0] && jugador.explosivos>=precios.entrenamiento[1]) {
                jugador.soldados+=5;
                jugador.entrenamiento++;
                jugador.dolar-=precios.entrenamiento[0];
                jugador.explosivos-=precios.entrenamiento[1];
                precios.entrenamiento[0]+=5;
                precios.entrenamiento[1]+=5;
                actualizarMaterial();
                if (jugador.entrenamiento===1) {
                    crearImagenEntrenamiento();
                }
                mostrarMensaje("Se Creo Campaña Entrenamiento y se reclutaron 5 Soldados");
            }else{
                mostrarMensajeError("al crear la campaña: "+entrenamiento.innerText);
            }
        })

        //ADHERIMOS LA FUNCION a FABRICA
        fabrica.addEventListener("click", function () {
            if (jugador.dolar>=precios.fabrica[0] && jugador.explosivos>=precios.fabrica[1] && jugador.armamentos>=precios.fabrica[2] ) {
                jugador.fabrica++;
                agregarVehiculo();
                fabrica.disabled=true;
                jugador.dolar-=precios.fabrica[0];
                jugador.explosivos-=precios.fabrica[1];
                jugador.armamentos-=precios.fabrica[2];
                crearImagenFabrica();
                setInterval(()=>{
                    jugador.municiones++;
                    actualizarMaterial();
                },2000); //se modifico a 2 segundos 
                mostrarMensaje("Se creo Fabrica");
            }else{
                mostrarMensajeError(fabrica.innerText);  
            }   
        })

         //ADHERIMOS LA FUNCION a ARMERIA
         armeria.addEventListener("click", function () {
            if ( jugador.explosivos>=precios.armeria[0] && jugador.armamentos>=precios.armeria[1] ) {
                jugador.fabrica++;
                armeria.disabled=true;
                //document.querySelector("#armerias").style.display="block";
                jugador.explosivos-=precios.armeria[0];
                jugador.armamentos-=precios.armeria[1];
                creacionImagenArmeria();
                
                actualizarMaterial();
                mostrarMensaje("creado Armeria donde podes realizar compras");
            }else{
                mostrarMensajeError(armeria.innerText);
            }   
    
        })

    } 

    //AGREGAMOS LA FUNCION DE AGREGAR EL BOTON VEHCULO
    function agregarVehiculo() {
        var vehiculos = document.createElement("button");
        vehiculos.innerText="Automotor";
        let imagenvehiculos=document.createElement("img");
        imagenvehiculos.src="./img/ed_vehiculosMilitares.png";
        vehiculos.appendChild(imagenvehiculos);
        tipos_campanas.appendChild(vehiculos);
    
        vehiculos.addEventListener("click", function () {
            if ( jugador.dolar>=precios.vehiculos[0] && jugador.armamentos>=precios.vehiculos[1] && jugador.municiones>=precios.vehiculos[2] ) {               
                vehiculos.disabled=true;
                creacionImagenVechiulo();
                jugador.dolar-=precios.vehiculos[0];
                jugador.armamentos-=precios.vehiculos[1];
                jugador.municiones-=precios.vehiculos[2];
                jugador.vehiculos+=1;
                agregarMando();
                mostrarMensaje("creado Campaña Automotor")
                actualizarMaterial();
            }else{
                mostrarMensajeError("No se puedo crear");
            }  
        })
         
    
    }

    //CREACION DE IMAGEN AUTOMOTOR
    function creacionImagenVechiulo() {
        let diVehiculos = document.createElement("div");
        let imgVehiculos=document.createElement("img");
        diVehiculos.innerText="Automotores";
        let btnVehiculos=document.createElement("button");
        btnVehiculos.innerText="Armar Tanque"
        imgVehiculos.src="./img/ed_vehiculosMilitares.png";
        diVehiculos.append(imgVehiculos, btnVehiculos);
        imagenes.appendChild(diVehiculos);
        btnVehiculos.addEventListener("click", function () {
            if ( jugador.municiones>=precios.tanques[0] && jugador.proteccion>=precios.tanques[1]) {               
                jugador.municiones-=precios.tanques[0];
                jugador.proteccion-=precios.tanques[1];
                jugador.tanques+=1;       
                mostrarMensaje("creado Campaña Automotor")
                actualizarMaterial();
            }else{
                mostrarMensajeError("No se puedo crear");
            }  
        })
    }

    

    //CREACION DE MANDO

    function agregarMando() {
        var mando = document.createElement("button");
        mando.innerText="Control de Mando";
        let imagenmando=document.createElement("img");
        imagenmando.src="./img/ed_controlMando.png";
        mando.appendChild(imagenmando);
        tipos_campanas.appendChild(mando);
        
        mando.addEventListener("click", function () {
            if ( jugador.dolar>=precios.mando[0] && jugador.armamentos>=precios.mando[1] && jugador.explosivos>=precios.mando[2] ) {
                mando.disabled=true;
                jugador.dolar-=precios.mando[0];
                jugador.armamentos-=precios.mando[1];
                jugador.explosivos-=precios.mando[2];
                agregarConquistar();
                actualizarMaterial();
                creacionImagenMando();
                mostrarMensaje("creado Control de Mando");
            }else{
                mostrarMensajeError("al tratar de Crear Control de Mando");
            }   
    
        });
         
    
    }
    
    //CREACION DE IMAGEN DE MANDO
    function creacionImagenMando() {
        let diMando = document.createElement("div");
        let imgMando=document.createElement("img");
        let btnMando=document.createElement("button");
        diMando.innerText="Control de Mando";
        btnMando.innerText="Cargar Misil"
        imgMando.src="./img/ed_controlMando.png";
        diMando.append(imgMando, btnMando);
        imagenes.appendChild(diMando);
        btnMando.addEventListener("click", function () {
            if (jugador.municiones>=precios.cargadores[0] && jugador.soldados>=precios.cargadores[1]) {               
                jugador.municiones-=precios.cargadores[0];
                jugador.cargadores+=1;       
                mostrarMensaje("Se realizo la carga de un Cargador")
                actualizarMaterial();
            }else{
                mostrarMensajeError("No se pudo realizar la carga por falta de municiones");
            }  
        })
    }

    //AGREGAMOS CONQUISTAR

    function agregarConquistar() {
        var conquistar = document.createElement("button");
        conquistar.innerText="CONQUISTAR";
        conquistar.setAttribute("backgound-color", "red");
        conquistar.setAttribute("color", "white");
        tipos_campanas.appendChild(conquistar);
        
        conquistar.addEventListener("click", function () {
            if ( jugador.dolar>=precios.conquistar[0] && jugador.armamentos>=precios.conquistar[1] && jugador.explosivos>=precios.conquistar[2] && jugador.tanques>=precios.conquistar[3]&& jugador.cargadores>=precios.conquistar[4]) {
                jugador.dolar-=precios.conquistar[0];
                jugador.armamentos-=precios.conquistar[1];
                jugador.explosivos-=precios.conquistar[2];
                jugador.tanques-=precios.conquistar[3];
                jugador.cargadores-=precios.conquistar[4];
                actualizarMaterial();
                
                funcionConquistar();
            }else{
                mostrarMensajeError("al tratar de conquistar te falta cumplir criterios");
            }   
    
        });
         
    
    }


    function funcionConquistar() {
        let scoreFinal=(jugador.municiones*0.1)+(jugador.armamentos*0.5)+(jugador.cargadores*0.5)+(jugador.tanques*0.8)+(jugador.explosivos*0.5)+(jugador.proteccion*0.5)+(jugador.soldados*1);
              
        const url2 = "http://www.jaimeweb.es/medac/setProfesores.php";
        
        let fd = new FormData();
        
        fd.append("nombre", jugador.nombre);
        fd.append("dni", scoreFinal);

        const cabecera = {
            method: "POST",
            body: fd
        }
    
        fetch(url2, cabecera)
            .then(function (respuesta) {
    
                if (!respuesta.ok) {
                    throw new Error("Error del fetch: " + respuesta.status);
                };
                
                return respuesta.json();        
            })
            .then(function (datos) {
    
                console.log(datos);

                let objetoJugador=JSON.stringify({
                    nombre: jugador.nombre,
                    dni: scoreFinal
                });
        
                localStorage.setItem("jugador",objetoJugador);


                window.location.href = "./final.html";
                
            })
            .catch(function (error) {
                mostrarMensajeError("Problemas accediendo a la URL: " + error);
            })

        

    }


    //GENERACION DE LOGISTICA
    logistica.addEventListener("click", function () {
        logistica.disabled = true;
        
        let promesa = new Promise((resolve, reject) => {
            if (jugador.dolar >= 2) {
                resolve();
            } else {
                reject("Error desconocido JA");
            }
        });

        promesa.then(() => {
            jugador.dolar -= 2;
            jugador.logistica++;
            crearImagenLogistica();
            //actualizarImagenes();
            actualizarMaterial();
            creacionBotones();
            mostrarMensaje("creado la campaña Logistica");
            
        }).catch(error => {
            
           mostrarMensajeError(error);
        });
        
    })
    

    //CREACION DE IMAGEN LOGISTICA
    function crearImagenLogistica() {
        let diLogistica = document.createElement("div");
        let imgLogistica=document.createElement("img");
        diLogistica.innerText="Campaña Logistica"
        imgLogistica.src="./img/ed_logistica.png";
        diLogistica.append(imgLogistica);
        imagenes.appendChild(diLogistica);
        diLogistica.addEventListener("click", function () {
            if (jugador.logistica>=1) {                    
                mostrarMensaje("Posees Campaña Logistica")
                actualizarMaterial();
            }else{
                mostrarMensajeError("No Tienes Logistica");
            }  
        })
    }

//CREACION DE IMAGEN FABRICA
    function crearImagenFabrica() {
        let diFabrica = document.createElement("div");
        let imgFabrica=document.createElement("img");
        diFabrica.innerText="Campaña Fabrica"
        imgFabrica.src="./img/ed_fabrica1.png";
        diFabrica.append(imgFabrica);
        imagenes.appendChild(diFabrica);
        diFabrica.addEventListener("click", function () {
            if (jugador.fabrica>=1) {                    
                mostrarMensaje("Posees Campaña Fabrica")
                actualizarMaterial();
            }else{
                mostrarMensajeError("No Tienes Fabrica");
            }  
        })
    }

    //CREACION DE IMAGEN ENTRENAMIENTO
    function crearImagenEntrenamiento() {
        let diEntrenamiento = document.createElement("div");
        let imgEntrenamiento=document.createElement("img");
        diEntrenamiento.innerText="Campaña Entrenamiento"
        imgEntrenamiento.src="./img/ed_entrenamiento.png";
        diEntrenamiento.append(imgEntrenamiento);
        imagenes.appendChild(diEntrenamiento);
        diEntrenamiento.addEventListener("click", function () {
            if (jugador.entrenamiento>=1) {                    
                let mj="Posees "+jugador.entrenamiento+" Campañas de Entrenamiento";
                mostrarMensaje(mj);
                actualizarMaterial();
            }else{
                mostrarMensajeError("No Tienes Entrenamiento");
            }  
        })
    }

    //BOTON ARMERIA PARA COMPRAS
    var compras=document.querySelector("#compras");
    // document.querySelector("#btn_armeria").addEventListener("click", function () {
    //     if (compras.style.display === "block") {
    //         compras.style.display = "none"; 
    //     } else {
    //         compras.style.display = "block";   
    //     }
    // });


    //CREACION DE IMAGEN ARMERIA
    function creacionImagenArmeria() {
        let diArmeria = document.createElement("div");
        //let imgArmeria=document.createElement("img");
        diArmeria.innerText="Armeria";
        // let btnArmeria=document.createElement("button");
        // btnArmeria.innerText="Armeria"
        // //imgArmeria.src="./img/ed_armeria.png";
        // diArmeria.append(btnArmeria);
        imagenes.appendChild(diArmeria);
        creacionArmeria(diArmeria);
        
    }

    //FUNCION DE CREACION DE ARMERIA
    function creacionArmeria(compras) {
        //CREACION DE BOTON ARMAMENTO
        let armamento = document.createElement("button");
        armamento.innerText="Armamento";
        armamento.setAttribute("font-size", "5px");
        // let imagenarmamento=document.createElement("img");
        // imagenarmamento.src="./img/re_arma.png";
        // armamento.appendChild(imagenarmamento);
        
        //CREACION DE BOTON EXPLOSIVOS
        let explosivos = document.createElement("button");
        explosivos.innerText="Explosivos";
        // let imagenexplosivos=document.createElement("img");
        // imagenexplosivos.src="./img/explosivo.png";
        // explosivos.appendChild(imagenexplosivos);

        //CREACION DE BOTON PROTECCION
        let proteccion = document.createElement("button");
        proteccion.innerText="Proteccion";
        // let imagenproteccion=document.createElement("img");
        // imagenproteccion.src="./img/re_chaleco.png";
        // proteccion.appendChild(imagenproteccion);

        compras.append(armamento,explosivos, proteccion);
        
        //ADHERIR FUNCION DE COMPRA DE ARMA
        armamento.addEventListener("click", function () {
            if (jugador.dolar>=1) {
                jugador.armamentos++;
                jugador.dolar--;
                actualizarMaterial();
                mostrarMensaje("Agregaste 1 armamento");
            }else{
                mostrarMensajeError("No tenes suficientes dolares");
            }

        });
        //ADHERIR FUNCION DE COMPRA DE EXPLOSIVOS
        explosivos.addEventListener("click", function () {
            if (jugador.dolar>=1) {
                jugador.explosivos++;
                jugador.dolar--;
                actualizarMaterial();
                mostrarMensaje("Agregaste 1 explosivos");
            }else{
                mostrarMensajeError("No tenes suficientes dolares");
            }

        })
        //ADHERIR FUNCION DE COMPRA DE EXPLOSIVOS
        proteccion.addEventListener("click", function () {
            if (jugador.dolar>=3) {
                jugador.proteccion++;
                jugador.dolar-=3;
                actualizarMaterial();
                mostrarMensaje("Agregaste 1 proteccion");
            }else{
                mostrarMensajeError("No tenes suficientes dolares");
            }

        })


    };


    //ACTIALIZACION DE MATERIAL
    
    function actualizarMaterial() {
        let materiales=document.querySelector("#materiales");
        //materiales.style.display="block";
        materiales.innerText="Materiales: ";
        let infoDolar = document.querySelector("#infoDolar");
        if (!infoDolar) {
            infoDolar = document.createElement("p");
            infoDolar.id = "infoDolar";
            let infoArmamento = document.createElement("p");
            infoArmamento.id = "infoArmamento";
            let infoExplosivos = document.createElement("p");
            infoExplosivos.id = "infoExplosivos";
            let infoSoldados = document.createElement("p");
            infoSoldados.id = "infoSoldados";
            let infoMuniciones = document.createElement("p");
            infoMuniciones.id = "infoMuniciones";
            let infoProteccion = document.createElement("p");
            infoProteccion.id = "infoProteccion";
            let infoTanques = document.createElement("p");
            infoTanques.id = "infoTanques";
            let infoCargadores = document.createElement("p");
            infoCargadores.id = "infoCargadores"; 
            document.querySelector("#materiales").append(infoDolar, infoArmamento, infoExplosivos, infoProteccion, infoMuniciones,infoCargadores, infoSoldados, infoTanques);
        }

        infoDolar.innerText="Dolar: "+ jugador.dolar;
        infoArmamento.innerText="Armamento: "+jugador.armamentos;
        infoExplosivos.innerText="Explosivos: "+jugador.explosivos;
        infoProteccion.innerText="Proteccion: "+jugador.proteccion;
        infoMuniciones.innerText="Municiones: "+jugador.municiones;
        infoCargadores.innerText="Cargadores: "+jugador.cargadores;
        infoSoldados.innerText="Soldados: "+jugador.soldados;
        infoTanques.innerText="Tanques: "+jugador.tanques;
        
        
    }
   
    function mostrarMensajeError(params) {
        mensaje.style.color="red";
        mensaje.textContent="Error : "+params;
        setTimeout(() => {
            mensaje.textContent="";
        }, 2000);
    }
    function mostrarMensaje(params) {
        mensaje.style.color="green";
        mensaje.textContent="has "+params;
        setTimeout(() => {
            mensaje.textContent="";
        }, 2000);
    }

    //GENERACION DE SUMINISTRO
    let suministro=document.querySelector("#suministro");
    suministro.addEventListener("click", function () {
        let tiempoSuministro=4500-(jugador.soldados*100);//se puso 4.5 seg
        suministro.disabled=true;
        setTimeout(() => {
            let arma = Math.floor(Math.random() * (jugador.soldados + 3));
            let explo = Math.floor(Math.random() * (jugador.soldados + 3));
            console.log(arma,explo);
            jugador.explosivos += explo; 
            jugador.armamentos += arma; 
            actualizarMaterial(); 
            suministro.disabled=false;
        }, tiempoSuministro);
    
    });


    

    
}