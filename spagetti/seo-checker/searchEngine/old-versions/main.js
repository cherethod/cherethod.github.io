const keywords = {
  inicio: ["Durlock Paraguay", "Instalación Durlock", "Empresa trabajos drywall", "Profesionales en Durlock"]
};

// const keywords = {
//     inicio: ["Durlock Paraguay", "Instalación Durlock", "Empresa trabajos drywall", "Profesionales en Durlock"],
//     servicios: ["Tabiques durlock", "Cielorrasos Durlock", "Aislamientos durlock", "Trabajos con cartón yeso", "Profesionales drywall"],
//     Tabiques_y_cielorrasos: ["Tabiques y cielorrasos Durlock", "Paredes y techos drywall", "Construcción en seco", "Proyectos integrales con cartón yeso"], 
//     tabiques: ["Tabiques durlock", "Paredes cartón yeso", "Tabiques drywall"],
//     CIELORRASOS_DURLOCK_SIMPLE: ["Cielorraso Durlock", "Cielo rasos Durlock", "Techo drywall", "Techo Durlock", "Cielorraso de cartón yeso"],
//     CIELORRASOS_REGISTRABLES: ["Cielorraso registrable Durlock", "Falso techo desmontable", "Cielorraso desmontable", "Techo practicable"],
//     CIELORRASOS_DECORATIVOS: ["Cielorraso decorativo durlock", "Techos de diseño con cartón yeso", "Cielorraso moderno"],
//     AISLAMIENTOS: ["Aislamientos acústicos y térmicos", "Aislamiento para eficiencia energética", "Aislamiento para ahorro de energía"],
//     AISLAMIENTO_ACUSTICO: ["Aislamiento acústico", "Insonorización con Durlock", "Reducción de ruido con drywall"],
//     AISLAMIENTO_TERMICO: ["Aislamiento térmico", "Acondicionamiento térmico drywall", "Conservación de temperatura con Durlock"],
//     PROTECCION_CONTRA_FUEGO: ["Protección pasiva contra incendios", "Cortafuegos drywall", "Seguridad contra incendios", "Protección estructural contra incendios"],
//     ILUMINACION_INDIRECTA: ["Iluminación indirecta", "Iluminación ambiental", "Iluminación decorativa", "Iluminación oculta con drywall"]
// };

// Configura los parámetros de la solicitud

// const apiKey = 'AIzaSyBXM9BxMvEpTcQVEUrKwBIzm01rfL8h4j4';
// const searchEngineId = '54ee821f547114fe1';

const apiKey = 'AIzaSyAfdhmvrnL-ZLPbKN8kiXrYSfyprSaIoMQ';
const searchEngineId = '7062da0f27d584e80';

let page = 1;
let keywordIndex = 0;

const findKeyword = (query, category) => {
  return new Promise((resolve, reject) => {
    const searchPage = async (page) => {
      try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: apiKey,
            cx: searchEngineId,
            q: query,
            start: page,
          },
        });

        const items = response.data.items;
        let foundDomain = false; // Bandera para indicar si se encontró el dominio

        items.forEach(item => {
          if (item.link.includes('nnovadesigns.com')) {
            console.log(`Resultados para la consulta "${query}" en la página ${page}`);
            console.log(`Resultados para la consulta "${query}" en la página ${page}`);
            foundDomain = true; // Se encontró el dominio
             // Agregar los resultados al contenedor
              const resultsContainer = document.querySelector('.results__container');
              const resultElement = document.createElement('div');
              resultElement.classList.add('result');
          
              const categoryElement = document.createElement('div');
              categoryElement.classList.add('category');
              categoryElement.textContent = category.toUppercase(); // Comprobar si el upperCase funciona
          
              const keywordElement = document.createElement('div');
              keywordElement.classList.add('keyword');
              keywordElement.textContent = query;
          
              const pageElement = document.createElement('div');
              pageElement.classList.add('page');
              pageElement.textContent = `Página ${page}`;
          
              resultElement.appendChild(categoryElement);
              resultElement.appendChild(keywordElement);
              resultElement.appendChild(pageElement);
          
              resultsContainer.appendChild(resultElement);
          }
        });

        if (foundDomain) {
          resolve(); // Resuelve la promesa si se encontró el dominio
        } else {
          const nextPage = response.data.queries.nextPage;
          if (nextPage) {
            // Continuar buscando en la siguiente página
            await searchPage(nextPage[0].startIndex);
          } else {
            // No hay más páginas y no se encontró el dominio, resuelve la promesa
            resolve();
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        reject(); // Rechaza la promesa en caso de error
      }
    };

    searchPage(1); // Iniciar la búsqueda en la primera página
  });
};


// Esta funcion funciona pero no pasa de pagina
// const findKeyword = (query, category) => {
//     return new Promise((resolve, reject) => {
//       axios
//         .get('https://www.googleapis.com/customsearch/v1', {
//           params: {
//             key: apiKey,
//             cx: searchEngineId,
//             q: query,
//           },
//         })
//         .then(response => {
//           const items = response.data.items;
//           items.forEach(item => {
//             if (item.link.includes('nnovadesigns.com')) {
//               console.log(`Resultados para la consulta "${query}" en la página ${page}`);

//                // Agregar los resultados al contenedor
//                 const resultsContainer = document.querySelector('.results__container');
//                 const resultElement = document.createElement('div');
//                 resultElement.classList.add('result');
                
//                 const categoryElement = document.createElement('div');
//                 categoryElement.classList.add('category');
//                 categoryElement.textContent = category.toUppercase(); // Comprobar si el upperCase funciona
                
//                 const keywordElement = document.createElement('div');
//                 keywordElement.classList.add('keyword');
//                 keywordElement.textContent = query;
                
//                 const pageElement = document.createElement('div');
//                 pageElement.classList.add('page');
//                 pageElement.textContent = `Página ${page}`;
                
//                 resultElement.appendChild(categoryElement);
//                 resultElement.appendChild(keywordElement);
//                 resultElement.appendChild(pageElement);
                
//                 resultsContainer.appendChild(resultElement);
//             }
//           });
//           resolve(); // Resuelve la promesa cuando se completan las búsquedas para una keyword
//         })
//         .catch(error => {
//           console.error('Error al realizar la solicitud:', error);
//           reject(); // Rechaza la promesa en caso de error
//         });
//     });
//   };
  
  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const updateCounter = (minsElement, secsElement, remainingTime) => {
    const mins = Math.floor(remainingTime / 1000 / 60).toString().padStart(2, '0');
    const secs = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');
    minsElement.textContent = mins;
    secsElement.textContent = secs;
  };
  
  const performSearch = async () => {
    const minsElement = document.getElementById('mins');
    const secsElement = document.getElementById('secs');

    const delayBetweenRequests = 1000; // Tiempo de espera entre cada solicitud (en milisegundos)

    for (const category in keywords) {
      const keywordList = keywords[category];
      for (const keyword of keywordList) {
        page = 1; // Reiniciar la página para cada keyword
        try {
          await findKeyword(keyword, category); 
          await delay(delayBetweenRequests); 
        } catch (error) {
          console.log(`Búsqueda cancelada para la keyword: ${keyword}. Esperando 5 minutos antes de volver a intentarlo.`);
          
          // Mostrar el contador y actualizarlo cada segundo
          const counterElement = document.querySelector('.contador');
          const searchBtn = document.querySelector(('.start__btn'));
          counterElement.style.display = 'grid';
          searchBtn.style.display = 'none';

          let remainingTime = 5 * 60 * 1000;
          updateCounter(minsElement, secsElement, remainingTime);
          
          while (remainingTime > 0) {
            await delay(1000);
            remainingTime -= 1000;
            updateCounter(minsElement, secsElement, remainingTime);
          }
          
          counterElement.style.display = 'none'; 
          searchBtn.style.display = 'block';

          // Reiniciar búsqueda tras finalizar el contador
          await findKeyword(keyword, category);
        }
      }
    }
  };




// const findKeyword = (query)=>{
//     setTimeout(()=> {
//         // Realiza la solicitud a la API
//         axios.get('https://www.googleapis.com/customsearch/v1', {
//         params: {
//             key: apiKey,
//             cx: searchEngineId,
//             q: query,
//         }
//         })
//         .then(response => {
//             // Procesa los resultados de la búsqueda
//             const items = response.data.items;

//             items.forEach(item => {
//             if (item.link.includes('nnovadesigns.com')) {
//                 console.log(`Resultados para la consulta "${query}" en la página ${page}`);
//             }
//             else if (items.length === 0 && response.data.queries.nextPage) {
//                 page++;
//                 findKeyword(query);
//             } else {
//                 console.log(`Búsqueda finalizada para la keyword: ${query}.` );
//             }
//             });
//         })
//         .catch(error => {
//             console.error('Error al realizar la solicitud:', error);
//         });
//     }, keywordIndex * 3000);
//     keywordIndex++;
// };

// // Ejecutar la búsqueda para cada keyword
// for (const category in keywords) {
//     const keywordList = keywords[category];
//     keywordList.forEach(keyword => {
//       page = 1; // Reiniciar la página para cada keyword
//       keywordIndex = 0; // Reiniciar el indice para el intervalo
//       findKeyword(keyword);
//     });
//   }