import { cargarNoticias } from './noticias.js';

//**************Mostrar texto oculto******************/
// Al hacer clic en el enlace, alternar la visibilidad del texto oculto
$("#enlace").click(mostrar);

function mostrar(e) {
    const txtSpan = $("#txtOculto");
    const enlace = $("#enlace");
    const puntosSuspensivos = $("#puntosSuspensivos");

    if (txtSpan.hasClass("visible")) {
        txtSpan.removeClass("visible").addClass("oculto");
        puntosSuspensivos.text("...");
        enlace.text("Leer más...");
    } else {
        txtSpan.removeClass("oculto").addClass("visible");
        puntosSuspensivos.text(".");
        enlace.text("Leer menos...");
    }
}

//**************Cargar Noticias******************/
// Cargar las noticias desde Ajax
cargarNoticias();

