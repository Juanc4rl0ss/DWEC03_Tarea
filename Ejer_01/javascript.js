    //Declaramos las variables necesarias para el ejercicio,fuera de métodos para que existan en todo momento

    let obligatorios = document.querySelectorAll('.obligatorio');
    let fechaInput= document.getElementById("fecwha");
    let enviar = document.getElementById("enviar");
    let años = document.getElementById("edad");
    let limpiar = document.getElementById("limpiar");
    let camposErroneos = {
        email:false,
        asunto:false,
        telefono:false,
        mensaje:false
    }
    let contadorErrores=0;

    //Método que verifica si los campos han sido rellenados
    function verificarCampos() {

        //Creamos una variable bolean   
        let todoRellenado = true;

        // Seleccionar todos los span con la clase .obligatorio
        document.querySelectorAll('.obligatorio').forEach(span => {
            
            // Busca el campo de entrada más cercano        
            const input = span.closest('p').querySelector('input, textarea');
            
            //Éste condicional,hace que solo entre al if anidado,en caso de que el span no tenga cerca una clase llamada
            if(!span.closest('.aviso')){
        
                if (!input || input.value.trim() === "") {
                    //Si el input no existe o si está vacío,pasa a false,y por ende, desactivará el botón enviar
                    todoRellenado = false;
                } 
            }
        });
        if(contadorErrores==0){
        // Habilitar o deshabilitar el botón según si todos los campos están rellenados
        enviar.disabled = !todoRellenado;
        }
    }

    //Agregar un listener a cada campo de entrada que está asociado a un .obligatorio
    document.querySelectorAll('.obligatorio').forEach(span => {

        // Buscar el campo de entrada en el mismo contenedor <p>
        const input = span.closest('p').querySelector('input, textarea');

        //Si el input no es null
        if (input) {

            //Hacemos un listener,en éste caso, para que cada vez que se coloque un caracter en alguno de los campos, verifique que es una letra o un espacio
            input.addEventListener('input', verificarCampos);
        }
    });

    // Llamar a verificarCampos inicialmente para establecer el estado del botón
    verificarCampos();

    function calcularEdad(fecha) {
        console.log("Fecha ingresada:", fecha);

        // Convertir la fecha de DD/MM/YYYY a YYYY-MM-DD
        var partesFecha = fecha.split("/");

        // Si la sintaxis de la fecha, era de 3 barras, entra en el siguiente if, para pasarlo al formato de guion, me daba error y he tenido que hacer éste cambio
        if (partesFecha.length === 3) {
            
            fecha = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
        } else {

            // Si el formato de la fecha no es correcto, retorna un mensaje o NaN.
            return 'Formato de fecha incorrecto';
        }

        //Recogemos las variables para éste método
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        //Para calcular la edad, hace una resta, donde por un lado muetra la fecha actual, y por otro lado le resta la fecha del cumpleaños
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    //Con éste método limpiamos los campos, en caso de que el usuario clicke sobre el botón limpiar
    function limpiarCampos(){

        //En éste caso, creamos una variable que abarque los input y el textarea
        let campos= document.querySelectorAll("input,textarea");

        //Através de éste for each,lo qeu conseguimos es que todos los valores se vacíen, desde el value
        campos.forEach(function(campo){
            campo.value="";
        })
    }


    //En el momento que se coloca la fecha, se llama a un listener, el cual generará el valor de la edad
    fecha.addEventListener("change",function(){
        //Creamos una variable, que pasa como parámetro la fecha con el this
        let calculoedad= calcularEdad(this.value);

        //El campo años,declarado al principio de la página, se le pasa el valor que devuelve la función previa
        años.value =calculoedad;
    })
    document.getElementById('nombre').addEventListener('input', function(e) {
        // Expresión regular que solo permite letras (y espacios si deseas)
        const regex = new RegExp("^[A-Za-z\\s]*$");

        // Verificar si el valor actual del campo de entrada cumple con la expresión regular
        if (!regex.test(e.target.value)) {
            // Si no cumple, eliminar el último carácter ingresado
            e.target.value = e.target.value.slice(0, -1);
        }
    });

    // Evento blur para cambiar la primera letra a mayúscula
    document.getElementById('nombre').addEventListener('blur', function(e) {
        let nombre = e.target.value;
        if (nombre) {
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
            e.target.value = nombre;
        }
    });

    document.getElementById('apellidos').addEventListener('input', function(e) {
        // Expresión regular que solo permite letras (y espacios si deseas)
        const regex = new RegExp("^[A-Za-z\\s]*$");

        // Verificar si el valor actual del campo de entrada cumple con la expresión regular
        if (!regex.test(e.target.value)) {
            // Si no cumple, eliminar el último carácter ingresado
            e.target.value = e.target.value.slice(0, -1);
        }
    });

    

    // Evento blur para cambiar la primera letra a mayúscula
    document.getElementById('apellidos').addEventListener('blur', function(e) {
        let apellidos = e.target.value;
        if (apellidos) {
            apellidos = apellidos.charAt(0).toUpperCase() + apellidos.slice(1).toLowerCase();
            e.target.value = apellidos;
        }
    });

    //Ahora creamos un listener para que verifique que la fecha se coloca de manera eficiente
    document.getElementById('fecha').addEventListener('input', function(e) {

        //Ésta expresión regular, obliga a que sean valores numéricos, y que entre el dia ,el mes y el año,haya una / tal y como vemos en el placeholder del formulario
        //d{0,2} lo que decimos aquí, es que tiene que ser un valor númerico, de dos caracteres
        //la / entre las dos barras invertidas, obliga a que sea una barra de manera literal
        //el resto es lo mismo que en el día,salvo en el año que pasan a ser 4 valores númericos
       
        const regex = new RegExp("^\\d{0,2}(\\/\\d{0,2})?(\\/\\d{0,4})?$");

        
        if (!regex.test(e.target.value)) {
            // Si no cumple, eliminar el último carácter ingresado
            e.target.value = e.target.value.slice(0, -1);
        }
    });

    //ahora vamos a crear el listener,para que el correo electrónico sea tal y como pide el enunciado
    document.getElementById('email').addEventListener('blur', function(e) {

        //Expresion regular, que permite solo crear una direccion de correo de educacion
        const regex = /^[a-zA-Z0-9]+@(educacion\.)?navarra\.(es|com)$/;

        //Recogemos el valor del correo escrito en el input
        const emailInput = e.target;

        // El div con ID 'errores'
        const erroresDiv = document.getElementById('errores'); 
    
        if (!regex.test(emailInput.value)) {

            // Mostrar mensaje de error en el div 'errores'
            camposErroneos.email=true;
            almacenarMensajesDeError();
            emailInput.classList.add('incorrecto');

        } else {
            camposErroneos.email=false;
            // Limpiar mensaje de error si el correo es válido            
            almacenarMensajesDeError();
            emailInput.classList.remove('incorrecto');
        }
    });

     //ahora vamos a crear el listener,para que el correo electrónico sea tal y como pide el enunciado
     document.getElementById('asunto').addEventListener('blur', function(e) {

        //Expresion regular, que permite solo letras,y un maximo de 50 caracteres
        const regex = /^[a-zA-Z]{1,50}$/;

        //Recogemos el valor del correo escrito en el input
        const emailInput = e.target;

        // El div con ID 'errores'
        const erroresDiv = document.getElementById('errores'); 
    
        if (!regex.test(emailInput.value)) {

            camposErroneos.asunto=true;

            almacenarMensajesDeError();
            emailInput.classList.add('incorrecto');

        } else {

            camposErroneos.asunto=false;
            // Limpiar mensaje de error si el correo es válido            
            almacenarMensajesDeError();
            emailInput.classList.remove('incorrecto');
        }
    });


        //ahora vamos a crear el listener,para que el teléfono sea tal y como pide el enunciado
        document.getElementById('telefono').addEventListener('blur', function(e) {

            //Expresion regular, para validar si el número cumple los requisitos
      
            const regex = /^(6\d{8}|(948|848)\d{6})$/;
    
            //Recogemos el valor del correo escrito en el input
            const emailInput = e.target;
    
            // El div con ID 'errores'
            const erroresDiv = document.getElementById('errores'); 
        
            if (!regex.test(emailInput.value)) {

                camposErroneos.telefono=true;
    
                almacenarMensajesDeError();
                emailInput.classList.add('incorrecto');
    
            } else {
    
                camposErroneos.telefono=false;
                // Limpiar mensaje de error si el correo es válido            
                almacenarMensajesDeError();
                emailInput.classList.remove('incorrecto');
            }
        });   
       

        document.getElementById('mensaje').addEventListener('blur', function(e) {
            // Acceder directamente al input del mensaje, no es necesario .input
            let mensajeInput = e.target;
        
            // El div con ID 'errores'
            let erroresDiv = document.getElementById('errores');
        
            // Verificar la longitud del mensaje
            if (mensajeInput.value.length > 200) {
                camposErroneos.mensaje=true;
                almacenarMensajesDeError();
                mensajeInput.classList.add('incorrecto');
        
                // Acortar el mensaje al máximo permitido
                mensajeInput.value = mensajeInput.value.substring(0, 200);
            } else {
                // Limpiar mensaje de error y quitar clase 'incorrecto'
                camposErroneos.mensaje=false;
                almacenarMensajesDeError();
                mensajeInput.classList.remove('incorrecto');
            }
        });

    //Éste listener lo que hace, es actuar si le damos click al botón limpiar,en tal caso llama a la función limpiarCampos
    limpiar.addEventListener("click",limpiarCampos);

    //para enfocar,desenfocar, asociar datos correctos e incorrectos,aprovechando estilos predefinidos css
    
// Selecciona todos los elementos input
var inputs = document.querySelectorAll('input');

// Función para añadir la clase enfocado
function enfocarInput() {
    this.classList.add('enfocado');
    this.classList.remove('desenfocado');
}

// Función para añadir la clase desenfocado
function desenfocarInput() {
    this.classList.remove('enfocado');
    this.classList.add('desenfocado');
}

function incorrecto(){

}

// Añade Event Listeners a cada input
inputs.forEach(function(input) {
    input.addEventListener('focus', enfocarInput);
    input.addEventListener('blur', desenfocarInput);
    input.addEventListener('blur', incorrecto);
});

function almacenarMensajesDeError(){

    let erroresDiv= document.getElementById('errores');
    erroresDiv.innerHTML='';
    contadorErrores=0;


    if (camposErroneos.email) {
        erroresDiv.innerHTML += 'Correo electrónico no válido.<br>';
        contadorErrores++;
    }
    if (camposErroneos.asunto) {
        erroresDiv.innerHTML += 'Asunto incorrecto.<br>';
        contadorErrores++;
    }
    if (camposErroneos.telefono) {
        erroresDiv.innerHTML += 'Teléfono no válido.<br>';
        contadorErrores++;
    }
    if (camposErroneos.mensaje) {
        erroresDiv.innerHTML += 'El mensaje no puede exceder los 200 caracteres.<br>';
        contadorErrores++;
    }
    if(contadorErrores>0){
    erroresDiv.innerHTML +=`el número de errores que hay actualmente son ${contadorErrores}`;
    enviar.disabled=true;
    }

}
