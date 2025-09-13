// index.js - versión final con header oculto en modales y campos extra en reserva

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

let currentTour = null;

// Helpers para ocultar/mostrar el header
function hideHeader() {
  const header = document.querySelector('header');
  if (header) header.style.display = 'none';
}
function showHeader() {
  const header = document.querySelector('header');
  if (header) header.style.display = 'flex';
}

// Renderiza las tarjetas
function render(list) {
  const grid = document.getElementById('tours-grid');
  const empty = document.getElementById('empty');
  grid.innerHTML = '';

  if (!list.length) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.forEach(t => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${t.img}" alt="${escapeHtml(t.title)}" />
      <div class="card-body">
        <div class="meta">
          <span>Duración: ${t.duracion}</span>
          <span class="tags">${t.meta}</span>
        </div>
        <h4 class="title">${escapeHtml(t.title)}</h4>
        <p class="desc">${escapeHtml(t.short)}</p>
        <div class="cta">
          <button class="btn" onclick="openDetail(${t.id})">Ver más</button>
          <button class="btn cta" onclick="openReserva(${t.id})">Reservar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Abrir modal de detalle
function openDetail(id) {
  const t = tours.find(x => x.id === id);
  if (!t) return;
  currentTour = t;

  document.getElementById('modal-title').textContent = t.title; // 👈 título
  document.getElementById('modal-meta').textContent = `${t.meta} • ${t.duracion}`;
  document.getElementById('modal-image').innerHTML = `<img src="${t.extraImg || t.img}" alt="${t.title}" />`;

  let precios = '';
  if (t.precioCompartido && t.precioPrivado) {
    precios = `<p><strong>Precio compartido:</strong> ${t.precioCompartido}</p>
               <p><strong>Precio privado:</strong> ${t.precioPrivado}</p>`;
  } else if (t.precio) {
    precios = `<p><strong>Precio:</strong> ${t.precio}</p>`;
  }

  document.getElementById('modal-desc').innerHTML = `<p>${t.longDesc}</p>${precios}`;

  document.getElementById('modal-detalle').classList.add('show');
  hideHeader();
}
window.openDetail = openDetail;

// Abrir modal de reserva
function openReserva(id) {
  const t = tours.find(x => x.id === id);
  if (!t) return;
  currentTour = t;

  prepareReservaForm();
  document.getElementById('modal-reserva').classList.add('show');
  hideHeader();
}
window.openReserva = openReserva;

// Prepara las opciones de tarifas
function prepareReservaForm() {
  const tarifa = document.getElementById('tarifa');
  tarifa.innerHTML = '';

  if (currentTour.precioCompartido && currentTour.precioPrivado) {
    tarifa.innerHTML = `
      <option value="Compartido|${currentTour.precioCompartido}">Compartido — ${currentTour.precioCompartido}</option>
      <option value="Privado|${currentTour.precioPrivado}">Privado — ${currentTour.precioPrivado}</option>
    `;
  } else if (currentTour.precio) {
    tarifa.innerHTML = `<option value="Único|${currentTour.precio}">Precio — ${currentTour.precio}</option>`;
  } else {
    tarifa.innerHTML = `<option value="Consultar|">Consultar precio</option>`;
  }
}

// Escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  render(tours);

  // Cerrar detalle
  document.getElementById('modal-close-detalle').addEventListener('click', () => {
    document.getElementById('modal-detalle').classList.remove('show');
    showHeader();
  });

  // Reservar desde detalle
  document.getElementById('btn-reservar').addEventListener('click', () => {
    document.getElementById('modal-detalle').classList.remove('show');
    prepareReservaForm();
    document.getElementById('modal-reserva').classList.add('show');
    hideHeader();
  });

  // Cerrar reserva
  document.getElementById('modal-close-reserva').addEventListener('click', () => {
    document.getElementById('modal-reserva').classList.remove('show');
    if (currentTour) {
      openDetail(currentTour.id);
    } else {
      showHeader();
    }
  });

  // Envío de formulario a WhatsApp
  document.getElementById('booking-form').addEventListener('submit', e => {
    e.preventDefault();

    if (!currentTour) {
      alert('Primero selecciona un tour.');
      return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefonoCliente = document.getElementById('telefono').value.trim();
    const idioma = document.getElementById('idioma').value;
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;
    const comentarios = document.getElementById('comentarios').value.trim();
    const [tipoTarifa, precioSeleccionado] = (document.getElementById('tarifa').value || '').split('|');

    let mensaje = `Hola 👋, soy *${nombre}*.\n`;
    mensaje += `Quiero reservar el tour: *${currentTour.title}*.\n`;
    if (tipoTarifa) mensaje += `Tarifa: ${tipoTarifa} ${precioSeleccionado || ''}\n`;
    mensaje += `Fecha: ${fecha}\n`;
    mensaje += `Personas: ${personas}\n`;
    mensaje += `Correo: ${correo}\n`;

    // Nuevos campos
    if (telefonoCliente) mensaje += `Teléfono: ${telefonoCliente}\n`;
    if (idioma) mensaje += `Idioma preferido: ${idioma}\n`;

    if (comentarios) mensaje += `Comentarios: ${comentarios}\n`;

    const telefono = "573247615677"; // tu número de WhatsApp
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    document.getElementById('modal-reserva').classList.remove('show');
    showHeader();
  });

  // Filtros
  document.getElementById('search').addEventListener('input', filter);
  document.getElementById('type').addEventListener('change', filter);
  document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('type').value = 'all';
    filter();
  });
});

// Filtrado de tours
function filter() {
  const q = document.getElementById('search').value.toLowerCase();
  const type = document.getElementById('type').value;

  const filtered = tours.filter(t => {
    const matchQuery = t.title.toLowerCase().includes(q) || t.short.toLowerCase().includes(q);
    const matchType = type === 'all' ? true : (t.type && t.type.toLowerCase() === type.toLowerCase());
    return matchQuery && matchType;
  });

  render(filtered);
}

