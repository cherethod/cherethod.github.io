import { clearElement, loadDefaultCategories } from './functions.js';
import { toggleSidebarContent, removeSideBarActiveBtn, sideBar, sidebarListeners, toggleSidebarPosition, searchFilterMenu } from './sidebar.js'
const sidebarNavContainer = document.querySelector('.sidebar__nav--container');
const extendMenuSVG = `<svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><title>Extend/Collapse icon</title><g id='Icon' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Arrow' transform='translate(-240.000000, -194.000000)'><g id='right_small_line' transform='translate(240.000000, 194.000000)'><path d='M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5935,23.2578 L12.5819,23.2595 L12.5109,23.295 L12.4919,23.2987 L12.4767,23.295 L12.4057,23.2595 C12.3958,23.2564 12.387,23.259 12.3821,23.2649 L12.378,23.2758 L12.3609,23.7031 L12.3659,23.7235 L12.3769,23.7357 L12.4805,23.8097 L12.4953,23.8136 L12.5071,23.8097 L12.6107,23.7357 L12.6233,23.7197 L12.6267,23.7031 L12.6096,23.2758 C12.6076,23.2657 12.601,23.2593 12.5935,23.2578 Z M12.8584,23.1453 L12.8445,23.1473 L12.6598,23.2397 L12.6499,23.2499 L12.6472,23.2611 L12.6651,23.6906 L12.6699,23.7034 L12.6784,23.7105 L12.8793,23.8032 C12.8914,23.8069 12.9022,23.803 12.9078,23.7952 L12.9118,23.7812 L12.8777,23.1665 C12.8753,23.1546 12.8674,23.147 12.8584,23.1453 Z M12.143,23.1473 C12.1332,23.1424 12.1222,23.1453 12.1156,23.1526 L12.1099,23.1665 L12.0758,23.7812 C12.0751,23.7927 12.0828,23.8019 12.0926,23.8046 L12.1083,23.8032 L12.3092,23.7105 L12.3186,23.7024 L12.3225,23.6906 L12.3404,23.2611 L12.3372,23.2485 L12.3278,23.2397 L12.143,23.1473 Z' fill-rule='nonzero'></path><path d='M10.2928,8.46452 C9.90231,8.85505 9.90231,9.48821 10.2928,9.87874 L12.4142,12.0001 L10.2928,14.1214 C9.90231,14.5119 9.90231,15.1451 10.2928,15.5356 C10.6834,15.9261 11.3165,15.9261 11.707,15.5356 L14.5355,12.7072 C14.926,12.3166 14.926,11.6835 14.5355,11.293 L11.707,8.46452 C11.3165,8.074 10.6834,8.074 10.2928,8.46452 Z' fill='currentColor'></path></g></g></g></svg>`;
const searchFilterSettings = document.getElementById('filterSettings');
   
let categories = loadDefaultCategories();

const getSelectedFilters = () => {
    const filters = searchFilterSettings.querySelectorAll('input');
    const selectedFilters = [];
    filters.forEach((filter) => {
        if (filter.checked) {
            selectedFilters.push(filter.value.split('-')[1]);
        }
    })
    return selectedFilters;
}

let selectedFilters = getSelectedFilters();

const loadSidebarMenuData = () => {
    categories = loadDefaultCategories();
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
    sidebarNavContainer.appendChild(fragment);
  }
  
const searchMarkers = (query)=> {
query = query.toLowerCase();
// const selectedFilters = getSelectedFilters();
// console.log(selectedFilters)
const results = [];

for (const category in categories) {
    for (const subcategory in categories[category]) {
    const elements = categories[category][subcategory];
    const matchedElements = elements.filter((element) => {
        if (selectedFilters.includes('all')) {
        return (
            category.toLocaleLowerCase().includes(query) ||
            subcategory.toLocaleLowerCase().includes(query) ||
            element.name.toLocaleLowerCase().includes(query) ||
            element.description.toLocaleLowerCase().includes(query) ||
            element.URL.toLocaleLowerCase().includes(query) 
            )
        } else {
        const filterMatched =
            selectedFilters.includes('category') && category.toLowerCase().includes(query);
        const subcategoryMatched =
            selectedFilters.includes('subcategory') && subcategory.toLowerCase().includes(query);
        const nameMatched =
            selectedFilters.includes('name') && element.name.toLowerCase().includes(query);
        const descriptionMatched =
            selectedFilters.includes('description') &&
            element.description.toLowerCase().includes(query);
        const urlMatched = selectedFilters.includes('url') && element.URL.toLowerCase().includes(query);

        return filterMatched || subcategoryMatched || nameMatched || descriptionMatched || urlMatched;
        }
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

const showMatchedResults = (results) => {
    matchedResultsList.innerHTML = '';

    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
        const categoryTemplate = document.getElementById('matchedCategoryTemplate');
        const categoryNode = categoryTemplate.content.cloneNode(true);
        const categoryName = categoryNode.querySelector('.result__category--name');
        categoryName.textContent = result.category;

        const subcategoriesContainer = document.createElement('div');

        result.elements.forEach((match) => {
            const markerTemplate = document.getElementById('matchedItemTemplate');
            const markerNode = markerTemplate.content.cloneNode(true);
            const markerlink = markerNode.querySelector('.result__item--link');
            let content = '';
            content = match.name;
            /* temporal disabled */
            // if (selectedFilters.includes('all') || selectedFilters.includes('name')) {
            //   content += `${match.name}`;
            // }
      
            // if (selectedFilters.includes('all') || selectedFilters.includes('description')) {
            //   content += `${match.description}`;
            // }
      
            // if (selectedFilters.includes('all') || selectedFilters.includes('url')) {
            //   content += `${match.URL}`;
            // }
            markerlink.textContent = content;
            markerlink.href = match.URL;
            markerlink.description = match.description;
            markerlink.title = match.description;
            subcategoriesContainer.appendChild(markerNode);
        });

        const counter = categoryNode.querySelector('span');
        const itemsFound = result.elements.length;
        if (itemsFound > 0) {
        counter.textContent = itemsFound;
        }

        fragment.appendChild(categoryNode);
        fragment.appendChild(subcategoriesContainer);
    });

    matchedResultsList.appendChild(fragment);
};

const searcherListeners = () => {
    document.querySelector('#searchToolInput').addEventListener('input', (e)=> {
        if (e.target.value.length > 0) {
            const query = e.target.value;
            const results = searchMarkers(query);
            if (searchFilterMenu.classList.contains('active')) searchFilterMenu.classList.remove('active');
            selectedFilters = getSelectedFilters();
            showMatchedResults(results);        
        }
    });

    const filterOptions = searchFilterSettings.querySelectorAll('input');
  filterOptions.forEach((option) => {
    option.addEventListener('change', () => {
      const query = document.querySelector('#searchToolInput').value;
      const results = searchMarkers(query);
      selectedFilters = getSelectedFilters(); 
      showMatchedResults(results);
    });
  });

  searchFilterMenu.addEventListener('click', (e) => {
    const filterMenu = e.target.closest('#searchFilters');

    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SPAN' && e.target.tagName !== 'LABEL' && e.target.id !== 'filterMenu') {
      filterMenu.classList.toggle('active');
    }

    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SPAN' || e.target.tagName === 'LABEL') {
      const searchFilterOptions = searchFilterSettings.querySelectorAll('input');
      searchFilterOptions.forEach((option) => {
        if (e.target.value === 'filter-all' && option.value !== 'filter-all') {
          option.checked = false;
        } else if (e.target.value !== 'filter-all' && option.value === 'filter-all') {
          option.checked = false;
        }
      });

      selectedFilters = getSelectedFilters(); 
      const query = document.querySelector('#searchToolInput').value;
      const results = searchMarkers(query);
      showMatchedResults(results);
    }
  });

    // searchFilterMenu.addEventListener('click', (e)=> {
        
    //     const filterMenu = e.target.closest('#searchFilters');
    //     // console.log(e);
    //     if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SPAN' && e.target.tagName !== 'LABEL' && e.target.id !== 'filterMenu') {
    //         filterMenu.classList.toggle('active');
    //     }
    //     if (e.target.tagName === 'INPUT' || e.target.tagName === 'SPAN' || e.target.tagName === 'LABEL') {
    //         const searchFilterOptions = searchFilterSettings.querySelectorAll('input');
    //         searchFilterOptions.forEach((option) => {
    //             if (e.target.value === 'filter-all' && option.value !== 'filter-all') {
    //                 option.checked = false;
    //             }
    //             else if (e.target.value !== 'filter-all' && option.value ==='filter-all') {
    //                 option.checked = false;
    //             }
    //         })
    //         selectedFilters = getSelectedFilters();
    //     }
    // })
}

export {loadSidebarMenuData, searcherListeners}