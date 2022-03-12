let ele2, ele, menu, v_login, v_home, entrar, cerrar, vistas = [], categorias = [], val, opcion;

let path = window.location.pathname;
let arr = path.split("/");
let page = arr.pop();
let page2 = arr.pop();

//Iniciar la ejecucion de la funcion cuando la pagina cargue por completo
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        ele2 = document.getElementsByTagName("div")[0];
        ele = ele2.getElementsByTagName("div")[0];
        menu = document.getElementsByTagName("nav")[0];
        init();
        if(page === "apuntes.html" || path === "/App-movil-en-web/apuntes.html"){
            opcion = document.getElementById('opciones').selectedOptions[0].value;
            for (let i = 0; i < 4; i++) {
                let valor = document.getElementById("enlace"+(i+1)).childNodes;
                categorias.push(valor);
            }
            cargarCategorias();
            document.getElementById("opciones").addEventListener("change", cargarCategorias);
            cerrar = document.getElementById("cerrar_s").addEventListener("click", cerrarSesion);
        }
        else if(page === "index.html" || path === "/App-movil-en-web/"){
            v_login = document.getElementById("vista_login");
            v_home = document.getElementById("vista_home");
            v_registro = document.getElementById("vista_registro");
            vistas.push(v_login);
            vistas.push(v_home);
            vistas.push(v_registro);
            cargarVistas();
        }
        else{
            cerrar = document.getElementById("cerrar_s").addEventListener("click", cerrarSesion);
        }
    }
});

function cargarVistas(){
    let s = sessionStorage.getItem("sesion");
    if(s == 0 || s == null){
        for(let i = 0; i<vistas.length; i++){
            vistas[i].classList.add("hide");
        }
        vistas[0].classList.remove("hide");
        document.getElementById("Registrar").addEventListener("click", vistaRegistro);
        entrar = document.getElementById("Entrar").addEventListener("click", iniciarSesion);
        cerrar = document.getElementById("cerrar_s").addEventListener("click", cerrarSesion);
    }
    else if(s == 1){
        vistaHome();
    }
}

function vistaRegistro(){
    document.getElementById("boton_regist").addEventListener("click", validacion);
    for(let i = 0; i<vistas.length; i++){
        vistas[i].classList.add("hide");
    }
    vistas[2].classList.remove("hide");
}

function vistaHome(){
    sessionStorage.setItem("sesion", 1);
    for(let i = 0; i<vistas.length; i++){
        vistas[i].classList.add("hide");
    }
    vistas[1].classList.remove("hide");
    cerrar = document.getElementById("cerrar_s").addEventListener("click", cerrarSesion);
}

function cerrarSesion(){
    toggleMenu();
    document.getElementById("body-overlay2").classList.add("menu-open");
    document.getElementById("recuadro_s").classList.add("active");
    document.getElementById("entendido").addEventListener("click", cerrarRecuadro);
}

function cerrarRecuadro(){
    document.getElementById("recuadro_s").classList.remove("active");
    document.getElementById("body-overlay2").classList.remove("menu-open");
    sessionStorage.setItem("sesion", 0);
    if(page === "index.html"){
        cargarVistas();
    }
    else{
        document.location = "index.html";
    }
}

//Funcion para cambiar el estado del menu
function toggleMenu() {
    if (!hasClass(ele, "menu-open")) {
        ele.classList.add("menu-open");
    } else {
        ele.classList.remove("menu-open");
    }

    if (!hasClass(menu, "menu-open")) {
        menu.classList.add("menu-open");
    } else {
        menu.classList.remove("menu-open");
    }
}

//A los elementos con estos ids les agregamos un evento de click para ejecutar la funcion activarMenu
function init() {
    document.getElementById("open-menu").addEventListener("click", toggleMenu);
    document.getElementById("body-overlay").addEventListener("click", toggleMenu);
}

function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

let valores2;

function cargarCategorias(){
    opcion = document.getElementById('opciones').selectedOptions[0].value;

    for (let j=0; j<categorias.length; j++){
        valor = categorias.at(j).item(1).id;
        if(opcion != valor){
            valores2 = document.getElementsByName(valor);
            let n = 0;
            for (let k = 0; k < valores2.length; k++) {
                valores2[k].classList.add("close");
            }
        }
        else{
            valores2 = document.getElementsByName(valor);
            for (let k = 0; k < valores2.length; k++) {
                valores2[k].classList.remove("close");
            }
        }
    }
}

//para el registro
let valido, valores = [];

//funcion para validar que los campos esten completos
function validacion (){
    valido = true;
    //agrego datos del usuario en un array
    valores.push(document.getElementById("nombre").value);
    valores.push(document.getElementById("correo2").value);
    valores.push(document.getElementById("universidad").value);
    valores.push(document.getElementById("carrera").value);
    valores.push(document.getElementById("monitor").value);
    valores.push(document.getElementById("password2").value);

    for(let i=0; i<valores.length; i++){
        if (valores[i] == ""){
            valido = false;
            break;
        }
    }

    if(valido == true){
        if (!localStorage.getItem(correo2)){
            registro();
        }
        else{
            alert("Usted ya se encuentra registrado");
            cargarVistas();
        }
       
    } 
    else{
        alert('Por favor completa todos los campos');
        valores = [];
    }
}

function registro(){
    var nombre = document.getElementById("nombre").value; //obtengo los valores del los campos del form
    var correo = document.getElementById("correo2").value;
    var universidad = document.getElementById("universidad").value;
    var carrera = document.getElementById("carrera").value;
    var password = document.getElementById("password2").value;
    var formulario = document.getElementById("formulario");


    //creo un objeto usuario
     var datosUsuario = {
        nombre: nombre,
        correo: correo,
        universidad: universidad,
        carrera: carrera,
        password: password
    };

    //agrego los datos del usuario al localStorage
    localStorage.setItem(datosUsuario.correo, JSON.stringify(datosUsuario));
    console.log(datosUsuario)
    formulario.reset(); //blanquea los campos del form
    alert('Registro exitoso. Bienvenido a EstudiantesApp');
    vistaHome();
   
}

function iniciarSesion(){
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(correo != ""){
        let sesion = JSON.parse(localStorage.getItem(correo));
        if(sesion != null){
            if(correo == sesion.correo && password == sesion.password){
                alert("Bienvenido "+ sesion.nombre + " a EstudiantesApp");
                vistaHome();
            }
            else{
                alert("Correo o contraseña incorrecta");
            }
        }
        else{
            alert("Correo o contraseña incorrecta");
        }
    }
    else{
        alert("Ingresa primero un correo y contraseña");
    }
}
