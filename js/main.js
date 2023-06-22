let categoryList = document.getElementById('sidebarMenu').querySelectorAll('.sidebar__link');
let searchBar = document.getElementById('sidebarSearch');
let container = document.getElementById('btnContainer');
let currentCategory = 'inicio';

let searchCheck = (e)=> {
  (e.keyCode==8 && searchBar.value.length==1) ? searchBar.setAttribute('list', '') : searchBar.setAttribute('list', 'icons')
  if (e.keyCode==46 && ((searchBar.selectionEnd-searchBar.selectionStart)===searchBar.value.length)) {
    searchBar.setAttribute('list','')
  } 
}

let createDataList = ()=> {
  let options = document.querySelectorAll('.sidebar__link');
  let fragment = document.createDocumentFragment();
 options.forEach(opt => {
  if (opt.parentNode.classList.contains('sidebar__submenu--item')) {
      let optionInput = document.createElement('OPTION');
      optionInput.setAttribute('value', opt.innerHTML);
    fragment.appendChild(optionInput)
  }
 })
 document.getElementById('icons').appendChild(fragment);
}


const cleanIcons = ()=>{
    if (container.childElementCount>0) {
      do { container.removeChild(container.children[0])
    } while (container.childElementCount>0);}
}
  

let createIcons = (id)=> {
  currentCategory=id;  
  cleanIcons();
  
  let list = (currentCategory !='sidebarMenu') ? document.getElementById(id).children[1] : document.getElementById('sidebarMenu');
   
   for (let i = (currentCategory!='sidebarMenu') ? 0 : 1; i < list.children.length; i++) {
      let element =  list.children[i].children[0]; 
      let fragment = document.createDocumentFragment();
      let icon = document.createElement('DIV');
      let link = document.createElement('A');
      let figure = document.createElement('FIGURE');
      let img = document.createElement('IMG');
      let text = document.createElement('P');

      figure.setAttribute('class', 'btn__picture');
      img.setAttribute('class', 'btn__image');
      img.src=`./img/${element.getAttribute('icon')}.png`;
      figure.appendChild(img);
      link.href=element.href;
      link.setAttribute('class', 'btn__link');
      link.appendChild(figure);
      text.setAttribute('class','btn__text');
      text.innerHTML=element.innerHTML;
      link.appendChild(text);
      icon.setAttribute('class', 'btn__container--icon');
      icon.appendChild(link);
      fragment.appendChild(icon);
      document.getElementById('btnContainer').appendChild(fragment);
    }    
}

let colapseCategorySubmenu = ()=> {
  categoryList.forEach(category => {
    if (category.parentNode.classList.contains('menu__category') && category.parentNode.classList.contains('active')) {
      category.parentNode.children[1].style.display='none';
      category.parentNode.classList.remove('active');
    }
  })
}

let toggleCategoryActive = (elem)=> {
    let parent = elem.target.parentNode
    if (parent.classList.contains('active')) {
        parent.classList.remove('active');
        parent.children[1].style.display='none';
        createIcons('sidebarMenu');
    } 
    else {
        colapseCategorySubmenu();
        parent.classList.add('active')
        parent.children[1].style.display='block';
        createIcons(parent.id);
    }
}

/* ******************************** */
/*            EVENTOS               */
/* ******************************** */


categoryList.forEach(category => {
  if (category.parentNode.classList.contains('menu__category')) {
    category.addEventListener('click', (e)=> {
        toggleCategoryActive(e);
    })
  }
})

searchBar.addEventListener('keydown', (e)=> searchCheck(e))
document.querySelector('.home__link').addEventListener('click', (e)=> {
  toggleCategoryActive(e);
})
createDataList();
createIcons('sidebarMenu')