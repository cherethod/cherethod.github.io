const flexDirectionBtns = document.querySelectorAll('.flex-direction-btn');


const hideAllInfo = () => {
  const containers = document.querySelectorAll('.aditional-info');
  containers.forEach((info) => {
      info.classList.add('disappear');
      info.classList.remove('appear')
  });  
};

const showMessages = (atr, value) => {
  const msg = {    
      'flex-direction' : {
          'row': "Es el valor por defecto. Se mostrarán los elementos hijos horizontalmente según el orden natural del documento HTML colocandolos de izquierda a derecha",
          'row-reverse': `Mostrará los elementos hijos horizontalmente en orden inverso al valor "row". Es decir de derecha a izquierda`,
          'column': "Mostrará los elementos hijos verticalmente según el orden natural del documento (cómo si todos fueran display block)",
          'column-reverse': `Mostrará los elementos hijos verticalmente en orden inverso al valor "column". Es decir de abajo hacia arriba`
      }    
  };
  if (msg[atr] && msg[atr][value]) {
    return msg[atr][value];
  };
};

flexDirectionBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo();
    const direction = e.target.innerHTML.split(' ')[0].toLowerCase();
    const currentDiv = e.target.parentNode.parentNode.querySelector('.divs-container');
    const infoDiv = e.target.parentNode.querySelector('.aditional-info');
    const gap = parseFloat(getComputedStyle(currentDiv).gap);
    

    currentDiv.style.flexDirection = direction;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';
    currentDiv.classList.add('animate');
    infoDiv.classList.remove('disappear');
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
    const alignment = e.target.innerHTML.split(' ')[0].toLowerCase();    
    const currentDiv = e.target.parentNode.previousSibling.previousSibling;
    const gap = parseFloat(getComputedStyle(currentDiv).gap);

    currentDiv.style.alignItems = alignment;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';

    currentDiv.childNodes.forEach((child) => {
      if (child.tagName === 'DIV') (alignment === 'baseline') 
        ? child.children[0].style.textDecoration = 'underline' 
        : child.children[0].style.textDecoration = 'none'
    })
    currentDiv.classList.add('animate');

    currentDiv.addEventListener('transitionend', () => {
      currentDiv.style.maxHeight = null;
      currentDiv.classList.remove('animate');
    }, { once: true }); 
  });
});

const flexWrapBtns = document.querySelectorAll('.flex-wrap-btn');

flexWrapBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const wrapMode = e.target.innerHTML.split(' ')[0].toLowerCase();
    const currentDiv = e.target.parentNode.previousSibling.previousSibling;
    const gap = parseFloat(getComputedStyle(currentDiv).gap);

    currentDiv.style.flexWrap = wrapMode;
    currentDiv.style.maxHeight = currentDiv.scrollHeight + gap + 'px';
    
    currentDiv.classList.add('animate');

    currentDiv.addEventListener('transitionend', () => {
      currentDiv.style.maxHeight = null;
      currentDiv.classList.remove('animate');
    }, { once: true }); 
  });
})