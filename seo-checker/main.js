const keywords = {
    test: ["aid hostage rescue"],
    inicio: ["Durlock Paraguay", "Instalación Durlock",	"Empresa trabajos drywall",	"Profesionales en Durlock"],
    servicios: ["Tabiques durlock",	"Cielorrasos Durlock",	"Aislamientos durlock",	"Trabajos con cartón yeso",	"Profesionales drywall"],
    Tabiques_y_cielorrasos:	["Tabiques y cielorrasos Durlock",	"Paredes y techos drywall",	"Construcción en seco",	"Proyectos integrales con cartón yeso"],	
    tabiques: ["Tabiques durlock", "Paredes cartón yeso",	"Tabiques drywall"],
    CIELORRASOS_DURLOCK_SIMPLE:	["Cielorraso Durlock", "Cielo rasos Durlock", "Techo drywall", "Techo Durlock",	"Cielorraso de cartón yeso"],
    CIELORRASOS_REGISTRABLES: ["Cielorraso registrable Durlock", "Falso techo desmontable", "Cielorraso desmontable", "Techo practicable"],
    CIELORRASOS_DECORATIVOS: ["Cielorraso decorativo durlock", "Techos de diseño con cartón yeso", "Cielorraso moderno"],
    AISLAMIENTOS: ["Aislamientos acústicos y térmicos", "Aislamiento para eficiencia energética", "Aislamiento para ahorro de energía"],
    AISLAMIENTO_ACUSTICO: ["Aislamiento acústico", "Insonorización con Durlock", "Reducción de ruido con drywall"],
    AISLAMIENTO_TERMICO: ["Aislamiento térmico", "Acondicionamiento térmico drywall", "Conservación de temperatura con Durlock"],
    PROTECCION_CONTRA_FUEGO: ["Protección pasiva contra incendios", "Cortafuegos drywall", "Seguridad contra incendios", "Protección estructural contra incendios"],
    ILUMINACION_INDIRECTA: ["Iluminación indirecta", "Iluminación ambiental", "Iluminación decorativa", "Iluminación oculta con drywall"]
};

const fragmentContainer = document.createDocumentFragment();

for ([key, values] of Object.entries(keywords)) {
    const pageContainer = document.createElement('DIV');
    const linksContainer = document.createElement('DIV');
    const pageTitle = document.createElement('H3');
    pageTitle.innerHTML = key;
    pageContainer.appendChild(pageTitle);

    values.forEach(value => {
        const pageLink = document.createElement('A');
        pageLink.innerHTML = value;
        pageLink.href = `https://www.google.com/search?q=${value.replace(' ', '+')}`;
        pageLink.setAttribute('target', '_private')
        pageLink.addEventListener('click', (e)=> {
            // e.preventDefault();
            e.target.style.backgroundColor = '#a1a1a1'; 
            
        })
        linksContainer.appendChild(pageLink);
    })
    pageContainer.appendChild(linksContainer);
    fragmentContainer.appendChild(pageContainer);
}

document.querySelector('.container').appendChild(fragmentContainer);