//**************Cargar Noticias******************/
// Cargar las noticias desde el archivo JSON
export function cargarNoticias() {
    let noticias = [];
    $.ajax({
        url: './assets/archive/noticias.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            noticias = data;
            noticias.forEach(noticia => {

                let articulo = `<div class="col-3">
                    <div class="card h-100 shadow">
                        <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}" style="width: 100%; height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title" style="color: #880d22;">${noticia.titulo}</h5>
                            <p class="card-text">${noticia.descripcion}</p>
                            <p><strong>Fecha:</strong> ${noticia.fecha}</p>
                            <p><strong>Autor:</strong> ${noticia.autor}</p>
                            <a href="${noticia.enlace}" target="_blank" class="btn btn-cerezo mt-auto">Leer más</a>
                        </div>
                    </div>
                </div>`;
                $('#noticias-container').append(articulo);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error al cargar las noticias:', textStatus, errorThrown);
        }
    });
}
