const toggleBurgerMenu = () => {
    const burgerMenuIcon = document.querySelector('.burger__icon--svg');
    const burgerMenuContainer = document.querySelector('.burgermenu__list--container');
    const isActive = burgerMenuContainer.classList.toggle('active');
  
    burgerMenuIcon.src = isActive ? './img/close-btn-wine.svg' : './img/burgerMenu-icon-wine.svg';
  };
  
  const initBurgerMenu = () => {
    const burgerMenuIcon = document.querySelector('.burger__icon--svg');
    burgerMenuIcon.addEventListener('click', toggleBurgerMenu);
  };
  
  document.addEventListener('DOMContentLoaded', initBurgerMenu);