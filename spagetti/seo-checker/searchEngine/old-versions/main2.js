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

 const findKeyword = (query)=>{
    setTimeout(()=> {
        // Realiza la solicitud a la API
        axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
            key: apiKey,
            cx: searchEngineId,
            q: query,
        }
        })
        .then(response => {
            // Procesa los resultados de la búsqueda
            const items = response.data.items;

            items.forEach(item => {
            if (item.link.includes('nnovadesigns.com')) {
                console.log(`Resultados para la consulta "${query}" en la página ${page}`);
            }
            else if (items.length === 0 && response.data.queries.nextPage && page < 5) {
                page++;
                findKeyword(query);
            } else {
                console.log(`Búsqueda finalizada para la keyword: ${query}.` );
            }
            });
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    }, keywordIndex * 3000);
    keywordIndex++;
};

// Ejecutar la búsqueda para cada keyword
for (const category in keywords) {
    const keywordList = keywords[category];
    keywordList.forEach(keyword => {
      page = 1; // Reiniciar la página para cada keyword
      keywordIndex = 0; // Reiniciar el indice para el intervalo
      findKeyword(keyword);
    });
  }