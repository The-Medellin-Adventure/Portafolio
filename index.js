// index.js - Renderizado de cards y modales con datos completos

const tours = [
  {
    id: 1,
    title: 'Medellín 360°',
    type: 'Virtual',
    short: 'Un tour inmersivo por Plaza Botero, Pueblito Paisa y otros íconos de Medellín.',
    img: 'img/360.png',
    extraImg: 'img/virtual.png',
    meta: 'Virtual',
    precio: '$40.000 COP',
    duracion: '1 hora',
    longDesc: 'Descubre Medellín desde cualquier lugar del mundo con este recorrido virtual inmersivo en 360°, activo por 1 hora y accesible desde un solo dispositivo. Explora los principales atractivos de la ciudad a través de hotspots informativos e imágenes exclusivas, guiado por una guia virtual que ofrece contexto histórico y cultural en cada parada. Una experiencia personalizada, rica en contenido y sin necesidad de desplazarte.'
  },
  {
    id: 2,
    title: 'City Tour Medellín',
    type: 'Compartido',
    short: 'Recorrido por los puntos más icónicos de Medellín: Plaza Botero y muchosm ás.',
    img: 'img/medellin2.jpg',
    extraImg: 'https://source.unsplash.com/featured/?plazabotero,medellin',
    meta: 'Compartido / Privado',
    precioCompartido: '$90.000 COP',
    precioPrivado: '$350.000 COP',
    duracion: '4 horas',
    longDesc: 'Descubre lo mejor de Medellín en un city tour guiado que te lleva por sus lugares más representativos, combinando cultura, historia y movilidad innovadora. Visita sitios icónicos como el Pueblito Paisa y la Plaza Botero, y vive la experiencia de recorrer la ciudad a bordo de su moderno sistema de transporte: el Metro, el Tranvía y el Metrocable. Acompañado por un guía experto, conocerás de cerca la transformación urbana de Medellín y su compromiso con la inclusión y el desarrollo sostenible. Ideal para quienes desean explorar la ciudad de forma auténtica y enriquecedora.'
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
      <img src="${tour.img}" alt="${tour.title}">
      <div class="card-body">
        <div class="meta">
          <span>${tour.meta}</span>
          <span class="tags">${tour.meta}</span>
        </div>
        <h3 class="title">${tour.title}</h3>
        <p class="desc">${tour.short}</p>
        <p style="font-size:13px;color:#555;margin:4px 0;">⏱️ ${tour.duracion}</p>
        <div class="cta">
          <button class="btn ver-mas" data-id="${tour.id}">Ver más</button>
          <button class="btn cta reservar" data-id="${tour.id}">Reservar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Handlers
  document.querySelectorAll(".ver-mas").forEach(btn => {
    btn.addEventListener("click", e => openDetalle(e.target.dataset.id));
  });
  document.querySelectorAll(".reservar").forEach(btn => {
    btn.addEventListener("click", e => openReservaDirecto(e.target.dataset.id));
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

  document.getElementById("modal-image").innerHTML = `<img src="${tour.extraImg}" alt="${tour.title}">`;
  document.getElementById("modal-title").innerText = tour.title;
  document.getElementById("modal-meta").innerText = `${tour.meta} · ⏱️ ${tour.duracion}`;

  let precios = "";
  if (tour.precioCompartido && tour.precioPrivado) {
    precios = `<strong>Precio compartido:</strong> ${tour.precioCompartido}<br>
               <strong>Precio privado:</strong> ${tour.precioPrivado}`;
  } else {
    precios = `<strong>Precio:</strong> ${tour.precio || ""}`;
  }

  document.getElementById("modal-desc").innerHTML = `
    <p>${tour.longDesc}</p>
    <p>${precios}</p>
  `;

  btnReservar.dataset.id = tour.id;
  modalDetalle.classList.add("show");
}

// Abrir reserva directa desde la card
function openReservaDirecto(id) {
  const tour = tours.find(t => t.id == id);
  if (!tour) return;

  document.getElementById("tour").value = tour.title;

  const tarifaSelect = document.getElementById("tarifa");
  tarifaSelect.innerHTML = "";
  if (tour.precioCompartido && tour.precioPrivado) {
    tarifaSelect.innerHTML = `
      <option value="Compartido">Compartido (${tour.precioCompartido})</option>
      <option value="Privado">Privado (${tour.precioPrivado})</option>
    `;
  } else {
    tarifaSelect.innerHTML = `<option value="Único">${tour.precio || "Consultar"}</option>`;
  }

  modalReserva.classList.add("show");
}

// Cerrar detalle
closeDetalle.addEventListener("click", () => modalDetalle.classList.remove("show"));

// Abrir reserva desde detalle
btnReservar.addEventListener("click", () => {
  const id = btnReservar.dataset.id;
  openReservaDirecto(id);
  modalDetalle.classList.remove("show");
});

// Cerrar reserva
closeReserva.addEventListener("click", () => {
  modalReserva.classList.remove("show");
  modalDetalle.classList.add("show");
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
  window.open("docs/brochure.pdf", "_blank");
});

// ====================
// Filtros de búsqueda
// ====================
const searchInput = document.getElementById("search");
const typeSelect = document.getElementById("meta");
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
