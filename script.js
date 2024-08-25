// Lista simple de productos
const productos = {
    "12345": { nombre: "Producto A", precio: 10.0 },
    "67890": { nombre: "Producto B", precio: 20.0 },
    "11223": { nombre: "Producto C", precio: 30.0 }
};

// Lista para guardar los productos agregados al ticket
let ticket = [];

// Función para agregar un producto al ticket
function agregarProducto() {
    const select = document.getElementById('producto-select');
    const codigo = select.value;
    const producto = productos[codigo];

    if (producto) {
        ticket.push(producto);
        select.value = ""; // Reiniciar selección
        generarTicket();
    } else {
        alert("Seleccione un producto válido");
    }
}

// Función para generar el ticket
function generarTicket() {
    let total = 0;
    let ticketHtml = '<h2>Ticket</h2><ul>';

    ticket.forEach(item => {
        ticketHtml += `<li>${item.nombre} - $${item.precio.toFixed(2)}</li>`;
        total += item.precio;
    });

    ticketHtml += `</ul><h3>Total: $${total.toFixed(2)}</h3>`;

    document.getElementById('ticket').innerHTML = ticketHtml;
}

// PWA: Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        }, (error) => {
            console.log('Service Worker no registrado:', error);
        });
    });
}
