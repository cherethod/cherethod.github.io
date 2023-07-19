const keywords = {
    inicio: ["Durlock Paraguay", "Instalación Durlock", "Empresa trabajos drywall", "Profesionales en Durlock"],
    servicios: ["Tabiques durlock", "Cielorrasos Durlock", "Aislamientos durlock", "Trabajos con cartón yeso", "Profesionales drywall"],
    Tabiques_y_cielorrasos: ["Tabiques y cielorrasos Durlock", "Paredes y techos drywall", "Construcción en seco", "Proyectos integrales con cartón yeso"], 
    tabiques: ["Tabiques durlock", "Paredes cartón yeso", "Tabiques drywall"],
    CIELORRASOS_DURLOCK_SIMPLE: ["Cielorraso Durlock", "Cielo rasos Durlock", "Techo drywall", "Techo Durlock", "Cielorraso de cartón yeso"],
    CIELORRASOS_REGISTRABLES: ["Cielorraso registrable Durlock", "Falso techo desmontable", "Cielorraso desmontable", "Techo practicable"],
    CIELORRASOS_DECORATIVOS: ["Cielorraso decorativo durlock", "Techos de diseño con cartón yeso", "Cielorraso moderno"],
    AISLAMIENTOS: ["Aislamientos acústicos y térmicos", "Aislamiento para eficiencia energética", "Aislamiento para ahorro de energía"],
    AISLAMIENTO_ACUSTICO: ["Aislamiento acústico", "Insonorización con Durlock", "Reducción de ruido con drywall"],
    AISLAMIENTO_TERMICO: ["Aislamiento térmico", "Acondicionamiento térmico drywall", "Conservación de temperatura con Durlock"],
    PROTECCION_CONTRA_FUEGO: ["Protección pasiva contra incendios", "Cortafuegos drywall", "Seguridad contra incendios", "Protección estructural contra incendios"],
    ILUMINACION_INDIRECTA: ["Iluminación indirecta", "Iluminación ambiental", "Iluminación decorativa", "Iluminación oculta con drywall"]
};

// Configura los parámetros de la solicitud
let apiKey = 'AIzaSyC6Vw8X3gO1YUAaOZGF3CKgXOTHmuLgobc';
let searchEngineId = 'e68378b4e6da74f5c';

// Variables de los elementos
const counterContainer = document.querySelector('.waiting__container')
const searchBtn = document.querySelector('.start__btn');
const hoursElement = document.getElementById('hours');
const minsElement = document.getElementById('mins');
const secsElement = document.getElementById('secs');
const checkDateSaved = localStorage.getItem('seoCheckerLastUse');
const resultsContainer = document.querySelector('.results__container');
let isSearchComplete = false;
let resultCount = 0;

const createElement = (category, keyword, page)=> {
  // Agregar los resultados al contenedor
  const resultElement = document.createElement('div');
  resultElement.classList.add('result');

  const categoryElement = document.createElement('div');
  categoryElement.classList.add('category');
  categoryElement.textContent = category.toUpperCase(); // Comprobar si el upperCase funciona

  const keywordElement = document.createElement('div');
  keywordElement.classList.add('keyword');
  keywordElement.textContent = keyword;

  const pageElement = document.createElement('div');
  pageElement.classList.add('page');
  pageElement.textContent = `Página ${page}`;

  resultElement.appendChild(categoryElement);
  resultElement.appendChild(keywordElement);
  resultElement.appendChild(pageElement);

  resultsContainer.appendChild(resultElement);
}
const getTodaysDate = () => {
  const today = new Date();
  return today;
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const updateCounter = (remainingTime) => {
  const hours = Math.floor(remainingTime / (1000 * 60 * 60)).toString().padStart(2, '0');
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toString().padStart(2, '0');
  const secs = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');
  hoursElement.textContent = hours;
  minsElement.textContent = mins;
  secsElement.textContent = secs;
};

const findKeyword = (query, category) => {
  let page = 1;
  let totalResults = 0;

  const performSearchPage = (page) => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: apiKey,
            cx: searchEngineId,
            q: query,
            start: (page - 1) * 10 + 1,
          },
        })
        .then(response => {
          const items = response.data.items;
          totalResults += items.length;

          items.forEach(item => {
            if (item.link.includes('nnovadesigns.com')) {
              console.log(`ENCONTRADA: Resultados para la consulta "${query}" encontrados en la página ${page}`);
                createElement(category, query, page)
                resultCount++;
            }
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const performSearchPages = async () => {
    for (let currentPage = 1; currentPage <= 3; currentPage++) {
      await performSearchPage(currentPage);
    }

    // console.log(`Búsqueda finalizada para la keyword: ${query}`);
  };

  return performSearchPages();
};

const performSearch = async () => {
  for (const category in keywords) {
    const keywordList = keywords[category];
    for (const keyword of keywordList) {
      findKeyword(keyword, category);
    }
  }  
  isSearchComplete = true;
  if (resultCount == 0) {
    searchBtn.style.display = 'none';
    counterContainer.style.display = 'grid';
   } else {
    searchBtn.style.display = 'none';
    counterContainer.style.display = 'none';  
   }
}

const initSeoChecker = () => {
  searchBtn.style.display = 'none';
  counterContainer.style.display = 'none'
  if (checkDateSaved) {
    const savedDate = new Date(checkDateSaved);
    const currentDate = getTodaysDate();
    const timeDiff = currentDate.getTime() - savedDate.getTime();
    const timeDiffInHours = timeDiff / (1000 * 60 * 60);

    if (timeDiffInHours >= 24) {
      localStorage.removeItem('seoCheckerLastUse');
      return false;
    } else {
      const remainingTime = Math.floor((24 - timeDiffInHours) * 60 * 60 * 1000);
      counterContainer.style.display = 'grid'
      updateCounter(remainingTime);

      const countdown = async () => {
        let timeRemaining = remainingTime;

        while (timeRemaining > 0) {
          await delay(1000);
          timeRemaining -= 1000;
          updateCounter(timeRemaining);
        }

        alert('El tiempo ha expirado');
        console.log('El tiempo ha expirado');
      };

      countdown();
      return true;
    }    
  }
  return false;
};

const start = ()=> {
  // TRUE = hay registro o no han pasado las 24 horas
  // FALSE = NO hay registro o han pasado más de 24 horas
  if (!initSeoChecker()) {
    const currentDate = getTodaysDate();
    const formattedDate = currentDate.toISOString();
    localStorage.setItem('seoCheckerLastUse', formattedDate);
    performSearch();
  }
}

const insertNewKeys = ()=> {
  localStorage.removeItem('seoCheckerLastUse');
  apiKey = prompt('Inster new apiKey Code').valueOf();
  searchEngineId = prompt('Inster new Search Engine ID').valueOf();
  start();
}

const searchAgain = ()=> {
  isSearchComplete = false;
  performSearch();
}


