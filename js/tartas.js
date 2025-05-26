//**************Cargar Tartas******************/
// Cargar las tartas desde el archivo JSON
export function cargarTartas() {
    return $.ajax({
        url: '../assets/archive/tartas.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            return data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error al cargar las fotos de tarta:', textStatus, errorThrown);
        }
    });
}
