import { cargarTartas } from './tartas.js';

const listaCarrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];

//**************Modal******************/
// Mostrar el modal al hacer clic en la imagen de la tarjeta    
function openModal() {
    $(document).on('click', '.card-img-top', function () {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt');
        const nombre = $(this).data('nombre');
        const descripcion = $(this).data('descripcion');
        const precio = $(this).data('precio');

        const modalHtml = `
            <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="imageModalLabel">${nombre}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <img src="${src}" alt="${alt}" class="img-fluid mb-3">
                            <p>${descripcion}</p>
                            <p><strong>Precio:</strong> ${precio}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" id="comprar" class="btn btn-comprar" data-nombre="${nombre}" data-precio="${precio}">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('body').append(modalHtml);
        $('#imageModal').modal('show');

        $('#imageModal').on('hidden.bs.modal', function () {
            $(this).remove();
        });
    });
}

//**************Cargar Tartas******************/
// Cargar las tartas desde Ajax
$(document).ready(function() {
    cargarTartas().then(tartas => {
        tartas.forEach(tarta => {
            $('#galeria-fotos').append(`
                <div class="col-md-4 mb-4">
                    <div class="card shadow">
                        <img src="${tarta.src}" class="card-img-top img-thumbnail" alt="${tarta.alt}" style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;" data-nombre="${tarta.nombre}" data-descripcion="${tarta.descripcion}" data-precio="${tarta.precio}">
                        <div class="card-body">
                            <h5 class="card-title">${tarta.nombre}</h5>
                            <p class="card-text">${tarta.descripcion}</p>
                            <p class="card-text"><strong>Precio:</strong> ${tarta.precio}</p>
                        </div>
                    </div>
                </div>
            `);
        });
        colocarFooter();
    }).catch(error => {
        console.error('Error al cargar las tartas:', error);
    });
});


openModal();
// Añadir productos al carrito
$(document).on('click', '#comprar', function() {
    let nombre = $(this).data('nombre');
    let precio = $(this).data('precio');

    listaCarrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));

    let contador = parseInt(listaCarrito.length || 0); 
    $("#contador").text(contador);

    $('#imageModal').modal('hide');
});
