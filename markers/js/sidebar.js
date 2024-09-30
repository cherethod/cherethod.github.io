import { clearElement, loadDefaultCategories  } from './functions.js';
import {loadSidebarMenuData, searcherListeners} from './searcher.js';
import {hideConfigContainers, showDesktopContainer} from './menuFunctions.js'
// import { setInputActive, categoryElement, subcategoryElement, linkElement, resetEntryFormValues, loadEntries, hideConfigContainers, URLRegex, insertLink, managementListeners, isEditing, deleteBtnSVG } from "./manage-markers.js";
const sideBar = document.querySelector('#contentContainer').children[0];
const extensionSideBar = document.querySelector('#sidebar-extension');
const sidebarElements = document.querySelectorAll('.sidebar__btn');
const matchedResultsList = document.querySelector('#matchedResultsList');
const searchFilterMenu = document.getElementById('searchFilters');

const contentContainer = document.querySelector('#contentContainer');

// SIDEBAR FUCNCTIONS


const toggleSidebarContent = (id) => {
    const sidebarExtensions = document.querySelector('#sidebar-extension');
    for (let i=0; i < sidebarExtensions.children.length; i++) {
      const elem = sidebarExtensions.children[i];
        if (elem.classList.contains('active')) elem.classList.remove('active');
    }
  
  
      switch (id) {
        case 'filesBtn1':
          return '.sidebar__nav--container';
        case 'filesBtn2':
          return '.sidebar__searcher--container';
        case 'filesBtn3':
          return '.sidebar__extensions--container';
        case 'filesBtnCfg':
          return '.sidebar__config--container';
        default:
          return '';
      }
};

const toggleSidebarPosition = (side) => {
  if (side === 'left') {
    if (contentContainer.classList.contains('right')) contentContainer.classList.remove('right');
    contentContainer.classList.add('left');
  }
  if (side === 'right') {
    if (contentContainer.classList.contains('left')) contentContainer.classList.remove('left');
    contentContainer.classList.add('right');
  }
}
const removeSideBarActiveBtn = () => {
    for (let i = 0; i < sidebarElements.length; i++) {
      const element = sidebarElements[i];
      if (element.classList.contains('active')) {
        element.classList.remove('active');
        element.style.border = 'none';
      }
    }
};  
const sidebarListeners = () => {
  const sidebarElements = document.querySelectorAll('.sidebar__btn');

  sidebarElements.forEach(sidebarbtn => {
    sidebarbtn.addEventListener('click', (e) => {
        const parentContainer = e.target.closest('.sidebar__btn');
        if (document.querySelector('#filesBtnCfg').classList.contains('active')) showDesktopContainer();
        if (parentContainer.classList.contains('active')) {          
        parentContainer.classList.remove('active');
      
        document.querySelector(toggleSidebarContent(parentContainer.id)).classList.remove('active')
        // parentContainer.style.border = 'none';
        document.getElementById('sidebar-extension').style.width = '0px';
        // toggleSidebarContent(e);
        } else {
        removeSideBarActiveBtn();
        parentContainer.classList.add('active');
        document.querySelector(toggleSidebarContent(parentContainer.id)).classList.add('active')
        // parentContainer.style.borderLeft = '2px solid blue';
        document.getElementById('sidebar-extension').style.width = '250px';
        // toggleSidebarContent(e);
        }
    });
    });

 

}

loadSidebarMenuData();

export { toggleSidebarContent, removeSideBarActiveBtn, sideBar, sidebarListeners, toggleSidebarPosition, searchFilterMenu  }