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
    const codigo = document.getElementById('codigo').value.trim();
    const producto = productos[codigo];

    if (producto) {
        ticket.push(producto);
        document.getElementById('codigo').value = "";
        generarTicket();
    } else {
        alert("Producto no encontrado");
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

// Funcionalidad de escaneo de código de barras con QuaggaJS
document.getElementById('start-button').addEventListener('click', function() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#video')
        },
        decoder: {
            readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            alert("Error al iniciar el escáner");
            return;
        }
        Quagga.start();
        document.getElementById('start-button').disabled = true;
        document.getElementById('stop-button').disabled = false;
    });

    Quagga.onDetected(onDetected);
});

document.getElementById('stop-button').addEventListener('click', function() {
    Quagga.stop();
    document.getElementById('start-button').disabled = false;
    document.getElementById('stop-button').disabled = true;
});

// Función llamada cuando se detecta un código de barras
function onDetected(result) {
    const codigo = result.codeResult.code;
    document.getElementById('codigo').value = codigo;
    agregarProducto();
    Quagga.offDetected(onDetected);
    Quagga.stop();
    document.getElementById('start-button').disabled = false;
    document.getElementById('stop-button').disabled = true;
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
