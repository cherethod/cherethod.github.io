import { loadDefaultCategories } from './menuFunctions.js';

if (localStorage.getItem('customCategories') === null) {
  loadDefaultCategories();
 }
 else {
   categories = JSON.parse(localStorage.getItem('customCategories'))
 }
// SIDEBAR FUCNCTIONS
export const loadSidebarMenuData = () => {
    clearElement(sidebarNavContainer);
    const fragment = document.createDocumentFragment();
    for (const category in categories) {
      let ulElem = document.createElement('ul');
      ulElem.classList.add('sidebar__category--list');
      ulElem.addEventListener('click', (e) => {
        const sidebarCategories = document.querySelectorAll('.sidebar__category--list');
        const clickedCategory = e.target.closest('.sidebar__category--list');
  
        sidebarCategories.forEach(sidebarCategory => {
          if (sidebarCategory !== clickedCategory && sidebarCategory.classList.contains('active')) {
            sidebarCategory.classList.remove('active');
          }
        });
  
        (!clickedCategory.classList.contains('active')) ? clickedCategory.classList.add('active') : clickedCategory.classList.remove('active');
      });
      let categoryTitle = document.createElement('div');
      categoryTitle.classList.add('sidebar__collapse--svg');
      categoryTitle.innerHTML = extendMenuSVG;
      let categoryName = document.createElement('p');
      categoryName.textContent = category;
      categoryTitle.appendChild(categoryName);
      ulElem.appendChild(categoryTitle);
      let subcategoriesContainer = document.createElement('div');
      subcategoriesContainer.classList.add('sidebar__subcategory--container');
      ulElem.appendChild(subcategoriesContainer);
      const subcategories = categories[category];
      for (const subcategory in subcategories) {
        let subcategoryItem = document.createElement('li');
        subcategoryItem.classList.add('sidebar__subcategory--list');
        subcategoryItem.addEventListener('click', (e) => {
          const sidebarSubcategories = document.querySelectorAll('.sidebar__subcategory--list');
  
          e.stopPropagation(); // Evitar la propagación del evento al elemento padre (categoría) - Gracias ChatGPT :P
  
          const clickedSubcategory = e.target.closest('.sidebar__subcategory--list');
  
          sidebarSubcategories.forEach(sidebarSubcategory => {
            if (sidebarSubcategory !== clickedSubcategory && sidebarSubcategory.classList.contains('active')) {
              sidebarSubcategory.classList.remove('active');
            }
          });
  
          (!clickedSubcategory.classList.contains('active')) ? clickedSubcategory.classList.add('active') : clickedSubcategory.classList.remove('active');
        });
        let subcategoryTitle = document.createElement('div');
        subcategoryTitle.classList.add('sidebar__collapse--svg')
        subcategoryTitle.innerHTML = extendMenuSVG;
        let subcategoryName = document.createElement('p');
        subcategoryName.textContent = subcategory;
        subcategoryTitle.appendChild(subcategoryName);
        subcategoryItem.appendChild(subcategoryTitle);
        let markersList = document.createElement('ul');
        markersList.classList.add('sidebar__markers--list');
        const markers = subcategories[subcategory];
        for (const marker of markers) {
          let markerItem = document.createElement('li');
          markerItem.classList.add('sidebar__marker--item');
          let markerLink = document.createElement('a');
          markerLink.href = marker.URL;
          markerLink.setAttribute('target', '_blank');
          markerLink.textContent = marker.name;
          markerItem.appendChild(markerLink);
          markersList.appendChild(markerItem);
        }
        subcategoryItem.appendChild(markersList);
        subcategoriesContainer.appendChild(subcategoryItem);
      }
      fragment.appendChild(ulElem);
      // addMarkerItemsListeners();
    }
    return fragment;
  }
  
  const searchMarkers = (query)=> {
    query = query.toLowerCase();
    const results = [];
  
    for (const category in categories) {
      for (const subcategory in categories[category]) {
        const elements = categories[category][subcategory];
        const matchedElements = elements.filter((element) => {
          return (
            category.toLocaleLowerCase().includes(query) ||
            subcategory.toLocaleLowerCase().includes(query) ||
            element.name.toLocaleLowerCase().includes(query) ||
            element.description.toLocaleLowerCase().includes(query) ||
            element.URL.toLocaleLowerCase().includes(query) 
          )
        });
        if (matchedElements.length > 0) {
          results.push({
            category, 
            subcategory,
            elements: matchedElements,
          });
        };
      };
    };
    return results;
  };
  
  const showMatchedResults = (results)=> {
    const matchedResultsList = document.querySelector('#matchedResultsList');
    matchedResultsList.innerHTML = '';
  
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const matchItem = document.createElement('li');
      matchItem.textContent = `Category: ${result.category} > Subcategory: ${result.subcategory}.`;
      fragment.appendChild(matchItem);
      result.elements.forEach((match) => {
        const matchedMarker = document.createElement('li');
        matchedMarker.textContent = `Name: ${match.name}, Description: ${match.description}, URL: ${match.URL}`
        fragment.appendChild(matchedMarker);    
      });
    });
    matchedResultsList.appendChild(fragment);
  }
  
  
  document.querySelector('#searchToolInput').addEventListener('input', (e)=> {
    if (e.target.value.length > 0) {
      const query = e.target.value;
      const results = searchMarkers(query);
      showMatchedResults(results);
  
    }
  });

// export { loadSidebarMenuData, searchMarkers, showMatchedResults };