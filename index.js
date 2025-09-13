// index.js - Renderizado de cards y modales con datos completos

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
    longDesc: 'Explora Medellín desde cualquier lugar del mundo con este tour virtual inmersivo en 360°, ideal para quienes desean conocer la ciudad sin necesidad de desplazarse. A través de un enlace exclusivo, los usuarios accederán a un recorrido activo durante 1 hora, diseñado para visualizarse en un solo dispositivo, brindando una experiencia personalizada y de alta calidad. <br>Durante el tour, los visitantes podrán interactuar con hotspots informativos y hotspots visuales, donde encontrarán datos relevantes, imágenes exclusivas y contenido enriquecido sobre los principales atractivos de Medellín. Además, una guía virtual acompañará todo el recorrido, proporcionando contexto histórico, cultural y curiosidades en cada parada.<br>🏙️ Lugares incluidos en el tour:<br>Plaza Botero: Conoce sus 23 esculturas monumentales y descubre el legado artístico del maestro Fernando Botero.<br>Centro de Medellín: Un viaje por la historia de transformación e innovación de la ciudad.<br>Parque de los Pies Descalzos: Naturaleza, relajación y conexión sensorial en medio del entorno urbano.<br>Pueblito Paisa: Una encantadora réplica de un pueblo tradicional antioqueño, lleno de cultura y tradición.<br>Y muchos otros puntos icónicos, representativos de la cultura, arquitectura y espíritu paisa.<br><br>Acceso: Válido para un (1) dispositivo por recorrido.'
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
      <img src="${tour.img}" alt="${tour.title}">
      <div class="card-body">
        <div class="meta">
          <span>${tour.meta}</span>
          <span class="tags">${tour.type}</span>
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
