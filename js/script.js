//**************Colocar Footer******************/
// Colocar el footer al final de la página si el contenido es menor que la altura de la ventana
$(window).on("load resize", function() {
    colocarFooter();
});

function colocarFooter() {
    const footer = $("footer");
    const bodyHeight = $("body").outerHeight();
    const windowHeight = $(window).height();

    if (bodyHeight < windowHeight) {
        footer.css({
            position: "fixed",
            bottom: 0,
            width: "100%"
        });
    } else {
        footer.css({
            position: "static"
        });
    }
}

$(document).ready(function() {
    const listaCarrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    $("#contador").text(listaCarrito.length || 0);
});


