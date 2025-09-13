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

let currentTour = null;

// mapa de brochures (aquí defines los links o PDFs por id de tour)
const infoLinks = {
  1: 'docs/medellin360.pdf',
  2: 'docs/citytour.pdf',
  3: 'docs/graffitour.pdf'
};

// Helpers para ocultar/mostrar header
function hideHeader() {
  const header = document.querySelector('header');
  if (header) header.style.display = 'none';
}
function showHeader() {
  const header = document.querySelector('header');
  if (header) header.style.display = 'flex';
}

// Render tarjetas
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

// abrir detalle
function openDetail(id) {
  const t = tours.find(x => x.id === id);
  if (!t) return;
  currentTour = t;

  const titleEl = document.getElementById('modal-title');
  if (titleEl) titleEl.textContent = t.title;

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

// abrir reserva (desde tarjeta o desde detalle)
function openReserva(id) {
  const t = tours.find(x => x.id === id);
  if (!t) return;
  currentTour = t;

  prepareReservaForm();
  // prefill campo tour si existe
  const tourInput = document.getElementById('tour');
  if (tourInput) tourInput.value = currentTour.title;

  document.getElementById('modal-reserva').classList.add('show');
  hideHeader();
}
window.openReserva = openReserva;

// prepara select tarifa (si el select no existe lo crea)
function prepareReservaForm() {
  let tarifa = document.getElementById('tarifa');

  if (!tarifa) {
    // crear label + select antes del input telefono
    const phone = document.getElementById('telefono');
    if (phone && phone.parentNode) {
      const label = document.createElement('label');
      label.htmlFor = 'tarifa';
      label.textContent = '💲 Tarifa';
      const select = document.createElement('select');
      select.id = 'tarifa';
      phone.parentNode.insertBefore(label, phone);
      phone.parentNode.insertBefore(select, phone);
      tarifa = select;
    } else {
      // no hay telefono: intentar encontrar el form y añadir al final
      const form = document.getElementById('booking-form');
      if (form) {
        const label = document.createElement('label');
        label.htmlFor = 'tarifa';
        label.textContent = '💲 Tarifa';
        const select = document.createElement('select');
        select.id = 'tarifa';
        form.insertBefore(label, form.firstChild);
        form.insertBefore(select, label.nextSibling);
        tarifa = select;
      }
    }
  }

  if (!tarifa) return; // si aún no existe, salimos

  tarifa.innerHTML = ''; // limpiar

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

  // rellenar el campo tour si existe
  const tourInput = document.getElementById('tour');
  if (tourInput) tourInput.value = currentTour.title || '';
}

// escape básico
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// init
document.addEventListener('DOMContentLoaded', () => {
  render(tours);

  // Cerrar detalle
  const closeDetalle = document.getElementById('modal-close-detalle');
  if (closeDetalle) {
    closeDetalle.addEventListener('click', () => {
      document.getElementById('modal-detalle').classList.remove('show');
      showHeader();
    });
  }

  // Reservar dentro del detalle (botón)
  const btnReservar = document.getElementById('btn-reservar');
  if (btnReservar) {
    btnReservar.addEventListener('click', () => {
      document.getElementById('modal-detalle').classList.remove('show');
      prepareReservaForm();
      const tourInput = document.getElementById('tour');
      if (tourInput && currentTour) tourInput.value = currentTour.title;
      document.getElementById('modal-reserva').classList.add('show');
      hideHeader();
    });
  }

  // Cerrar reserva (volver a detalle si corresponde)
  const closeReserva = document.getElementById('modal-close-reserva');
  if (closeReserva) {
    closeReserva.addEventListener('click', () => {
      document.getElementById('modal-reserva').classList.remove('show');
      if (currentTour) {
        openDetail(currentTour.id);
      } else {
        showHeader();
      }
    });
  }

  // handler botón brochure (descargar info)
  const brochureBtn = document.getElementById('brochure');
  if (brochureBtn) {
    brochureBtn.addEventListener('click', () => {
      if (!currentTour) {
        alert('Selecciona un tour primero.');
        return;
      }
      const link = infoLinks[currentTour.id];
      if (link) {
        window.open(link, '_blank');
      } else {
        alert('No hay brochure disponible para este tour.');
      }
    });
  }

  // envío form -> WhatsApp
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();

      // preferimos currentTour, pero si no existe usamos el campo "tour"
      const tourFromField = document.getElementById('tour') ? document.getElementById('tour').value.trim() : '';
      if (!currentTour && !tourFromField) {
        alert('Selecciona un tour o escribe el nombre del tour.');
        return;
      }

      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const telefonoCliente = document.getElementById('telefono').value.trim();
      const idioma = document.getElementById('idioma').value;
      const fecha = document.getElementById('fecha').value;
      const personas = document.getElementById('personas').value;
      const comentarios = document.getElementById('comentarios').value.trim();
      const tarifaVal = document.getElementById('tarifa') ? document.getElementById('tarifa').value : '';
      const [tipoTarifa, precioSeleccionado] = (tarifaVal || '').split('|');

      const tourName = currentTour ? currentTour.title : tourFromField;

      let mensaje = `Hola 👋, soy *${nombre}*.\n`;
      mensaje += `Quiero reservar el tour: *${tourName}*.\n`;
      if (tipoTarifa) mensaje += `Tarifa: ${tipoTarifa} ${precioSeleccionado || ''}\n`;
      mensaje += `Fecha: ${fecha}\n`;
      mensaje += `Personas: ${personas}\n`;
      mensaje += `Correo: ${correo}\n`;
      if (telefonoCliente) mensaje += `Teléfono: ${telefonoCliente}\n`;
      if (idioma) mensaje += `Idioma preferido: ${idioma}\n`;
      if (comentarios) mensaje += `Comentarios: ${comentarios}\n`;

      const telefono = "573247615677"; // tu número
      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');

      document.getElementById('modal-reserva').classList.remove('show');
      showHeader();
    });
  }

  // filtros
  const searchInput = document.getElementById('search');
  if (searchInput) searchInput.addEventListener('input', filter);
  const typeSelect = document.getElementById('type');
  if (typeSelect) typeSelect.addEventListener('change', filter);
  const clearBtn = document.getElementById('clear');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('type').value = 'all';
    filter();
  });
});

// filtro
function filter() {
  const q = (document.getElementById('search') ? document.getElementById('search').value.toLowerCase() : '');
  const type = (document.getElementById('type') ? document.getElementById('type').value : 'all');

  const filtered = tours.filter(t => {
    const matchQuery = t.title.toLowerCase().includes(q) || (t.short && t.short.toLowerCase().includes(q));
    const matchType = type === 'all' ? true : (t.type && t.type.toLowerCase() === type.toLowerCase());
    return matchQuery && matchType;
  });

  render(filtered);
}

