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
    extraImg: 'img/2.png',
    meta: 'Compartido / Privado',
    precioCompartido: '$90.000 COP',
    precioPrivado: '$350.000 COP',
    duracion: '4 horas aprox.',
    longDesc: 'Descubre lo mejor de Medellín en un city tour guiado que te lleva por sus lugares más representativos, combinando cultura, historia y movilidad innovadora. Visita sitios icónicos como el Pueblito Paisa y la Plaza Botero, y vive la experiencia de recorrer la ciudad a bordo de su moderno sistema de transporte: el Metro, el Tranvía y el Metrocable. Acompañado por un guía experto, conocerás de cerca la transformación urbana de Medellín y su compromiso con la inclusión y el desarrollo sostenible.'
  },
  {
    id: 3,
    title: 'Graffitour - Comuna 13',
    type: 'Compartido / Privado',
    short: 'Tour cultural por la Comuna 13 con arte urbano y comunidad local.',
    img: 'img/comuna.jpeg',
    extraImg: 'img/1.png',
    meta: 'Compartido / Privado',
    precioCompartido: '$90.000 COP',
    precioPrivado: '$350.000 COP',
    duracion: '4 horas aprox.',
    longDesc: 'La Comuna 13 es un vibrante barrio de Medellín reconocido por su impresionante arte callejero, lleno de grafitis coloridos, murales con mensajes de resistencia y cultura, música en vivo, breakdance, trovas y una energía única. Sus famosas escaleras eléctricas al aire libre conectan a los visitantes con miradores espectaculares y una historia de transformación social. Es un recorrido lleno de vida, arte y esperanza..'
  },
  {
    id: 4,
    title: 'Guatapé',
    type: 'Compartido / Privado',
    short: 'Conoce un colorido pueblo rodeado de naturaleza, famoso por sus zócalos y la imponente Piedra del Peñol.',
    img: 'img/guatape.png',
    extraImg: 'img/3.png',
    meta: 'Compartido / Privado',
    precioCompartido: '$180.000 COP',
    precioPrivado: '$635.000 COP',
    duracion: '10 horas aprox',
    longDesc: 'Conoce un pintoresco pueblo famoso por sus coloridos zócalos y la imponente Piedra del Peñol. Además de disfrutar la vista panorámica desde lo alto de la roca, los visitantes pueden recorrer en barco la represa, navegando entre islas y paisajes naturales únicos, mientras conocen la historia del lugar y disfrutan de una experiencia tranquila y llena de encanto.'
  },
  {
    id: 5,
    title: 'Tour del Café',
    type: 'Compartido / Privado',
    short: 'Vive la experiencia del café desde la semilla hasta la taza, en un tour inmersivo por fincas cafeteras rodeadas de naturaleza.',
    img: 'img/cafe.png',
    extraImg: 'img/4.png',
    meta: 'Compartido / Privado',
    precioCompartido: '$250.000 COP',
    precioPrivado: '$500.000 COP',
    duracion: '6 horas aprox',
    longDesc: 'Conoce un pintoresco pueblo famoso por sus coloridos zócalos y la imponente Piedra del Peñol. Además de disfrutar la vista panorámica desde lo alto de la roca, los visitantes pueden recorrer en barco la represa, navegando entre islas y paisajes naturales únicos, mientras conocen la historia del lugar y disfrutan de una experiencia tranquila y llena de encanto.'
  },
  {
    id: 6,
    title: 'Tour Casa de las Flores',
    type: 'Privado',
    short: 'Descubre la magia de la cultura silletera, donde aprenderás sobre la tradición, el arte floral y la historia detrás de las silletas.',
    img: 'img/flores.png',
    extraImg: 'img/5.png',
    meta: 'Privado',
    precio: '$400.000 COP',
    duracion: '5 horas aprox.',
    longDesc: 'El Tour Casa de las Flores te sumerge en la tradición silletera, una de las expresiones culturales más emblemáticas de Medellín. En esta experiencia, visitarás una finca típica donde conocerás de cerca el arte de armar silletas, escucharás historias de los silleteros y descubrirás el profundo significado que tienen las flores en la identidad antioqueña. Un recorrido lleno de color, tradición y orgullo campesino.'
  },
  {
    id: 7,
    title: 'Santa Fé de Antioquia',
    type: 'Privado',
    short: 'Pueblo colonial con arquitectura y puentes históricos.',
    img: 'img/santafe.png',
    extraImg: 'img/6.png',
    meta: 'Privado',
    precio: '$550.000 COP',
    duracion: '6 horas aprox.',
    longDesc: 'El tour por Santa Fe de Antioquia te transporta al pasado con sus calles empedradas, casas coloniales y encantadoras plazas. A solo una hora y media de Medellín, este recorrido incluye la visita al icónico Puente de Occidente, iglesias históricas y museos locales, todo acompañado por una guía que narra la historia de uno de los pueblos más antiguos y emblemáticos de Colombia. Ideal para quienes buscan cultura, historia y un entorno pintoresco.'
  },
  {
    id: 8,
    title: 'Vuleta a Oriente',
    type: 'Privado',
    short: 'Un recorrido que combina naturaleza, historia, pueblos con encanto y lo mejor de la gastronomía local.',
    img: 'img/oriente.png',
    extraImg: 'img/7.png',
    meta: 'Privado',
    precio: '$550.000 COP',
    duracion: '6 horas aprox.',
    longDesc: 'A lo largo del recorrido, viviremos una experiencia completa que nos permitirá disfrutar de paisajes naturales espectaculares, descubrir pueblos llenos de encanto, conocer su historia fascinante y deleitarnos con la auténtica gastronomía de la región. Ideal para conectar con lo más auténtico de la cultura local.'
  },
  {
    id: 9,
    title: 'Parapente',
    type: 'Privado',
    short: 'Vuelo en tándem sobre valles y paisajes; aventura y vistas únicas.',
    img: 'img/parapente.png',
    extraImg: 'img/9.png',
    meta: 'Privado',
    precio: '$550.000 COP',
    duracion: '6 horas aprox.',
    longDesc: 'Nuestra experiencia de paraglading te brindará la oportunidad de despegar desde colinas escarpadas y sobrevolar valles exuberantes, ríos serpenteantes y vistas panorámicas de belleza inigualable.'
  },
  {
    id: 10,
    title: "Atv's - Cuatrimotos",
    type: 'Privado',
    short: 'Aventura off-road con cuatrimotos en rutas naturales.',
    img: 'img/atv.png',
    extraImg: 'img/10.png',
    meta: 'Privado',
    precio: '$550.000 COP',
    duracion: '4 horas aprox.',
    longDesc:'Explora terrenos diversos mientras te sumerges en la belleza de la naturaleza. Ya sea que estés buscando adrenalina o simplemente desees relajarte y disfrutar del paisaje, los tours en cuatrimotos ofrecen algo para todos. '  
  },
  {
    id: 11,
    title: 'Cabalgata',
    type: 'Privado',
    short: 'Si eres amante de la naturaleza, la emoción de la exploración y la conexión con los caballos, este tour es perfecto para ti.',
    img: 'img/caballo.jpeg',
    extraImg: 'img/8.png',
    meta: 'Privado',
    precio: '$550.000 COP',
    duracion: '6 horas aprox.',
    longDesc: 'La cabalgata ofrece una experiencia para explorar la naturaleza desde una perspectiva diferente. Montando a caballo, recorrerás caminos entre bosques y ríos cristalinos, con vistas panorámicas que te dejarán sin aliento. Es una actividad perfecta para disfrutar del aire libre y descubrir la belleza del paisaje de forma relajada y segura.'  
  },
  {
    id: 12,
     title: 'Rio Claro',
    type: 'Privado',
    short: 'Vive la adrenalina del rafting y body rafting en Río Claro, rodeado de selva tropical y aguas cristalinas.',
    img: 'img/rio.jpeg',
    extraImg: 'img/11.png',
    meta: 'Privado',
    precio: '$980.000 COP',
    duracion: '14 horas aprox.',
    longDesc: 'Río Claro es el destino perfecto para los amantes de la aventura. Sus aguas transparentes y cañones de mármol ofrecen el escenario ideal para practicar rafting y body rafting, una experiencia cargada de emoción y belleza natural. Guiado por expertos locales, te deslizarás por rápidos suaves y tramos tranquilos que permiten disfrutar del paisaje selvático, las formaciones rocosas únicas y la energía del río'
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
Mi nombre es 👤 Nombre: ${nombre}, quiero reservar:
🎯 Tour: ${tour}
🌐 Idioma: ${idioma}
💲 Tarifa: ${tarifa}
📅 Fecha: ${fecha}
👥 Personas: ${personas}
📞 Teléfono: ${telefono}
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
// Filtros de búsqueda (MEJORADOS)
// ====================
const searchInput = document.getElementById("search");
const typeSelect = document.getElementById("type");
const clearBtn = document.getElementById("clear");

/**
 * Comprueba si el valor `type` (p. ej. 'privado') está presente como palabra
 * dentro de `meta` (p. ej. 'Compartido / Privado' o 'Privado').
 */
function metaIncludesType(meta, type) {
  if (!type || type === 'all') return true;
  if (!meta) return false;
  // Escape del texto para usar en regex
  const escaped = type.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const re = new RegExp(`\\b${escaped}\\b`, 'i'); // busca como palabra completa, case-insensitive
  return re.test(meta);
}

function filterTours() {
  const search = (searchInput.value || '').toLowerCase().trim();
  const type = (typeSelect.value || 'all').toLowerCase().trim();

  const filtered = tours.filter(t => {
    const title = (t.title || '').toLowerCase();
    const short = (t.short || '').toLowerCase();
    const longDesc = (t.longDesc || '').toLowerCase();
    const meta = (t.meta || '').toLowerCase();

    const matchesSearch =
      (!search) ||
      title.includes(search) ||
      short.includes(search) ||
      longDesc.includes(search) ||
      meta.includes(search);

    const matchesType = metaIncludesType(meta, type);

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
