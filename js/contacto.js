/*.............Mapa.................*/

// Inicializar el mapa
var map = L.map('map', { zoomControl: false }).setView([40.324757, -3.856809], 11); // Coordenadas aproximadas de la empresa

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.control.zoom({
    position: 'topright'
}).addTo(map);

var empresaLatLng = [40.324757, -3.856809]; // Coordenadas de la empresa
var empresaIcon = L.icon({
    iconUrl: '../assets/images/logoMapa.jpg', // Ruta del logo de la empresa
    iconSize: [50, 50], // Tamaño del icono
    iconAnchor: [25, 50], // Punto del icono que se ancla al mapa
    popupAnchor: [0, -50] // Punto desde el cual se abre el popup
});
L.marker(empresaLatLng, { icon: empresaIcon }).addTo(map)
    .bindPopup('Pasteleria Osmel\'s Cakes')
    .openPopup();

// Obtener la ubicación del cliente
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var clienteLatLng = [position.coords.latitude, position.coords.longitude];

        // Agregar un marcador para la ubicación del cliente
        L.marker(clienteLatLng).addTo(map)
            .bindPopup('Tu ubicación')
            .openPopup();

        // Dibujar la ruta entre el cliente y la empresa sin el marcador de llegada
        L.Routing.control({
            waypoints: [
                L.latLng(clienteLatLng),
                L.latLng(empresaLatLng)
            ],
            routeWhileDragging: true,
            language: 'es',
            createMarker: function() { return null; },
            lineOptions: {
                styles: [{ color: 'blue', opacity: 0.7, weight: 4 }]
            }
        }).addTo(map);

        map.fitBounds([
            clienteLatLng,
            empresaLatLng
        ], {
            paddingBottomRight: [300, 0] // Ajustar para dejar espacio en la derecha
        });
    }, function() {
        alert('No se pudo obtener tu ubicación.');
    });
} else {
    alert('La geolocalización no está soportada por tu navegador.');
}
