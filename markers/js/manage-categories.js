// import { categories } from './menuFunctions.js';
// import { clearElement } from "./functions.js";
import { setInputActive, categoryElement, subcategoryElement, linkElement, resetEntryFormValues, loadEntries, hideConfigContainers, URLRegex, insertLink, managementListeners, isEditing, deleteBtnSVG } from "./manage-markers.js";
import { deleteEntryWarning, customWarning, understoodWarning } from './alerts.js';
// import { loadSidebarMenuData } from './sidebar.js';
import { loadSidebarMenuData } from './searcher.js';
import { clearElement, loadDefaultCategories } from './functions.js'
let categories = loadDefaultCategories();
const getCategory = () => {
    if (!isEditing) clearElement(categoryElement);
    const fragment = document.createDocumentFragment();
    let emptyOption = document.createElement('option');
    emptyOption.value = 'default';
    emptyOption.innerHTML = "Select category";
    emptyOption.disabled = true;
    fragment.appendChild(emptyOption);
    for (const category in categories) {
      let option = document.createElement('option');
      option.value = category;
      option.innerHTML = category;
      fragment.appendChild(option);
    }
    return fragment;
  
}  
const getSubCategory = (currentCategory) => {
  for (const category in categories) {
    if (category == currentCategory) {
      const subcategories = categories[category];
      if (!isEditing) clearElement(subcategoryElement);
      const fragment = document.createDocumentFragment();
      let emptyOption = document.createElement('option');
      emptyOption.value = 'default';
      emptyOption.innerHTML = "Select subcategory";
      emptyOption.disabled = true;
      fragment.appendChild(emptyOption);
      for (const subcategory in subcategories) {
        let option = document.createElement('option');
        option.value = subcategory;
        option.innerHTML = subcategory;
        fragment.appendChild(option);
      }
      return fragment;
    }
  }
}  
const selectCategoryItem = (e) => {
  const nodes = [...e.target.parentNode.children];
  const selectedNode = e.target.closest('.category__list--item');


  nodes.forEach(node => {
    if (node !== selectedNode.getAttribute('value') && node.classList.contains('selected')) {
      node.classList.remove('selected');
      node.classList.remove('category__list--item-selected');
    }
  });

  selectedNode.classList.add('selected');
  selectedNode.classList.add('category__list--item-selected');
  
  showSubcategoryList(selectedNode.getAttribute('value'));
};  
const showSubcategoryList = (categorySelected) => {
  const subcategoryContainer = document.querySelector('#subcategoriesList');
  if (subcategoryContainer.children.length > 0) {

    while (subcategoryContainer.children.length > 0) {

      subcategoryContainer.removeChild(subcategoryContainer.children[0]);
    }
  }
  for (const category in categories) {
    if (category == categorySelected) {
      const subcategories = categories[category];
      const fragment = document.createDocumentFragment();
      for (const subcategory in subcategories) {
        let item = document.createElement('p');
        item.innerHTML = subcategory;
        item.style.userSelect = 'none';
        item.classList.add('subcategory__list--item');
        item.setAttribute('value', subcategory)

        const deleteBtn = document.createElement('div');
        deleteBtn.innerHTML = deleteBtnSVG;
        deleteBtn.addEventListener('click', async (e) => {
          const subcategoryName = e.target.closest('.subcategory__list--item').getAttribute('value');
          const confirmed = await deleteEntryWarning('sub-category', subcategoryName);

          if (confirmed) {
            const categorySelectedName = document.querySelector(('.category__list--item-selected')).getAttribute('value');
            delete categories[categorySelectedName][subcategoryName]
            localStorage.setItem('customCategories', JSON.stringify(categories));
            e.target.closest('.subcategory-list').removeChild(e.target.closest('.subcategory__list--item'));
           loadEntries();
           loadSidebarMenuData();
          }
        });
        item.appendChild(deleteBtn);

        fragment.appendChild(item);
      }
      subcategoryContainer.appendChild(fragment)
    }

  }
}  
const showCategoryList = () => {
  const categoryContainer = document.querySelector('#categoriesList');
  categories = loadDefaultCategories();
  const fragment = document.createDocumentFragment();
  if (categoryContainer.children.length > 0) {
    while (categoryContainer.children.length > 0) {
      categoryContainer.removeChild(categoryContainer.children[0]);
    }
  }
  for (const categoryItem in categories) {
    const item = document.createElement('p');
    item.innerHTML = categoryItem;
    item.style.userSelect = 'none';
    item.classList.add('category__list--item');
    item.setAttribute('value', categoryItem)
    item.addEventListener('click', (e) => {
      selectCategoryItem(e);
    });
    const deleteBtn = document.createElement('div');
    deleteBtn.innerHTML = deleteBtnSVG;
    deleteBtn.addEventListener('click', async (e) => {
      categories = loadDefaultCategories();
      console.log(categories)
      const categoryName = e.target.closest('.category__list--item').getAttribute('value');
      const confirmed = await deleteEntryWarning('category', `${categoryName} (and all its sub-categories)`);
    
      if (confirmed) {
        delete categories[categoryName];
        localStorage.setItem('customCategories', JSON.stringify(categories));
        e.target.closest('.category-list').removeChild(e.target.closest('.category__list--item'));
        categories = loadDefaultCategories();
        console.log(categories)
        showSubcategoryList(categoryName);
        loadEntries();
        loadSidebarMenuData();
}
    });
    item.appendChild(deleteBtn);
    fragment.appendChild(item);
  }
  categoryContainer.appendChild(fragment);
} 
const addNewCategory = async (category) => {
  categories = loadDefaultCategories();
  // console.log(categories)
  if (categories.hasOwnProperty(category)) {
    await understoodWarning('A category with this name already exist');
  }
  else {
    categories[category] = {};
    localStorage.setItem('customCategories', JSON.stringify(categories));
    categories = loadDefaultCategories();
    categoryElement.appendChild(getCategory());
    showCategoryList();
    loadSidebarMenuData();
  }
}
const addNewSubcategory = async (category, subcategory) => {
  categories = loadDefaultCategories();
  if (categories[category].hasOwnProperty(subcategory)) {
    await understoodWarning('A aub-category with this name already exist');
  } else {
    categories[category][subcategory] = [];
    localStorage.setItem('customCategories', JSON.stringify(categories));
    categories = loadDefaultCategories();
    showSubcategoryList(category);
    loadSidebarMenuData();
  }
}  
const manageCategoriesListeners = () => {
    /* Edit categories - Input category listener on change option -> show sub-categories for current category. */
    categoryElement.addEventListener('change', (e) => {
        setInputActive(false);
        subcategoryElement.appendChild(getSubCategory(e.target.value));
        subcategoryElement.selectedIndex = 0;
    });
    /* Edit categories - Input sub-category listener on change option -> when category and sub-category are been selecteds enable link and description inputs. */
    subcategoryElement.addEventListener('change', (e) => {
        if (categoryElement.value != 'default' && subcategoryElement.value != 'default') setInputActive(true);
    });
    /* Edit categories - Call insert link function when button is pressed */
    document.getElementById('submitLink').addEventListener('click', () => {
        insertLink();
    });
    /* Edit markers - URL input real-time verification */
    linkElement.addEventListener('keyup', () => {
        URLRegex();
    });
      /* Call import new category in edit categories form */
  document.getElementById('newCategoryBtn').addEventListener('click', (e) => {
    const categoryInput = document.querySelector('#newCategoryInput');
    const addNewCategory = async (category) => {
      if (categories.hasOwnProperty(category)) {
        await understoodWarning('A category with this name already exist');
      }
      else {
        categories[category] = {};
        localStorage.setItem('customCategories', JSON.stringify(categories));
        categoryElement.appendChild(getCategory());
        showCategoryList();
        loadSidebarMenuData();
      }
    }
    if (categoryInput.value !== '') {
      addNewCategory(categoryInput.value);
      categoryInput.value = '';
    }
    else {
      understoodWarning('To add a new category, you must enter the name in order to add it')
    }
  });
    /* Call import new sub-category in edit categories form */
    document.getElementById('newSubcategoryBtn').addEventListener('click', async (e) => {
        const subcategoryInput = document.querySelector('#newSubcategoryInput');
        const categorySelected = document.querySelector(('.category__list--item-selected'));
        if (categorySelected !== null) {
            if (subcategoryInput.value !== '') {
                addNewSubcategory(categorySelected.getAttribute('value'), subcategoryInput.value);
                subcategoryInput.value = '';
            }
            else {
                understoodWarning('To add a new sub-category, you must enter the name in order to add it')
            }
        } else {
            await understoodWarning('To add a new sub-category, you must first select a parent category in order to add it.');
        }
    });
}

export {getCategory, showCategoryList, getSubCategory, addNewSubcategory, addNewCategory, manageCategoriesListeners}