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
    const footerLogo = getElement('.footer__logo--img');
  
    container.className = `container ${mode}`;
    colorModeBtn.className = `toggle__mode--btn ${mode}`;
    logo.src = mode === 'dark' ? './img/Logo_Nnova_white_very-small.png' : './img/Logo_Nnova_black_very-small.png';
    footerLogo.src = mode === 'dark' ? './img/Logo_Nnova_white_small.png' : './img/Logo_Nnova_black_small.png';
  };
  
  const initColorMode = () => {
    const colorModeBtn = getElement('.toggle__mode--container');
    const storedMode = localStorage.getItem('color-mode') || 'dark';
  
    colorModeBtn.addEventListener('click', toggleColorMode);
    setColorMode(storedMode);
  }; 
  
  const openFaqAnswer = () => {
    function closeAnswers(currentTarget) {
      const answers = document.querySelectorAll('.faqs__answer--container');
      answers.forEach((faq) => {
        if (faq.classList.contains('open') && faq !== currentTarget) {
          faq.classList.remove('open');
        }
      });
    }
    const answersBtn = document.querySelectorAll('.question__open--icon');
    answersBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let parent = e.target.closest('.faqs__answer--container');
        closeAnswers(parent);
        parent.classList.contains('open') ? parent.classList.remove('open') : parent.classList.add('open');
        // console.log(parent.parentElement);
      });
    });
  };
  
  const scrollToTop = ()=> {
    const mainContainer = document.querySelector('.container');
    const scrollBtn = document.querySelector('.to__top--btn'); 
    function scrollFunction(e) {
     if (e.target.scrollTop > 500) {
        //  console.log('dentro if')
       scrollBtn.style.display = "flex";
     } else {
        //  console.log()
       scrollBtn.style.display = "none";
     }
   }
    mainContainer.addEventListener('scroll', (e)=> {
     scrollFunction(e)
    })
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    initColorMode();
    openFaqAnswer();
    if (document.getElementById('scroll-btn')!= null) {
      scrollToTop()
    }
    // createSliderObject();
  });

 