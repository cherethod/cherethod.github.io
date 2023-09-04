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
      'flex-start': "Alinea los elementos hijos ajustándolos en la parte superior del contenedor padre.",
      'flex-end': "Alinea los elementos hijos ajustándolos en la parte inferior del contenedor padre.",
      'center': "Alinea verticalmente los elementos hijos en el centro del contenedor.",
      'stretch': "Es el valor por defecto. Estira los elementos hijos verticalmente para que ocupen la altura completa del contenedor.",
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
    },
    'flex-shrink': {
      'info': `El atributo flex-shrink establece una prioridad a la hora de "ceder" espacio respecto a los elementos hermanos que comparten un contenedor con display flex.`,
      '0': "Al establecer el valor 0 a un div hijo, este nunca perderá espacio respecto al resto de elementos.",
      '1': "Al establecer el valor 1 a un div hijo, este reducirá el espacio de igual manera que los elementos sin atributo flex-shrink o elementos con valor 0.",
      '2': "Al establecer el valor 2 a un div hijo, este reducirá el espacio de manera más significativa que los elementos sin atributo flex-shrink o con valores inferiores, como 0 o 1.",
      '3': "Al establecer el valor 3 a un div hijo, este reducirá el espacio de manera aún más pronunciada que los elementos sin atributo flex-shrink o con valores inferiores, como 0, 1 o 2."
    },
    'flex-grow': {
      'info': `El atributo flex-grow establece una prioridad a la hora de "ganar" espacio respecto a los elementos hermanos que comparten un contenedor con display flex.`,
      '0': "Al establecer el valor 0 a un div hijo, este nunca ganará espacio adicional respecto al resto de elementos.",
      '1': "Al establecer el valor 1 a un div hijo, este ganará espacio adicional de igual manera que los elementos sin atributo flex-grow o elementos con valor 0.",
      '2': "Al establecer el valor 2 a un div hijo, este ganará espacio adicional de manera más significativa que los elementos sin atributo flex-grow o con valores inferiores, como 0 o 1.",
      '3': "Al establecer el valor 3 a un div hijo, este ganará espacio adicional de manera aún más pronunciada que los elementos sin atributo flex-grow o con valores inferiores, como 0, 1 o 2."
    }, 
    'flex-basis': {
      'info': `El atributo flex-basis establece un ancho que el elemento "intentará" obtener siempre que quede espacio disponible para ello.`,
      'info2': `El div 2 intentará obtener el tamaño asignado en flex-basis, de manera similar a si asignáramos un ancho (width). Sin embargo, esto solo se aplicará si es posible dentro del espacio disponible entre sus hermanos.`
    },
    'gap': {
      'info': `El atributo gap establece un espaciado entre los elementos hijos, de manera similar a un margen lateral. La diferencia principal con el margen (margin) es que el gap solo agrega espacio entre los hijos, sin afectar los extremos del contenedor.`
    }    
  };    
  
  if (msg[atr] && msg[atr][value]) {
    return msg[atr][value];
  };
};


const hideTools = (attribute)=> {
  const shrinkToolsDiv = document.querySelector('.flex-shrink').children[2].children[3];
  const growToolsDiv = document.querySelector('.flex-grow').children[2].children[3];
  const selectedBtns = document.querySelectorAll('.btn.selected');
  selectedBtns.forEach((btn) => btn.classList.remove('selected'))

  switch (attribute) {
    case 'shrink':
        growToolsDiv.style.opacity = '0';
      break;
    case 'grow':
        shrinkToolsDiv.style.opacity = '0';
    default:
      break;
  }
}

const resetStyles = (attribute) => {
  const selectedCells = document.querySelectorAll('.cell');
  selectedCells.forEach((cell) => {
    switch (attribute) {
      case 'shrink':
        if (cell.parentElement.parentElement.classList.contains('flex-shrink')) {
          cell.style.flexShrink = '';
        }
        break;
      case 'grow':
        if (cell.parentElement.parentElement.classList.contains('flex-grow')) {
          cell.style.flexGrow = '';
        }
        break;
      case 'basis':
        if (cell.parentElement.parentElement.classList.contains('flex-basis')) {
          cell.style.flexBasis = '';
        }
      default:
        break;
    }
  });
};

/************************
**  FLEX - DIRECTION   ** 
************************/

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


/************************
**    ALIGN - ITEMS    ** 
************************/

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


/************************
**     FLEX - WRAP     ** 
************************/

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


/************************
**  JUSTIFY - CONTENT  ** 
************************/

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

/************************
**    FLEX - SHRINK    ** 
************************/

const flexShrinkBtns = document.querySelectorAll('.flex-shrink-btn');
let selectedShrinkCell = null; 

document.querySelector('#width-control-shrink').addEventListener('input', (e) => {
  hideAllInfo('.aditional-info');
  const infoDiv = e.target.parentNode.previousSibling.previousSibling;
  (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
  infoDiv.classList.add('appear');
  infoDiv.children[0].children[0].innerHTML = showMessages('flex-shrink', 'info');
  document.querySelector('.shrink-container').style.width = `${e.target.value}%`;
});

flexShrinkBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.aditional-info');
    const targetDiv = parseInt(e.target.innerHTML);
    const valuesDiv = document.querySelector('.shrink-values-container');

    function removeSelectedBtns() {
      const selectedBtns = document.querySelectorAll('.selected');
      selectedBtns.forEach((selBtn) => {
        if (selBtn.classList.contains('btn')) selBtn.classList.remove('selected');
      });
    }

    selectedShrinkCell = document.querySelector('.shrink-container').children[targetDiv - 1];

    function markAsignedValue() {
      // I WANT TO DIE ... getPropertyValue returns a string (almost in this case), can't compare with a number...
      let asignedValue = parseInt(window.getComputedStyle(selectedShrinkCell).getPropertyValue('flex-shrink'));
      const values = document.querySelectorAll('.flex-shrink-value');
      values.forEach((value, i) => {        
       value.style.backgroundColor = (asignedValue === i) ? 'purple' : '#d3d3d3'
      });
    }
    
    (e.target.classList.contains('selected')) ? (
      e.target.classList.remove('selected'),
      valuesDiv.style.opacity = '0',
      valuesDiv.classList.remove('active')
    ) : ( 
      removeSelectedBtns(),
      hideTools('shrink'),
      e.target.classList.add('selected'),
      valuesDiv.style.opacity = '1',
      markAsignedValue(),
      valuesDiv.classList.add('active')
    );

    const valuesBtns = valuesDiv.querySelectorAll('.flex-shrink-value');
    valuesBtns.forEach((valueBtn) => {
      valueBtn.addEventListener('click', (e) => {
        if (valuesDiv.classList.contains('active')) {
          const infoDiv = e.target.parentNode.parentNode.parentNode.children[0];
          const value = e.target.innerHTML;
          selectedShrinkCell.style.flexShrink = value; 
          markAsignedValue()
          hideAllInfo('.aditional-info');
          (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
          infoDiv.classList.add('appear');
          infoDiv.children[0].children[0].innerHTML = showMessages('flex-shrink', `${value}`);
        }
      });
    });
  });
});


/************************
**    FLEX - GROW      ** 
************************/

const flexgrowBtns = document.querySelectorAll('.flex-grow-btn');
let selectedGrowCell = null; 

document.querySelector('#width-control-grow').addEventListener('input', (e) => {
  hideAllInfo('.aditional-info');
  const infoDiv = e.target.parentNode.previousSibling.previousSibling;
  (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
  infoDiv.classList.add('appear');
  infoDiv.children[0].children[0].innerHTML = showMessages('flex-grow', 'info');
  document.querySelector('.grow-container').style.width = `${e.target.value}%`;
});

flexgrowBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideAllInfo('.aditional-info');
    const targetDiv = parseInt(e.target.innerHTML);
    const valuesDiv = document.querySelector('.grow-values-container');
    function removeSelectedBtns() {
      const selectedBtns = document.querySelectorAll('.selected');
      selectedBtns.forEach((selBtn) => {
        if (selBtn.classList.contains('btn')) selBtn.classList.remove('selected');
      });
    }

    selectedGrowCell = document.querySelector('.grow-container').children[targetDiv - 1];

    function markAsignedValue() {
      let asignedValue = parseInt(window.getComputedStyle(selectedGrowCell).getPropertyValue('flex-grow'));
      const values = document.querySelectorAll('.flex-grow-value');
      values.forEach((value, i) => {        
       value.style.backgroundColor = (asignedValue === i) ? 'purple' : '#d3d3d3'
      });
    }
    
    (e.target.classList.contains('selected')) ? (
      e.target.classList.remove('selected'),
      valuesDiv.style.opacity = '0',
      valuesDiv.classList.remove('active')
    ) : ( 
      removeSelectedBtns(),
      hideTools('grow'),
      e.target.classList.add('selected'),
      valuesDiv.style.opacity = '1',
      markAsignedValue(),
      valuesDiv.classList.add('active')
    );

    const valuesBtns = valuesDiv.querySelectorAll('.flex-grow-value');
    valuesBtns.forEach((valueBtn) => {
      valueBtn.addEventListener('click', (e) => {
        if (valuesDiv.classList.contains('active')) {
          const infoDiv = e.target.parentNode.parentNode.parentNode.children[0];
          const value = e.target.innerHTML;
          selectedGrowCell.style.flexGrow = value; 
          markAsignedValue()
          hideAllInfo('.aditional-info');
          (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
          infoDiv.classList.add('appear');
          infoDiv.children[0].children[0].innerHTML = showMessages('flex-grow', `${value}`);
        }
      });
    });
  });
});


/************************
**    FLEX - BASIS     ** 
************************/

document.querySelector('#width-control-basis').addEventListener('input', (e) => {
  hideAllInfo('.aditional-info');
  const infoDiv = e.target.parentNode.children[4];
  (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
  infoDiv.classList.add('appear');
  infoDiv.children[0].children[0].innerHTML = showMessages('flex-basis', 'info');
  document.querySelector('.basis-container').style.width = `${e.target.value}%`;
});

document.querySelector('#flex-basis-control').addEventListener('input', (e) => {
  hideAllInfo('.aditional-info');
  const infoDiv = e.target.parentNode.children[4];
  (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
  infoDiv.classList.add('appear');
  infoDiv.children[0].children[0].innerHTML = showMessages('flex-basis', 'info2');
  document.querySelector('.basis-container').children[1].style.flexBasis = `${e.target.value}px`;
  document.querySelector('#basis-size-title').innerHTML = `Div 2 basis control. Size: ${e.target.value}px` 
});


/************************
**         GAP         ** 
************************/
document.querySelector('#gap-control').addEventListener('input', (e) => {
  hideAllInfo('.aditional-info');
  const infoDiv = e.target.parentNode.children[1];
  (infoDiv.classList.contains('disappear')) ? infoDiv.classList.remove('disappear') : null;
  infoDiv.classList.add('appear');
  infoDiv.children[0].children[0].innerHTML = showMessages('gap', 'info');
  document.querySelector('.gap-container').style.gap = `${e.target.value}px`;
});

/************************
**        PLACE        ** 
************************/

const placeItemsBtns = document.querySelectorAll('.place-items-btn');
const placeContentBtns = document.querySelectorAll('.place-content-btn');
const placeCellDiv = document.querySelector('.place-container');

placeItemsBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    placeCellDiv.style.placeItems = e.target.innerHTML.toLowerCase();
  })
})

placeContentBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    placeCellDiv.style.placeContent = e.target.innerHTML.toLowerCase();
  })
})

// ERROR DE ASIGNACION

// const flexShrinkBtns = document.querySelectorAll('.flex-shrink-btn');

// document.querySelector('#height-control').addEventListener('input', (e) => {
//   hideAllInfo('.aditional-info');
//   // console.log(e.target.value);
//   const infoDiv = e.target.parentNode.previousSibling.previousSibling;
//   // console.log(infoDiv);
//   (infoDiv.classList.contains('disappear')) ?  infoDiv.classList.remove('disappear') : null
//     infoDiv.classList.add('appear');
//   infoDiv.children[0].children[0].innerHTML = showMessages('flex-shrink', 'info');
//   document.querySelector('.shrink-container').style.width = `${e.target.value}%`;
// })

// flexShrinkBtns.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     hideAllInfo('.aditional-info');
//     const targetDiv = parseInt(e.target.innerHTML);
//     const valuesDiv = document.querySelector('.values-container');

//     function removeSelectedBtns() {
//       const selectedBtns = document.querySelectorAll('.selected');

//       selectedBtns.forEach((selBtn) => {
//         if (selBtn.classList.contains('btn')) selBtn.classList.remove('selected')
//       });      
//     };

//     // const target = document.querySelector('.shrink-container').children[targetDiv -1];
//     // const asignedValue = window.getComputedStyle(target).getPropertyValue('flex-shrink');

//     function markAsignedValue(elem) {
//       const values = document.querySelectorAll('.flex-shrink-value');
//       values.forEach((value, index) => {
//         value.style.backgroundColor = '#d3d3d3'
//         if (index === elem -1) {
//           console.log(`Elemento asignado: ${index}`);
//         }
//       })

//     }
    
//     (e.target.classList.contains('selected')) ? (
//         e.target.classList.remove('selected'),
//         valuesDiv.style.opacity = '0',
//         valuesDiv.classList.remove('active')
//       ):( 
//         removeSelectedBtns(),
//         e.target.classList.add('selected'),
//         valuesDiv.style.opacity = '1',
//         markAsignedValue(parseInt(e.target.innerHTML)),
//         valuesDiv.classList.add('active')
//       )

//       const valuesBtns = valuesDiv.querySelectorAll('.flex-shrink-value');
//       valuesBtns.forEach((valueBtn) => {
//         valueBtn.addEventListener('click', (e) => {
//           let target = document.querySelector('.shrink-container').children[targetDiv -1];

//           if (valuesDiv.classList.contains('active')) {
//             const infoDiv = e.target.parentNode.parentNode.parentNode.children[0];
//             const value = e.target.innerHTML;
//             target.style.flexShrink = value;
//             console.log(infoDiv);
//             hideAllInfo('.aditional-info');
//             (infoDiv.classList.contains('disappear')) ?  infoDiv.classList.remove('disappear') : null
//             infoDiv.classList.add('appear');
//             infoDiv.children[0].children[0].innerHTML = showMessages('flex-shrink', `${value}`);
//           }
//         })
//       })

//   });
// });
