window.onload=()=>{
    let usuario=localStorage.getItem("usuario");

    const jugador={
        nombre:usuario,
        dolar:0,
        logistica:0,
        armamentos:0,
        explosivos:0,
        municiones:0,
        chalecos:0
    }

    //MOSTRAR NOMBRE DE JUGADOR
    let nombreJug=document.querySelector("#nombreJugador");
    nombreJug.textContent=jugador.nombre;

    //MOSTRAR BOTON CAMPAÑA
    let campanas=document.querySelector("#campanas")
    function mostrarCampanas() {
        campanas.style.display="block";
    }
    
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
        }, tiempoEspera);
        
    });
    
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

    //GENERACION DE LOGISTICA

    let logistica=document.querySelector("#logistica");

    //GENERACION DE BOTONES
    let fabrica=document.querySelector("#fabrica");
    let entrenamiento=document.querySelector("#entrenamiento");
    let mando=document.querySelector("#mando");
    let vehiculos=document.querySelector("#vehiculos");
    let armeria=document.querySelector("#armeria");
    let suministros=document.querySelector("#suministros");
    let materiales=document.querySelector("#materiales");
    logistica.addEventListener("click", function () {
        logistica.disabled=true;
        entrenamiento.style.display="inline-block";
        mando.style.display="inline-block";
        fabrica.style.display="inline-block";
        suministros.style.display="inline-block";
        materiales.style.display="block";
    })
    
    //ACTIALIZACION DE MATERIAL

    let info_arm=document.querySelector("#info_armamento");
    let info_explo=document.querySelector("#info_explosivos");
    let info_muni=document.querySelector("#info_municiones");
    let info_chale=document.querySelector("#info_chalecos");
    function actulizarMaterial() {
        info_arm.textContent+=jugador.armamentos;
        info_explo.textContent+=jugador.explosivos;
        info_muni.textContent+=jugador.municiones;
        info_chale.textContent+=jugador.chalecos;
    
    }
    const promesaLogistica=new Promise(function (resolve) {
        if (jugador.logistica>0){
            resolve(actulizarMaterial());
        }  
    })
    

    
    
}