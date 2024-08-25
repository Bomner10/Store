// Lista de productos con sus precios
const productos = {
    "1": { nombre: "Sabritas", precio: 15.0 },
    "2": { nombre: "Mazapan chocolate", precio: 10.0 },
    "3": { nombre: "Mazapan chico", precio: 5.0 },
    "4": { nombre: "Mazapan original", precio: 8.0 },
    "5": { nombre: "Borrachitos", precio: 12.0 },
    "6": { nombre: "Bombones", precio: 10.0 },
    "7": { nombre: "Chicles", precio: 3.0 },
    "8": { nombre: "Tamarroca", precio: 7.0 },
    "9": { nombre: "Gomitas", precio: 10.0 },
    "10": { nombre: "Pepitas", precio: 12.0 },
    "11": { nombre: "Cacahuates", precio: 15.0 },
    "12": { nombre: "Obleas", precio: 10.0 },
    "13": { nombre: "Bon o Bon", precio: 5.0 }
};

// Lista para guardar los productos agregados al ticket
let ticket = [];

// Función para agregar un producto al ticket
function agregarProducto() {
    const select = document.getElementById('producto-select');
    const codigo = select.value;

    if (codigo) {
        const producto = productos[codigo];
        ticket.push(producto);
        generarTicket();
    } else {
        alert("Seleccione un producto válido");
    }
}

// Función para generar el ticket
function generarTicket() {
    let total = 0;
    let ticketHtml = '<h2>Ticket</h2><ul>';

    ticket.forEach((item, index) => {
        ticketHtml += `<li>${index + 1}. ${item.nombre} - $${item.precio.toFixed(2)}</li>`;
        total += item.precio;
    });

    ticketHtml += `</ul><h3>Total: $${total.toFixed(2)}</h3>`;

    document.getElementById('ticket').innerHTML = ticketHtml;
}

// Vincula el botón de agregar producto al evento de clic
document.getElementById('agregar-producto-btn').addEventListener('click', agregarProducto);
