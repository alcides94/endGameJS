window.onload=()=>{

    let datos=document.querySelector("#datos");
    let campo=document.querySelector("#usuario");
    let jugador1=JSON.parse(localStorage.getItem("jugador"));

    let dato1=document.createElement("p");

    dato1.innerText="Nombre Jugagor: "+jugador1.nombre+" \n"+"Score Final: "+jugador1.dni;
    
    datos.appendChild(dato1);

    let ok=false;
    document.querySelector("#btn").addEventListener("click", function () {
        const url="http://www.jaimeweb.es/medac/getProfesores.php";
        /**APARTADO A */
        
        let contenidoScore="";
            fetch(url)
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error("Error"+respuesta.status);
                    
                }            

                return respuesta.json();
            })
            .then(function (datos) {
                for (const element of datos) {
                    if (element.nombre==campo.value) {
                        console.log("encontrado");
                        contenidoScore=element.dni;
                        ok=true;
                    }
                }
                
                let cajafin=document.querySelector("#final");
                let parra=document.createElement("p");
                if(ok){
                    if (contenidoScore>jugador1.dni) {
                        parra.innerText="Perdiste, Score de "+campo.value+" es: "+contenidoScore;
                    }else if(contenidoScore<jugador1.dni) {
                        parra.innerText="Ganaste, Score de "+campo.value+" es: "+contenidoScore;
                    }else{
                        parra.innerText="Empataron";
                    }
                }else{
                    parra.innerText="El usuario NO esta";
                }

                cajafin.appendChild(parra);


            })
            .catch(function (error) {
                alert("Error"+error);
            })
        
        
    });



}