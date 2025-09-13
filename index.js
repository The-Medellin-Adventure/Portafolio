
// Tour data (puedes editar precios, longDesc, extraImg, etc.)
const tours = [
  {
    id: 1,
    title: 'Medellín 360°',
    type: 'Experiencia virtual',
    short: 'Un tour inmersivo por Plaza Botero, Pueblito Paisa y otros íconos de Medellín.',
    img: 'img/360.png',
    extraImg: 'img/virtual.png',
    meta: 'Enlace virtual',
    precio: '$40.000 COP por enlace exclusivo válido por 1 hora',
    duracion: '1 hora',
    longDesc: 'Disfruta de un recorrido virtual acompañado por un guía profesional. Ideal para quienes desean conocer Medellín desde cualquier lugar del mundo.'
  },
  {
    id: 2,
    title: 'City Tour Medellín',
    type: 'compartido',
    short: 'Recorrido por los puntos más icónicos de Medellín: Plaza Botero y miradores.',
    img: 'https://source.unsplash.com/featured/?medellin,city',
    extraImg: 'https://source.unsplash.com/featured/?medellin,plazabotero',
    meta: 'Compartido y Privado',
    precioCompartido: '$90.000 COP',
    precioPrivado: '$350.000 COP',
    duracion: '4 horas aprox',
    longDesc: 'Este tour incluye transporte, guía local y paradas en los miradores principales. Perfecto para recorrer la ciudad con comodidad.'
  },
  {
    id: 3,
    title: 'Graffitour - Comuna 13',
    type: 'compartido',
    short: 'Tour cultural por la Comuna 13 con arte urbano y comunidad local.',
    img: 'https://source.unsplash.com/featured/?comuna13,graffiti',
    extraImg: 'https://source.unsplash.com/featured/?graffiti,streetart',
    meta: 'Compartido y Privado',
    precio: '$90.000 COP',
    duracion: '4 horas aprox',
    longDesc: 'Un recorrido por la historia y el arte urbano de la Comuna 13, con guías locales que cuentan la transformación del barrio.'
  },
  {
    id: 4,
    title: 'Guatapé',
    type: 'compartido',
    short: 'Visita a la Piedra del Peñol y el colorido pueblo de Guatapé.',
    img: 'https://source.unsplash.com/featured/?guatape,peñol',
    extraImg: 'https://source.unsplash.com/featured/?guatape,color',
    meta: 'Compartido y Privado',
    precio: '$90.000 COP',
    duracion: '10 horas',
    longDesc: 'Excursión de día completo con tiempo para subir la Piedra del Peñol y recorrer el pueblo colorido de Guatapé.'
  },
  // ... (restantes tours)
  {
    id: 5,
    title: 'Tour del Café',
    type: 'privado',
    short: 'Experiencia sensorial en fincas cafeteras cerca de Medellín.',
    img: 'https://source.unsplash.com/featured/?coffee,farm',
    meta: 'Privado',
    duracion: '1 día',
    longDesc: 'Visita a finca cafetera con explicación del proceso del café, degustación y paseo por los cultivos.'
  }
];

// Variables
const grid = document.getElementById('tours-grid');
const empty = document.getElementById('empty');
let currentTour = null;

// Render tarjetas
function render(list) {
  grid.innerHTML = '';
  if (!list.length) {
    empty.style.display = 'block';
    return;
  } else {
    empty.style.display = 'none';
  }

  list.forEach(t => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${t.img}" alt="${escapeHtml(t.title)}" />
      <div class="card-body">
        <div class="meta">
          <span>Duración: ${t.duracion || 'No especificada'}</span>
          <span class="tags">${t.meta || ''}</span>
        </div>
        <h4 class="title">${escapeHtml(t.title)}</h4>
        <p class="desc">${escapeHtml(t.short)}</p>
        <div class="cta">
          <button class="btn" data-id="${t.id}" onclick="openDetail(${t.id})">Ver más</button>
          <button class="btn cta" data-id="${t.id}" onclick="openBooking(${t.id})">Reservar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Abre modal con detalle
function openDetail(id) {
  const t = tours.find(x => x.id === id);
  if (!t) return;
  currentTour = t;

  // Imagen izquierda
  const modalImage = document.getElementById('modal-image');
  modalImage.innerHTML = `<img src="${t.extraImg || t.img}" alt="${escapeHtml(t.title)}" />`;

  // Info derecha
  document.getElementById('modal-title').textContent = t.title;
  document.getElementById('modal-meta').textContent = `${t.meta || ''} • Duración: ${t.duracion || 'No especificada'}`;

  // Precio (condicional)
  let precioHTML = '';
  if (t.precioCompartido && t.precioPrivado) {
    precioHTML = `
      <p><strong>Precio compartido:</strong> ${t.precioCompartido}</p>
      <p><strong>Precio privado:</strong> ${t.precioPrivado}</p>
    `;
  } else if (t.precio) {
    precioHTML = `<p><strong>Precio:</strong> ${t.precio}</p>`;
  } else {
    precioHTML = `<p><strong>Precio:</strong> Consultar</p>`;
  }

  document.getElementById('modal-desc').innerHTML = `<p>${t.longDesc || t.short}</p>${precioHTML}`;

  // Rellenar select de tarifa para el formulario
  const tarifa = document.getElementById('tarifa');
  tarifa.innerHTML = '';
  if (t.precioCompartido && t.precioPrivado) {
    tarifa.innerHTML = `
      <option value="Compartido|${t.precioCompartido}">Compartido — ${t.precioCompartido}</option>
      <option value="Privado|${t.precioPrivado}">Privado — ${t.precioPrivado}</option>
    `;
    tarifa.disabled = false;
  } else if (t.precio) {
    tarifa.innerHTML = `<option value="Unico|${t.precio}">Precio — ${t.precio}</option>`;
    tarifa.disabled = true;
  } else {
    tarifa.innerHTML = `<option value="Consultar|Sin precio">Consultar — Solicitar precio</option>`;
    tarifa.disabled = true;
  }

  // Mostrar modal
  document.getElementById('modal').classList.add('show');

  // colocar foco en nombre para mejor UX
  setTimeout(() => {
    const nombre = document.getElementById('nombre');
    if (nombre) nombre.focus();
  }, 150);
}
window.openDetail = openDetail; // global para onclick inline

// Abrir modal y llevar al formulario (desde botón "Reservar" en la tarjeta)
function openBooking(id) {
  openDetail(id);
  // luego hacer scroll al formulario dentro del modal
  setTimeout(() => {
    const form = document.getElementById('booking-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const nombre = document.getElementById('nombre');
    if (nombre) nombre.focus();
  }, 250);
}
window.openBooking = openBooking; // global para onclick inline

// Filtrado
function filter() {
  const q = document.getElementById('search').value.toLowerCase();
  const type = document.getElementById('type').value;

  const filtered = tours.filter(t => {
    const matchQuery = t.title.toLowerCase().includes(q) || (t.short && t.short.toLowerCase().includes(q));
    const matchType = type === 'all' ? true : (t.type && t.type.toLowerCase() === type.toLowerCase());
    return matchQuery && matchType;
  });

  render(filtered);
}

// Escapado básico para evitar inyección de HTML en textos
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Inicialización después de que DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Render inicial
  render(tours);

  // Cierra modal (botón X)
  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      document.getElementById('modal').classList.remove('show');
    });
  }

  // Botón cancelar dentro del formulario
  const closeBooking = document.getElementById('close-booking');
  if (closeBooking) {
    closeBooking.addEventListener('click', () => {
      document.getElementById('modal').classList.remove('show');
    });
  }

  // Botón limpiar controles
  const clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.getElementById('search').value = '';
      document.getElementById('type').value = 'all';
      filter();
    });
  }

  // Input search + type
  const searchInput = document.getElementById('search');
  if (searchInput) searchInput.addEventListener('input', filter);
  const typeSelect = document.getElementById('type');
  if (typeSelect) typeSelect.addEventListener('change', filter);

  // Brochure (simulación)
  const brochure = document.getElementById('brochure');
  if (brochure) {
    brochure.addEventListener('click', () => {
      alert('Se descargará un folleto con la información del tour (simulación).');
    });
  }

  // Envío del formulario -> abre WhatsApp
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!currentTour) {
        alert('Por favor, primero abre el detalle del tour y luego envía la reserva.');
        return;
      }

      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const fecha = document.getElementById('fecha').value;
      const personas = document.getElementById('personas').value;
      const comentarios = document.getElementById('comentarios').value.trim();
      const tarifaVal = document.getElementById('tarifa').value || '';

      // tarifaVal formato: "Tipo|Precio" (ej. "Compartido|$90.000 COP")
      const [tipoTarifa, precioSeleccionado] = tarifaVal.split('|');

      let mensaje = `Hola 👋, soy *${nombre}*.\n`;
      mensaje += `Quiero reservar: *${currentTour.title}*.\n`;
      if (tipoTarifa) mensaje += `Tarifa: ${tipoTarifa} — ${precioSeleccionado || ''}\n`;
      mensaje += `Fecha: ${fecha}\n`;
      mensaje += `Personas: ${personas}\n`;
      if (correo) mensaje += `Correo: ${correo}\n`;
      if (comentarios) mensaje += `Comentarios: ${comentarios}\n`;
      mensaje += `\nID Tour: ${currentTour.id}`;

      // Número de WhatsApp (formato internacional sin +). Cambia aquí si lo necesitas.
      const telefono = "573247615677";

      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

      // abrir WhatsApp en nueva ventana/pestaña
      window.open(url, '_blank');

      // opcional: cerrar modal
      document.getElementById('modal').classList.remove('show');
    });
  }
});
