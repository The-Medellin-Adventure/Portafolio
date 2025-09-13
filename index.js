// Datos tomados de: https://themedellinadventure-com.webnode.com.co/destinos/
const tours = [
  {
    id: 1,
    title: 'Medellín 360°',
    type: 'Experiencia virtual',
    short: 'Un tour inmersivo que te lleva por la Plaza Botero, el Pueblito Paisa y otros íconos de Medellín...',
    img: 'img/360.png',
   extraImg: 'img/citytour_extra.jpg', // Nueva imagen para la tarjeta del modal
   meta: 'Compartido y Privado',
   precio: '$90.000 COP',
   duracion: '4 horas aprox',
   longDesc: 'Este tour incluye transporte privado, guía bilingüe y visita a los principales íconos de la ciudad. Ideal para conocer la cultura paisa en un recorrido dinámico y seguro.'
},
  {
    id: 2,
    title: 'City Tour Medellín',
    type: 'compartido',
    short: 'Recorrido por los puntos más icónicos de Medellín: Plaza Botero, Pueblito Paisa y miradores.',
    img: 'https://source.unsplash.com/featured/?medellin,city',
    meta: 'Compartido y Privado',
    precio: '$90.000 COP',
    duracion: '4 horas aprox',
    url: 'https://themedellinadventure-com.webnode.com.co/city-tour-medellin/'
  },
  {
    id: 3,
    title: 'Graffitour - Comuna 13',
    type: 'compartido',
    short: 'Tour cultural por la Comuna 13 con arte urbano, escaleras eléctricas y comunidad local.',
    img: 'https://source.unsplash.com/featured/?comuna13,graffiti',
    meta: 'Compartido y Privado',
    precio: '$90.000 COP' <br> '350.000 cop Privado',
    duracion: '4 horas aprox',
    url: 'https://themedellinadventure-com.webnode.com.co/city-tour-y-comuna-13/'
  },
  {
    id: 4,
    title: 'Guatapé',
    type: 'compartido',
    short: 'Visita a la Piedra del Peñol y el colorido pueblo de Guatapé.',
    img: 'https://source.unsplash.com/featured/?guatape,peñol',
    meta: 'Compartido y Privado',
    precio: '$90.000 COP',
    duracion: '10 horas',
    url: 'https://themedellinadventure-com.webnode.com.co/guatape2/'
  },
  {
    id: 5,
    title: 'Tour del Café',
    type: 'privado',
    short: 'Experiencia sensorial en fincas cafeteras cerca de Medellín.',
    img: 'https://source.unsplash.com/featured/?coffee,farm',
    meta: 'Compartido y Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 6,
    title: 'Tour Casa de las Flores',
    type: 'privado',
    short: 'Paseo cultural por la casa y paisajes de flores, ideal para fotografía.',
    img: 'https://source.unsplash.com/featured/?flowers,house',
    meta: 'Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 7,
    title: 'Resiliencia Activa - Pablo Escobar',
    type: 'compartido',
    short: 'Ruta cultural y reflexiva sobre la historia reciente de Medellín.',
    img: 'https://source.unsplash.com/featured/?medellin,history',
    meta: 'Compartido y Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 8,
    title: 'Santa Fé de Antioquia',
    type: 'compartido',
    short: 'Pueblo colonial con arquitectura y puentes históricos.',
    img: 'https://source.unsplash.com/featured/?santafedeantioquia,colonial',
    meta: 'Compartido y Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 9,
    title: 'Rio Claro',
    type: 'privado',
    short: 'Vuelo en tándem sobre valles y paisajes; aventura y vistas únicas.',
    img: 'https://source.unsplash.com/featured/?paragliding,parapente',
    meta: 'Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 10,
    title: 'Parapente',
    type: 'privado',
    short: 'Vuelo en tándem sobre valles y paisajes; aventura y vistas únicas.',
    img: 'https://source.unsplash.com/featured/?paragliding,parapente',
    meta: 'Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 11,
    title: "Atv's - Cuatrimotos",
    type: 'privado',
    short: 'Aventura off-road con cuatrimotos en rutas naturales.',
    img: 'https://source.unsplash.com/featured/?atv,quad',
    meta: 'Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  },
  {
    id: 12,
    title: 'Cabalgata',
    type: 'privado',
    short: 'Aventura off-road con cuatrimotos en rutas naturales.',
    img: 'https://source.unsplash.com/featured/?atv,quad',
    meta: 'Privado',
    duracion: '1 día',
    url: 'https://themedellinadventure-com.webnode.com.co/reservar/'
  }
];

const grid = document.getElementById('tours-grid');
const empty = document.getElementById('empty');

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
      <img src="${t.img}" alt="${t.title}" />
      <div class="card-body">
        <div class="meta">
          <span>Duración: ${t.duracion || 'No especificada'}</span>
          <span class="tags">${t.meta}</span>
        </div>
        <h4 class="title">${t.title}</h4>
        <p class="desc">${t.short}</p>
        <div class="cta">
          <button class="btn" data-id="${t.id}" onclick="openDetail(${t.id})">Ver más</button>
          <a class="btn cta" href="${t.url || '#'}" target="_blank" rel="noopener noreferrer">Reservar</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openDetail(id) {
  const t = tours.find(x => x.id === id);
  if (!t) return;

  const modal = document.getElementById('modal');

  // Imagen de la izquierda
  document.getElementById('modal-image').innerHTML = `
    <img src="${t.extraImg || t.img}" alt="${t.title}" />
  `;

  // Información de la derecha
  document.getElementById('modal-title').textContent = t.title;
  document.getElementById('modal-meta').textContent = `${t.meta || ''} • Duración: ${t.duracion || 'No especificada'}`;

  document.getElementById('modal-desc').innerHTML = `
    <p>${t.longDesc || t.short}</p>
    <p><strong>Precio:</strong> ${t.precio || 'Consulta con nosotros'}</p>
  `;

  modal.classList.add('show');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('show');
});

document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('search').value = '';
  document.getElementById('type').value = 'all';
  filter();
});

function filter() {
  const q = document.getElementById('search').value.toLowerCase();
  const type = document.getElementById('type').value;

  const filtered = tours.filter(t => {
    const matchQuery = t.title.toLowerCase().includes(q) || t.short.toLowerCase().includes(q);
    const matchType = type === 'all' ? true : t.type.toLowerCase() === type.toLowerCase();
    return matchQuery && matchType;
  });

  render(filtered);
}

document.getElementById('search').addEventListener('input', filter);
document.getElementById('type').addEventListener('change', filter);

// Render inicial con todos los tours
render(tours);

// Botón descargar (simulado)
document.getElementById('brochure').addEventListener('click', () => {
  alert('Se descargará un folleto con la información del tour (simulación).');
});
