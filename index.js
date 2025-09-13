// index.js - corregido: prepara tarifa si falta, rellena tour, y añade handler para "Descargar info"

const tours = [
  {
    id: 1,
    title: 'Medellín 360°',
    type: 'virtual',
    short: 'Un tour inmersivo por Plaza Botero, Pueblito Paisa y otros íconos de Medellín.',
    img: 'img/360.png',
    extraImg: 'img/virtual.png',
    meta: 'Virtual',
    precio: '$40.000 COP',
    duracion: '1 hora',
    longDesc: 'Disfruta de un recorrido virtual acompañado por un guía profesional. Ideal para quienes desean conocer Medellín desde cualquier lugar del mundo.'
  },
  {
    id: 2,
    title: 'City Tour Medellín',
    type: 'compartido',
    short: 'Recorrido por los puntos más icónicos de Medellín: Plaza Botero y miradores.',
    img: 'https://source.unsplash.com/featured/?medellin,city',
    extraImg: 'https://source.unsplash.com/featured/?plazabotero,medellin',
    meta: 'Compartido / Privado',
    precioCompartido: '$90.000 COP',
    precioPrivado: '$350.000 COP',
    duracion: '4 horas',
    longDesc: 'Incluye transporte, guía local y paradas en los miradores principales.'
  },
  {
    id: 3,
    title: 'Graffitour - Comuna 13',
    type: 'compartido',
    short: 'Tour cultural por la Comuna 13 con arte urbano y comunidad local.',
    img: 'https://source.unsplash.com/featured/?comuna13,graffiti',
    extraImg: 'https://source.unsplash.com/featured/?graffiti,streetart',
    meta: 'Compartido',
    precio: '$90.000 COP',
    duracion: '4 horas',
    longDesc: 'Recorrido por la historia y el arte urbano de la Comuna 13, con guías locales.'
  }
];

// ====================
// Renderizado de cards
// ====================
const grid = document.getElementById("tours-grid");
const empty = document.getElementById("empty");

function renderTours(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  list.forEach(tour => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${tour.image}" alt="${tour.title}">
      <div class="card-body">
        <div class="meta">
          <span>${tour.meta}</span>
          <span class="tags">${tour.type}</span>
        </div>
        <h3 class="title">${tour.title}</h3>
        <p class="desc">${tour.desc}</p>
        <div class="cta">
          <button class="btn ver-mas" data-id="${tour.id}">Ver más</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll(".ver-mas").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      openDetalle(id);
    });
  });
}

renderTours(tours);

// ====================
// Modales
// ====================
const modalDetalle = document.getElementById("modal-detalle");
const modalReserva = document.getElementById("modal-reserva");

const closeDetalle = document.getElementById("modal-close-detalle");
const closeReserva = document.getElementById("modal-close-reserva");
const btnReservar = document.getElementById("btn-reservar");
const brochureBtn = document.getElementById("brochure");

// Abrir detalle
function openDetalle(id) {
  const tour = tours.find(t => t.id == id);
  if (!tour) return;

  document.getElementById("modal-image").querySelector("img").src = tour.image;
  document.getElementById("modal-title").innerText = tour.title;
  document.getElementById("modal-meta").innerText = tour.meta;

  let precios = "";
  if (tour.priceCompartido && tour.pricePrivado) {
    precios = `<strong>Precio compartido:</strong> ${tour.priceCompartido}<br>
               <strong>Precio privado:</strong> ${tour.pricePrivado}`;
  } else {
    precios = `<strong>Precio:</strong> ${tour.price || ""}`;
  }

  document.getElementById("modal-desc").innerHTML = `
    <p>${tour.desc}</p>
    <p>${precios}</p>
  `;

  // Guardar tour en dataset para reserva
  btnReservar.dataset.id = tour.id;

  modalDetalle.classList.add("show");
}

// Cerrar detalle
closeDetalle.addEventListener("click", () => {
  modalDetalle.classList.remove("show");
});

// Abrir reserva desde detalle
btnReservar.addEventListener("click", () => {
  const id = btnReservar.dataset.id;
  const tour = tours.find(t => t.id == id);
  if (!tour) return;

  // Llenar nombre del tour en el formulario
  document.getElementById("tour").value = tour.title;

  // Llenar tarifas según disponibilidad
  const tarifaSelect = document.getElementById("tarifa");
  tarifaSelect.innerHTML = "";
  if (tour.priceCompartido && tour.pricePrivado) {
    tarifaSelect.innerHTML = `
      <option value="Compartido">Compartido (${tour.priceCompartido})</option>
      <option value="Privado">Privado (${tour.pricePrivado})</option>
    `;
  } else {
    tarifaSelect.innerHTML = `<option value="Único">${tour.price || "Consultar"}</option>`;
  }

  modalDetalle.classList.remove("show");
  modalReserva.classList.add("show");
});

// Cerrar reserva
closeReserva.addEventListener("click", () => {
  modalReserva.classList.remove("show");
  modalDetalle.classList.add("show"); // volver al detalle
});

// ====================
// Formulario -> WhatsApp
// ====================
const bookingForm = document.getElementById("booking-form");
bookingForm.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const idioma = document.getElementById("idioma").value;
  const tour = document.getElementById("tour").value;
  const fecha = document.getElementById("fecha").value;
  const personas = document.getElementById("personas").value;
  const comentarios = document.getElementById("comentarios").value;
  const tarifa = document.getElementById("tarifa").value;

  const mensaje = `
Hola, quiero reservar un tour:

👤 Nombre: ${nombre}
📧 Correo: ${correo}
📞 Teléfono: ${telefono}
🌐 Idioma: ${idioma}
🎯 Tour: ${tour}
💲 Tarifa: ${tarifa}
📅 Fecha: ${fecha}
👥 Personas: ${personas}
📝 Comentarios: ${comentarios}
  `;

  const url = `https://wa.me/573247615677?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});

// ====================
// Botón descargar info
// ====================
brochureBtn.addEventListener("click", () => {
  // 👉 Aquí puedes cambiar por un archivo PDF real o link a Google Drive
  window.open("docs/brochure.pdf", "_blank");
});

// ====================
// Filtros de búsqueda
// ====================
const searchInput = document.getElementById("search");
const typeSelect = document.getElementById("type");
const clearBtn = document.getElementById("clear");

function filterTours() {
  const search = searchInput.value.toLowerCase();
  const type = typeSelect.value;

  const filtered = tours.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search);
    const matchesType = type === "all" || t.type === type;
    return matchesSearch && matchesType;
  });

  renderTours(filtered);
}

searchInput.addEventListener("input", filterTours);
typeSelect.addEventListener("change", filterTours);
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  typeSelect.value = "all";
  renderTours(tours);
});
