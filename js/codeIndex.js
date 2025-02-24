window.onload=()=>{

    let btnIniciar= document.querySelector('#btnIniciar');
    let nombreUsu = document.getElementById("usuario");
    btnIniciar.addEventListener("click", function () {
        let regex = /^[A-Za-z0-9_]{4,15}$/;
        
        let errorMensaje = document.getElementById("errorMensaje");
        if (!regex.test(nombreUsu.value)) {
            errorMensaje.textContent = "El usuario debe tener entre 4 y 15 caracteres y solo puede contener letras, números y guiones bajos.";
        } else {
            errorMensaje.textContent = ""; 
            
            localStorage.setItem("usuario",nombreUsu.value);
            location.href="../juego.html";
            
            
        }
    })





}