import { cargarTartas } from './tartas.js';

/***************Cargar Tartas******************/
// Cargar las tartas desde Ajax
$(document).ready(function() {
    cargarTartas().then(tartas => {
        tartas.forEach(tarta => {
            $("#tipoProducto").append(`
                <option value="${tarta.nombre}">${tarta.nombre} - ${tarta.precio}</option>
            `);
        })
    }).catch(error => {
        console.error('Error al cargar las tartas:', error);
    });    
})
//**************Carrito de la compra******************/
// Mostrar el carrito de la compra
function mostrarCarrito() {
    const listaCarrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    const listaElement = $('#listaCarrito');
    listaElement.empty();

    if (listaCarrito.length === 0) {
        listaElement.append('<li class="list-group-item">El carrito está vacío</li>');
    } else {
        listaCarrito.forEach((item, index) => {
            const itemHtml = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.nombre}
                    <span class="badge bg-custom rounded-pill">${item.precio}</span>
                    <button class="btn btn-sm ms-2 eliminar-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                </li>
            `;
            listaElement.append(itemHtml);
        });
    }

    // Eliminar un producto del carrito
    $('.eliminar-item').on('click', function () {
        const index = $(this).data('index');
        listaCarrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));

        let contador = listaCarrito.length || 0;
        $("#contador").text(contador);

        mostrarCarrito();
    });
    $("#totalPresupuesto").text(totalPresupuesto().toFixed(2) + " €");
    
}

mostrarCarrito();

$(document).on('click', '#vaciarCarrito', function() {
    localStorage.removeItem("carrito");
    $("#contador").text(0);
    mostrarCarrito();
});

//**************Presupuesto******************/
// Calcular el total del presupuesto
function totalPresupuesto(){
    return sumaPresupuesto() + sumarExtras() - descuento();
}

function sumaPresupuesto(){
    const listaCarrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    let total = 0;
    listaCarrito.forEach(producto => {
        total += parseFloat(producto.precio);
    });
    
    return total;
}

// Sumar los extras seleccionados
function sumarExtras(){
    const extras = $(".checkbox-extra:checked");
    let totalExtras = 0;
    extras.each(function() {
        totalExtras += parseFloat($(this).val());
    });
    return totalExtras;
}

// Calcular el descuento
function descuento(){
    const cantidad = $("#cantidad").val();
    return cantidad ? (cantidad / 10) : 0;
} 

$(".checkbox-extra").change(function() {
    $("#totalPresupuesto").text(totalPresupuesto().toFixed(2) + " €");
})

$("#tipoProducto").change(function() {
    const selectedOption = $(this).find(":selected");
    const nombre = selectedOption.val();
    const precio = selectedOption.text().split(" - ")[1];

    if (nombre && precio) {
        const listaCarrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
        listaCarrito.push({ nombre, precio });
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));

        let contador = listaCarrito.length || 0;
        $("#contador").text(contador);

        mostrarCarrito();
    }
})

// Validar el campo de cantidad

$("#cantidad").change(function() {
    if ($(this).val() < 0 || $(this).val() > 4) {
        setError($(this), "El campo de plazos solo puede estar entre 0 y 4.");
    } else {
        $("#totalPresupuesto").text(totalPresupuesto().toFixed(2) + " €");  
    }
}) 

$("#cantidad").keyup(function() {
    if ($(this).val() < 0 || $(this).val() > 4) {
        setError($(this), "El campo de plazos solo puede estar entre 0 y 4.");
    } else {
        setSuccess($(this));
        $("#totalPresupuesto").text(totalPresupuesto().toFixed(2) + " €");  
    }
    
}) 

$("#enviar").click(function(e) {
    e.preventDefault();

    let valido = validarFormulario();

    if(valido == true){
        $("#formPresupuesto").submit();
    } else {
        window.scrollTo(0, 0);
    }
})

// Validar el formulario
function validarFormulario() {
    const nombre = $("#nombre");
    const apellidos = $("#apellidos");
    const telefono = $("#telefono");
    const email = $("#email");
    const plazos = $("#cantidad");
    const terminos = $("#terminos");
    let correcto = true;

    if(nombre.val() == null || nombre.val() == ""){
        setError(nombre, "El campo del nombre no puede estar en blanco.");
        correcto = false;
    }else{
        let name_reg = /^[A-Za-z ]{2,15}$/;
        if(!name_reg.exec(nombre.val())){ 
            setError(nombre, "El nombre solo puede contener letras y hasta 15 caracteres.");
            correcto = false;
        }else{
            setSuccess(nombre);
        }
    }

    if(apellidos.val() == null || apellidos.val() == ""){
        setError(apellidos, "El campo de apellidos no puede estar en blanco.");
        correcto = false;
    }else{
        let apellidos_reg = /^[A-Za-z ]{2,40}$/;
        if(!apellidos_reg.exec(apellidos.val())){ 
            setError(apellidos, "El apellidos solo puede estar compuesto de letras y hasta 40 caracteres.");
            correcto = false;
        }else{
            setSuccess(apellidos);
        }
    }

    if(telefono.val() == null || telefono.val() == ""){
        setError(telefono, "El campo del teléfono no puede estar en blanco.");
        correcto = false;
    }else{
        let telefono_reg = /^\d{9}$/;
        if(!telefono_reg.exec(telefono.val())){ 
            setError(telefono, "El Teléfono solo puede estar compuesto de números y deben de ser 9.");
            correcto = false;
        }else{
            setSuccess(telefono);
        }
    }

    if(email.val() == null || email.val() == ""){
        setError(email, "El campo del correo no puede estar en blanco.");
        correcto = false;
    }else{
        let email_reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email_reg.exec(email.val())){
            setError(email, "el campo del correo debe de ser valido.");
            correcto = false;
        }else{
            setSuccess(email);
        }
    }

    if(plazos.val() == null || plazos.val() == ""){
        setError(plazos, "El campo de plazos no puede estar en blanco.");
        correcto = false;
    }else{
        if(parseInt(plazos.val()) < 0 || parseInt(plazos.val()) > 4){
            setError(plazos, "El campo de plazos solo puede estar entre 0 y 4.");
            correcto = false;
        } else{
            setSuccess(plazos);
        }
    }

    if(terminos.is(":checked") == false){
        alert("Debes de aceptar los terminos y condiciones.");
        correcto = false;
    }else{
        setSuccess(terminos);
    }

    const listaCarrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    if (listaCarrito.length === 0) {
        alert("El carrito está vacío. Por favor, añade productos antes de enviar.");
        correcto = false;
    }

    if(correcto == true){
        return true;
    }else{
        return false;
    }
}

$(".form-control").change(function() {
    if ($(this).val() == null || $(this).val() == "") {
        setError($(this), "Este campo no puede estar en blanco.");
    } else {
        setSuccess($(this));
    }
})

// Funciones para establecer el estado de los campos del formulario

function setError(input, mensaje) {
    const formControl = $(input).parent();
    const small = formControl.find("small");
    formControl.removeClass("success").addClass("error");
    small.text(mensaje);
}

function setSuccess(input) {
    const formControl = $(input).parent();
    formControl.removeClass("error").addClass("success");
}

$("#borrar").click(function() {
    $("#cantidad").val("");
    $(".checkbox-extra").prop("checked", false);
    $("#totalPresupuesto").text(totalPresupuesto().toFixed(2) + " €");
})


