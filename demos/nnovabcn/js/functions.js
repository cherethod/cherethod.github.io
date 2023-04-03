const checkNavigatorLanguage = () => {
    let language = navigator.language.toLowerCase();
    if (language.includes('en')) {console.log(`DEFAULT LANGUAGE: ENGLISH`);}
    else if (language.includes('es')) {console.log(`IDIOMA POR DEFECTO: ESPAÑOL`);}
};

const getRandomNumber = (max)=> {
    // return Math.round(Math.random()*max); 
    return Math.floor(Math.random() * (max + 1));
};

const getElement = (selector) => document.querySelector(selector);

const createElements = (type, id, elemclass) => {
    let elem = document.createElement(type); // AI tip -> No se porqué usé aquí Backtips...
    elem.id = id;
    elem.classList.add(elemclass);  // AI tip -> No se porqué usé aquí Backtips...          
    return elem;
};

const setAttributes = (element, attributes) => { // AI tip -> Use a function to add attributes to elements: I noticed that you are often repeating the process of adding attributes to HTML elements
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

const toggleColorMode = () => {
    const colorMode = localStorage.getItem('color-mode') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-mode', colorMode);
    setColorMode(colorMode);
  };
  
  const setColorMode = (mode) => {
    const container = getElement('.container');
    const colorModeBtn = getElement('.toggle__mode--btn');
    const logo = getElement('.logo__img');
  
    container.className = `container ${mode}`;
    colorModeBtn.className = `toggle__mode--btn ${mode}`;
    logo.src = mode === 'dark' ? './img/Logo_Nnova_white_very-small.png' : './img/Logo_Nnova_black_very-small.png';
  };
  
  const initColorMode = () => {
    const colorModeBtn = getElement('.toggle__mode--container');
    const storedMode = localStorage.getItem('color-mode') || 'dark';
  
    colorModeBtn.addEventListener('click', toggleColorMode);
    setColorMode(storedMode);
  };
  
  document.addEventListener('DOMContentLoaded', initColorMode);




// let colorModeToggleListener = function() {
//     let colorModeBtn = document.querySelector('.toggle__mode--container');
//     colorModeBtn.addEventListener('click', (e)=> {
//         // console.log(e.target)
//         if (e.target.classList.contains('toggle__mode--btn')) {
//             if (e.target.classList.contains('dark')) {
//                 e.target.classList.remove('dark');
//                 e.target.classList.add('light');
//                 storeColorMode('light');
//                 setColorMode()
//             } else {
//                 e.target.classList.remove('light');
//                 e.target.classList.add('dark');
//                 storeColorMode('dark');
//                 setColorMode()
//             }
//         }
//     })
// }

// const checkColorMode = ()=> {
//     if (!localStorage.getItem('color-mode')) storeColorMode('dark'); 
//     return localStorage.getItem('color-mode');
// }

// const storeColorMode = (mode = undefined)=> {
//     if (mode != undefined && mode != null && localStorage.getItem('color-mode')) {
//         localStorage.setItem('color-mode', mode);
//     }
//     else if (mode == undefined || mode == null || mode != 'dark' || mode != 'light' || !localStorage.getItem('color-mode')) {
//         localStorage.setItem('color-mode', 'dark');
//     }
// }

// const setColorMode = ()=> {
//     let container = document.querySelector('.container');
//     let colorModeBtn = document.querySelector('.toggle__mode--btn');
//     let logo = document.querySelector('.logo__img');
//     if (checkColorMode() == 'dark') {
//         if (container.classList.contains('light')) container.classList.remove('light');
//         container.classList.add('dark');
//         if (colorModeBtn.classList.contains('light')) colorModeBtn.classList.remove('light');
//         colorModeBtn.classList.add('dark');
//         logo.src='./img/Logo_Nnova_white_very-small.png';
//     }
//     else if (checkColorMode() == 'light') {
//         if (container.classList.contains('dark')) container.classList.remove('dark');
//         container.classList.add('light');  
//         if (colorModeBtn.classList.contains('dark')) colorModeBtn.classList.remove('dark');
//         colorModeBtn.classList.add('light'); 
//         logo.src='./img/Logo_Nnova_black_very-small.png';
//     }
//     // console.log(colorModeBtn.children)
// }

// const initColorMode = function() {
//     try {
//         colorModeToggleListener()
//         checkColorMode()
//         setColorMode();
//     } catch (error) {
//         console.error('Ha ocurrido un error al inicializar el alternador de color', error)
//     }
    
// }

// document.addEventListener('DOMContentLoaded', initColorMode);
// (function(){initColorMode()})

// const setColorMode = (mode = undefined)=> {
//     let container = document.querySelector('.container');
//     if (mode == undefined && !localStorage.getItem('color-mode')){
//         localStorage.setItem('color-mode', 'dark');
//         if (container.classList.contains('light')) container.classList.remove('light');
//         container.classList.add('dark');
//     } 
//     else if (localStorage.getItem('color-mode') && !container.classList.contains(mode)) {
//         if (container.classList.contains('light') && mode == 'dark') container.classList.remove('light');
//         if (container.classList.contains('dark') && mode == 'light') container.classList.remove('dark');
//         // (mode == 'dark') ? container.classList.remove('light') : container.classList.remove('dark');
//         container.classList.add(localStorage.getItem('color-mode'))
//     }
//     else if (!localStorage.getItem('color-mode') && (mode == 'dark' || mode == 'light')) {
//         localStorage.setItem('color-mode', mode);
//         (mode == 'dark') ? (
//             container.classList.add('dark'),
//             container.classList.remove('light')
//             ) : (
//                 container.classList.add('light'),
//                 container.classList.remove7('dark')
//             )
//     }
// }