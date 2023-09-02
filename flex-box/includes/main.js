const flexDirectionBtns = document.querySelectorAll('.flex-direction-btn');


const hideAllInfo = (elem) => {
  const containers = document.querySelectorAll(elem);
  containers.forEach((info) => {
      if (info.classList.contains('selected')) info.classList.remove('selected')
      if ( info.classList.contains('appear')){
        info.classList.remove('appear');
        info.classList.add('disappear');
     };    
  });  
};

const showMessages = (atr, value) => {
  const msg = {    
    'flex-direction': {
      'row': "Es el valor por defecto. Los elementos hijos se muestran horizontalmente según el orden natural del documento HTML, de izquierda a derecha.",
      'row-reverse': "Mostrará los elementos hijos horizontalmente en orden inverso al valor 'row'. Es decir, de derecha a izquierda.",
      'column': "Mostrará los elementos hijos verticalmente según el orden natural del documento (como si todos fueran elementos 'display: block').",
      'column-reverse': "Mostrará los elementos hijos verticalmente en orden inverso al valor 'column'. Es decir, de abajo hacia arriba."
    },
          
    'align-items': {
      'flex-start': "Es el valor por defecto. Alinea los elementos hijos ajustándolos en la parte superior del contenedor padre.",
      'flex-end': "Alinea los elementos hijos ajustándolos en la parte inferior del contenedor padre.",
      'center': "Alinea verticalmente los elementos hijos en el centro del contenedor.",
      'stretch': "Estira los elementos hijos verticalmente para que ocupen la altura completa del contenedor.",
      'baseline': "Alinea los elementos hijos verticalmente en función de sus líneas base."
    },
          
    'flex-wrap': {
      'nowrap': "Es el valor por defecto. Los elementos hijos se muestran horizontalmente según el orden natural del documento HTML, de izquierda a derecha, sin permitir saltos de línea.",
      'wrap': "Cuando el espacio es insuficiente, ajusta los elementos hijo que no caben en el contenedor padre colocándolos en una nueva fila debajo del resto.",
      'wrap-reverse': "Cuando el espacio es insuficiente, ajusta los elementos hijo que no caben en el contenedor padre colocándolos en una nueva fila encima del resto."
    },

    'justify-content': {
      'flex-start': "Es el valor por defecto. Alinea los elementos hijos en el comienzo del contenedor padre en la dirección natural.",
      'flex-end': "Alinea los elementos hijos en el final del contenedor en la dirección natural.",
      'center': "Alinea los elementos hijos en el centro del contenedor en la dirección natural.",
      'space-between': "Distribuye uniformemente los elementos hijos a lo largo del contenedor en la dirección natural, con espacio adicional entre ellos.",
      'space-around': "Distribuye uniformemente los elementos hijos a lo largo del contenedor en la dirección natural, con espacio igual alrededor de cada elemento.",
      'space-evenly': "Distribuye uniformemente los elementos hijos a lo largo del contenedor en la dirección natural, con espacio igual entre ellos y en los extremos."
    }
  };
  if (msg[atr] && msg[atr][value]) {
    return msg[atr][value];
  };
};

flexDirectionBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.aditional-info');
    const direction = e.target.innerHTML.split(' ')[0].toLowerCase();
    const currentDiv = e.target.parentNode.parentNode.querySelector('.divs-container');
    const infoDiv = e.target.parentNode.querySelector('.aditional-info');
    const gap = parseFloat(getComputedStyle(currentDiv).gap);
    

    currentDiv.style.flexDirection = direction;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';
    currentDiv.classList.add('animate');
    (infoDiv.classList.contains('disappear')) ?  infoDiv.classList.remove('disappear') : null
    infoDiv.classList.add('appear');

    infoDiv.children[0].children[0].innerHTML = showMessages('flex-direction', direction);

    currentDiv.addEventListener('transitionend', () => {
      currentDiv.style.maxHeight = null;
      currentDiv.classList.remove('animate');
    }, { once: true }); 
  });
});


const alignItemBtns = document.querySelectorAll('.align-items-btn');

alignItemBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.aditional-info');
    const alignment = e.target.innerHTML.split(' ')[0].toLowerCase();    
    const currentDiv = e.target.parentNode.previousSibling.previousSibling;
    const infoDiv = e.target.parentNode.querySelector('.aditional-info');
    const gap = parseFloat(getComputedStyle(currentDiv).gap);

    currentDiv.style.alignItems = alignment;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';

    currentDiv.childNodes.forEach((child) => {
      if (child.tagName === 'DIV') (alignment === 'baseline') 
        ? child.children[0].style.textDecoration = 'underline' 
        : child.children[0].style.textDecoration = 'none'
    })
    currentDiv.classList.add('animate');
    (infoDiv.classList.contains('disappear')) ?  infoDiv.classList.remove('disappear') : null
    infoDiv.classList.add('appear');

    infoDiv.children[0].children[0].innerHTML = showMessages('align-items', alignment);

    currentDiv.addEventListener('transitionend', () => {
      currentDiv.style.maxHeight = null;
      currentDiv.classList.remove('animate');
    }, { once: true }); 
  });
});

const flexWrapBtns = document.querySelectorAll('.flex-wrap-btn');

flexWrapBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.aditional-info');
    const wrapMode = e.target.innerHTML.split(' ')[0].toLowerCase();
    const currentDiv = e.target.parentNode.previousSibling.previousSibling;
    const infoDiv = e.target.parentNode.querySelector('.aditional-info');
    const gap = parseFloat(getComputedStyle(currentDiv).gap);

    currentDiv.style.flexWrap = wrapMode;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';
    
    currentDiv.classList.add('animate');
    (infoDiv.classList.contains('disappear')) ?  infoDiv.classList.remove('disappear') : null
    infoDiv.classList.add('appear');

    infoDiv.children[0].children[0].innerHTML = showMessages('flex-wrap', wrapMode);

    currentDiv.addEventListener('transitionend', () => {
      currentDiv.style.maxHeight = null;
      currentDiv.classList.remove('animate');
    }, { once: true }); 
  });
});

const justifyContentBtns = document.querySelectorAll('.justify-content-btn');

justifyContentBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.aditional-info');
    const justification = e.target.innerHTML.split(' ')[0].toLowerCase();
    const currentDiv = e.target.parentNode.previousSibling.previousSibling;
    const infoDiv = e.target.parentNode.querySelector('.aditional-info');
    const gap = parseFloat(getComputedStyle(currentDiv).gap);

    currentDiv.style.justifyContent = justification;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';
    
    currentDiv.classList.add('animate');
    (infoDiv.classList.contains('disappear')) ?  infoDiv.classList.remove('disappear') : null
    infoDiv.classList.add('appear');

    infoDiv.children[0].children[0].innerHTML = showMessages('justify-content', justification);

    currentDiv.addEventListener('transitionend', () => {
      currentDiv.style.maxHeight = null;
      currentDiv.classList.remove('animate');
    }, { once: true }); 
  });
});

const flexShrinkBtns = document.querySelectorAll('.flex-shrink-btn');

flexShrinkBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.flex-shrink-btn');
    const targetValue = e.target.innerHTML;
    const currentContainer = e.target.closest('.flex-shrink').querySelector('.flex-container');

    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
      currentContainer.children[parseInt(targetValue) - 1].style.flexShrink = '1';
    } else {
      e.target.classList.add('selected');
      currentContainer.children[parseInt(targetValue) - 1].style.flexShrink = targetValue;
    }
  });
});




// const flexShrinkBtns = document.querySelectorAll('.flex-shrink-btn');

// flexShrinkBtns.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     hideAllInfo('.flex-shrink-btn');
//     const targetValue = e.target.innerHTML;
//     const currentDiv = e.target.parentNode.previousSibling.previousSibling;
//     const selectedDiv = currentDiv.children[2];

//     (e.target.classList.contains('selected')) ? (
//       e.target.classList.remove('selected'),
//       selectedDiv.style.flexShrink = 'inherit'
//     ) : (
//       e.target.classList.add('selected'),
//       selectedDiv.style.flexShrink = targetValue
//     )
//   })
// })