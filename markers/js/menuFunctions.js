
'use strict'
import { activeIconSelector } from './iconSelector.js';
import { sidebarListeners, toggleSidebarPosition } from './sidebar.js'
import { loadDefaultCategories } from './functions.js';
import { searcherListeners} from './searcher.js';
import { deleteEntryWarning, customWarning, understoodWarning } from './alerts.js';
import { setInputActive, categoryElement,  resetEntryFormValues, loadEntries, managementListeners} from './manage-markers.js'
import { getCategory, showCategoryList, getSubCategory, addNewSubcategory, addNewCategory, manageCategoriesListeners } from './manage-categories.js'
import Desktop from './desktop.js';

Desktop.showAllCategories(); 


let categories = loadDefaultCategories();

const hideConfigContainers = () => {  
  document.getElementById('configCategoriesContainer').classList.remove('active');
  document.getElementById('configMarkersContainer').classList.remove('active');
  document.getElementById('importCustomMarkersContainer').classList.remove('active');
  //document.getElementById('dbConfigOptions').classList.remove('active');
}

const showDesktopContainer = ()=> {
  hideConfigContainers();
  document.querySelector('#dbContainer').classList.remove('active');
}


// JSON LOAD & SAVE
const downloadJSON = async (object, filename) => {
  const confirm = await customWarning('This action will download a file containing all the custom settings, categories, and markers you have edited or added. Are you sure you want to proceed?', 'Yes, download it', 'No, thanks');
  if (confirm) {
    const json = JSON.stringify(object);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    link.click();
  };
};

const importJSON = (file) => {
  const reader = new FileReader();

  reader.onload = async (e) => {
    const content = e.target.result;
    const importedCategories = JSON.parse(content);

    const confirm = await customWarning('Do you want import this custom categories / markers file?');
    if (confirm) {
      localStorage.setItem('customCategories', JSON.stringify(importedCategories));
    }
  };

  reader.readAsText(file);
};

//LISTENERS
const enableEntriesListeners = () => {

  manageCategoriesListeners();
  managementListeners();
  sidebarListeners();
  searcherListeners();
  /* Move sidebar to left */
  document.getElementById('posLeftSide').addEventListener('click', () => {
    toggleSidebarPosition('left');
  });

  /* Move sidebar to right */
  document.getElementById('posRightSide').addEventListener('click', () => {
    toggleSidebarPosition('right');
  });

  /* Deactive setting options menu on leave */
  
  // document.querySelector('#dbConfigNav').addEventListener('mouseleave', ()=>{
  //   if (document.querySelector('#dbConfigOptions').classList.contains('active')) document.querySelector('#dbConfigOptions').classList.remove('active')
  // });  
}
 /* Show options when config icon is pressed */
//  document.getElementById('configDB').addEventListener('click', () => {
//   document.getElementById('dbConfigOptions').classList.toggle('active');
//   // document.getElementById('dbContainer').classList.toggle('active');
// });

  /* Show edit categories container */
  document.getElementById('dbConfigOptions-editCategories').addEventListener('click', () => {
    hideConfigContainers();
    document.getElementById('configCategoriesContainer').classList.add('active');
    document.getElementById('dbContainer').classList.add('active');
  showCategoryList();
  });
  /* Show edit markers container */
  document.getElementById('dbConfigOptions-editMarkers').addEventListener('click', () => {
    hideConfigContainers();
    document.getElementById('dbContainer').classList.add('active');
    loadEntries();
    resetEntryFormValues();
    document.getElementById('configMarkersContainer').classList.add('active');
  });
  /* Show import custom settings container */
  document.getElementById('dbConfigOptions-importCustomSettings').addEventListener('click', () => {
    hideConfigContainers();
    document.getElementById('dbContainer').classList.add('active');
    document.getElementById('importCustomMarkersContainer').classList.add('active');
  });
 
 /* close all settings container
 document.getElementById('dbConfigOptions-closeSettings').addEventListener('click', () => {
  hideConfigContainers();
  showDesktopContainer();
});*/


  /* Import / Export settings block */
  document.getElementById('dbConfigOptions-exportCustomSettings').addEventListener('click', () => {
    categories = loadDefaultCategories();
    downloadJSON(categories, 'customMarkers.json');
  });

  dropBox.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropBox.addEventListener('drop', async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file.type === 'application/json') {
      importJSON(file);
    } else {
      await understoodWarning('Please drag a valid JSON file.');
    }
  });

  /* Import settings search file input function */
  document.getElementById('dropBoxFileInput').addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (file.type === 'application/json') {
        importJSON(file);
      } else {
        await understoodWarning('Please select a valid JSON file.');
      }
    });

    fileInput.click();
  });

/* Load base functions and set defaults values */
setInputActive(false);
categoryElement.appendChild(getCategory());

enableEntriesListeners();
activeIconSelector();
resetEntryFormValues();

loadEntries();
export {hideConfigContainers, showDesktopContainer}
