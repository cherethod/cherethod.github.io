import { loadDefaultCategories } from './functions.js';

const Desktop = {

    categories: loadDefaultCategories(),
    desktopContainer: document.querySelector('#desktopContainer'),

    showAllCategories: function () {
        this.desktopContainer.innerHTML = '';
        let fragment = document.createDocumentFragment();
        for (const category in this.categories) {
            const categoryIconsTemplate = document.querySelector('#categoryIconsTemplate');
            const categoryIconNode = categoryIconsTemplate.content.cloneNode(true);
            categoryIconNode.querySelector('.icon__category--name').textContent = category;
            categoryIconNode.querySelector('.desktop__icon--category').addEventListener('click', (e)=> {
                this.showSubcategories(category)
            })
            fragment.appendChild(categoryIconNode);

            // console.log(category);
        }
        this.desktopContainer.appendChild(fragment);
    },
    showSubcategories: function (category) {
        this.desktopContainer.innerHTML = '';
        let fragment = document.createDocumentFragment();
        const subcategoryIconsTemplate = document.querySelector('#subcategoryIconsTemplate');
        const bactToBtn = document.querySelector('#backToBtn')
        const backToCategoriesContainer = bactToBtn.content.cloneNode(true);

        backToCategoriesContainer.querySelector('p').textContent = 'Back to categories';
        backToCategoriesContainer.querySelector('.desktop__back--icon').addEventListener('click', (e)=> {
            // console.log(e)
            this.showAllCategories();
        })
        // backToCategoriesContainer.classList.add('absolute', 'left-8', 'top-12', 'bg-blue-300', 'hover:cursor-pointer');
        fragment.appendChild(backToCategoriesContainer);
      
        for (const subcategory in this.categories[category]) {
          const subcategoryIconNode = subcategoryIconsTemplate.content.cloneNode(true);
          subcategoryIconNode.querySelector('.icon__subcategory--name').textContent = subcategory;
          subcategoryIconNode.querySelector('.desktop__icon--subcategory').addEventListener('click', (e)=> {
            this.showMarkers(category, subcategory);
          })
        //   console.log(subcategory);
          fragment.appendChild(subcategoryIconNode);
        }
      
        this.desktopContainer.appendChild(fragment);
      },
      showMarkers: function (category, subcategory) {
        this.desktopContainer.innerHTML = '';
        let fragment = document.createDocumentFragment();
        const markerIconsTemplate = document.querySelector('#markerIconsTemplate');
        const bactToBtn = document.querySelector('#backToBtn')
        const backToSubcategoriesContainer = bactToBtn.content.cloneNode(true);
        backToSubcategoriesContainer.querySelector('p').textContent = `Back to ${subcategory}`;
        backToSubcategoriesContainer.querySelector('.desktop__back--icon').addEventListener('click', (e)=> {
            // console.log(e)
            this.showSubcategories(category);
        })
        // const backToSubategoryContainer = document.createElement('div');
        // backToSubategoryContainer.textContent = `Back to ${subcategory}`;
        // backToSubategoryContainer.classList.add('absolute', 'left-8', 'top-12');
        fragment.appendChild(backToSubcategoriesContainer);
        for (const marker of this.categories[category][subcategory]) {
            // console.log(marker)
            const markerIconNode = markerIconsTemplate.content.cloneNode(true);
            let markerLink = markerIconNode.querySelector('.icon__marker--name');
            markerLink.children[1].textContent = marker.name;
            markerLink.children[0].children[0].setAttribute('xlink:href', `./img/Icons/icons.svg#${marker.icon}`);
            markerLink.setAttribute('title', `${marker.description}`);
            markerLink.href = marker.URL;
            console.log(marker);
            // markerLink.setAttribute('target', '_blank')
            fragment.appendChild(markerIconNode);
        }
        this.desktopContainer.appendChild(fragment);

      }
};

export default Desktop;