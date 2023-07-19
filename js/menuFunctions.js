'use strict'
import Swal from 'sweetalert2';
import { activeIconSelector } from './iconSelector.js';

const nameElement = document.querySelector('#markernameInput');
const categoryElement = document.querySelector('#categoryInput');
const subcategoryElement = document.querySelector('#subcategoryInput');
const linkElement = document.querySelector('#linkInput');
const descriptionElement = document.querySelector('#descriptionInput');
const iconBtnSVG = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Change icon</title><path d="M13 21H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16l7-3 5.5 2.5M16 10a2 2 0 110-4 2 2 0 010 4zM16 19h3m3 0h-3m0 0v-3m0 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
const editBtnSVG = `<svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Edit marker</title><path d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const deleteBtnSVG = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Delete marker</title><path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const saveBtnSVG = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Save marker</title><path d="M3 7.5V5a2 2 0 012-2h11.172a2 2 0 011.414.586l2.828 2.828A2 2 0 0121 7.828V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.5M6 21v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 21v-7.4a.6.6 0 00-.6-.6H15M16 3v5.4a.6.6 0 01-.6.6h-1.9M8 3v3M1 12h11m0 0L9 9m3 3l-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const extendMenuSVG = `<svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><title>Extend/Collapse icon</title><g id='Icon' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Arrow' transform='translate(-240.000000, -194.000000)'><g id='right_small_line' transform='translate(240.000000, 194.000000)'><path d='M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5935,23.2578 L12.5819,23.2595 L12.5109,23.295 L12.4919,23.2987 L12.4767,23.295 L12.4057,23.2595 C12.3958,23.2564 12.387,23.259 12.3821,23.2649 L12.378,23.2758 L12.3609,23.7031 L12.3659,23.7235 L12.3769,23.7357 L12.4805,23.8097 L12.4953,23.8136 L12.5071,23.8097 L12.6107,23.7357 L12.6233,23.7197 L12.6267,23.7031 L12.6096,23.2758 C12.6076,23.2657 12.601,23.2593 12.5935,23.2578 Z M12.8584,23.1453 L12.8445,23.1473 L12.6598,23.2397 L12.6499,23.2499 L12.6472,23.2611 L12.6651,23.6906 L12.6699,23.7034 L12.6784,23.7105 L12.8793,23.8032 C12.8914,23.8069 12.9022,23.803 12.9078,23.7952 L12.9118,23.7812 L12.8777,23.1665 C12.8753,23.1546 12.8674,23.147 12.8584,23.1453 Z M12.143,23.1473 C12.1332,23.1424 12.1222,23.1453 12.1156,23.1526 L12.1099,23.1665 L12.0758,23.7812 C12.0751,23.7927 12.0828,23.8019 12.0926,23.8046 L12.1083,23.8032 L12.3092,23.7105 L12.3186,23.7024 L12.3225,23.6906 L12.3404,23.2611 L12.3372,23.2485 L12.3278,23.2397 L12.143,23.1473 Z' fill-rule='nonzero'></path><path d='M10.2928,8.46452 C9.90231,8.85505 9.90231,9.48821 10.2928,9.87874 L12.4142,12.0001 L10.2928,14.1214 C9.90231,14.5119 9.90231,15.1451 10.2928,15.5356 C10.6834,15.9261 11.3165,15.9261 11.707,15.5356 L14.5355,12.7072 C14.926,12.3166 14.926,11.6835 14.5355,11.293 L11.707,8.46452 C11.3165,8.074 10.6834,8.074 10.2928,8.46452 Z' fill='currentColor'></path></g></g></g></svg>`;
const astroClass = 'astro-FDMGHVX6';
const dropBox = document.querySelector('#dropBox');
const contentContainer = document.querySelector('#contentContainer');
const sideBar = document.querySelector('#contentContainer').children[0];
const extensionSideBar = document.querySelector('#sidebar-extension');
const sidebarNavContainer = document.querySelector('.sidebar__nav--container');
const sidebarElements = document.querySelectorAll('.sidebar__btn');

let isEditing = false;
let editNode = null;
let changeIconActived = false;
export let categories = {};
let selectedIconToChange;

const loadDefaultCategories = ()=> {
  categories = {
    "CSS and Styles": {
      "Icons": [
        {
          "name": "Icon 1",
          "description": "Icon 1",
          "URL": "https://example.com/icon1",
          "icon": "css3"
        },
        {
          "name": "Icon 2",
          "description": "Icon 2",
          "URL": "https://example.com/icon2",
          "icon": "typescript"
        }
      ],
      "Gradients": [
        {
          "name": "Gradient 1",
          "description": "Gradient 1",
          "URL": "https://example.com/gradient1",
          "icon": "vuedotjs"
        },
        {
          "name": "Gradient 2",
          "description": "Gradient 2",
          "URL": "https://example.com/gradient2",
          "icon": "android"
        }
      ],
      "Clip and patterns": [
        {
          "name": "Clip 1",
          "description": "Clip 1",
          "URL": "https://example.com/clip1",
          "icon": "git"
        },
        {
          "name": "Clip 2",
          "description": "Clip 2",
          "URL": "https://example.com/clip2",
          "icon": "dashboard-dots"
        }
      ],
      "Color combinations": [
        {
          "name": "Combination 1",
          "description": "Combination 1",
          "URL": "https://example.com/combination1",
          "icon": "palette"
        },
        {
          "name": "Combination 2",
          "description": "Combination 2",
          "URL": "https://example.com/combination2",
          "icon": "git-fork"
        }
      ],
      "Shapes": [
        {
          "name": "Shape 1",
          "description": "Shape 1",
          "URL": "https://example.com/shape1",
          "icon": "language"
        },
        {
          "name": "Shape 2",
          "description": "Shape 2",
          "URL": "https://example.com/shape2",
          "icon": "puzzle"
        }
      ],
      "Fonts combination": [
        {
          "name": "Font combination 1",
          "description": "Font combination 1",
          "URL": "https://example.com/font-combination1",
          "icon": "cpu"
        },
        {
          "name": "Font combination 2",
          "description": "Font combination 2",
          "URL": "https://example.com/font-combination2",
          "icon": "book-stack"
        }
      ],
      "Loaders and Animations": [
        {
          "name": "Loader 1",
          "description": "Loader 1",
          "URL": "https://example.com/loader1",
          "icon": "screenshot"
        },
        {
          "name": "Loader 2",
          "description": "Loader 2",
          "URL": "https://example.com/loader2",
          "icon": "cloud-upload"
        }
      ]
    },
    "Generators": {
      "CSS": [
        {
          "name": "CSS Generator 1",
          "description": "CSS Generator 1",
          "URL": "https://example.com/css-generator1",
          "icon": "git"
        },
        {
          "name": "CSS Generator 2",
          "description": "CSS Generator 2",
          "URL": "https://example.com/css-generator2",
          "icon": "react"
        }
      ]
    },
    "Converters and tools": {
      "Images and video": [
        {
          "name": "Image 1",
          "description": "Image 1",
          "URL": "https://example.com/image1",
          "icon": "html5"
        },
        {
          "name": "Image 2",
          "description": "Image 2",
          "URL": "https://example.com/image2",
          "icon": "git"
        }
      ],
      "Multi tools": [
        {
          "name": "Tool 1",
          "description": "Tool 1",
          "URL": "https://example.com/tool1",
          "icon": "github"
        },
        {
          "name": "Tool 2",
          "description": "Tool 2",
          "URL": "https://example.com/tool2",
          "icon": "check-window"
        }
      ],
      "Find in web": [
        {
          "name": "Find 1",
          "description": "Find 1",
          "URL": "https://example.com/find1",
          "icon": "palette"
        },
        {
          "name": "Find 2",
          "description": "Find 2",
          "URL": "https://example.com/find2",
          "icon": "language"
        }
      ],
      "Web Design": [
        {
          "name": "Design 1",
          "description": "Design 1",
          "URL": "https://example.com/design1",
          "icon": "android"
        },
        {
          "name": "Design 2",
          "description": "Design 2",
          "URL": "https://example.com/design2",
          "icon": "github"
        }
      ]
    },
    "Tutorials and Exercises": {
      "Manuals": [
        {
          "name": "Manual 1",
          "description": "Manual 1",
          "URL": "https://example.com/manual1",
          "icon": "javascript"
        },
        {
          "name": "Manual 2",
          "description": "Manual 2",
          "URL": "https://example.com/manual2",
          "icon": "cplusplus"
        }
      ],
      "Logic Exercises": [
        {
          "name": "Logic exercise 1",
          "description": "Logic exercise 1",
          "URL": "https://example.com/logic-exercise1",
          "icon": "git"
        },
        {
          "name": "Logic exercise 2",
          "description": "Logic exercise 2",
          "URL": "https://example.com/logic-exercise2",
          "icon": "react"
        }
      ],
      "Game Exercises": [
        {
          "name": "Game exercise 1",
          "description": "Game exercise 1",
          "URL": "https://example.com/game-exercise1",
          "icon": "git"
        },
        {
          "name": "Game exercise 2",
          "description": "Game exercise 2",
          "URL": "https://example.com/game-exercise2",
          "icon": "react"
        }
      ]
    },
    "Libraries and Collections": {
      "Examples and Inspiration": [
        {
          "name": "Example 1",
          "description": "Example 1",
          "URL": "https://example.com/example1",
          "icon": "typescript"
        },
        {
          "name": "Example 2",
          "description": "Example 2",
          "URL": "https://example.com/example2",
          "icon": "git"
        }
      ]
    },
    "SEO and Accessibility": {
      "Access check": [
        {
          "name": "Check 1",
          "description": "Check 1",
          "URL": "https://example.com/check1",
          "icon": "html5"
        },
        {
          "name": "Check 2",
          "description": "Check 2",
          "URL": "https://example.com/check2",
          "icon": "javascript"
        }
      ]
    }
  }  
}

if (localStorage.getItem('customCategories') === null) {
 loadDefaultCategories();
}
else {
  categories = JSON.parse(localStorage.getItem('customCategories'))
}


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
      // Add more cases for other buttons if needed
      default:
        return '';
    }
  };

const removeSideBarActiveBtn = () => {
  for (let i = 0; i < sidebarElements.length; i++) {
    const element = sidebarElements[i];
    if (element.classList.contains('active')) {
      element.classList.remove('active');
      element.style.border = 'none';
    }
  }
};

sidebarElements.forEach(sidebarbtn => {
  sidebarbtn.addEventListener('click', (e) => {
    const parentContainer = e.target.closest('.sidebar__btn');
    if (parentContainer.classList.contains('active')) {
      parentContainer.classList.remove('active');
      
      document.querySelector(toggleSidebarContent(parentContainer.id)).classList.remove('active')
      parentContainer.style.border = 'none';
      document.getElementById('sidebar-extension').style.width = '0px';
      // toggleSidebarContent(e);
    } else {
      removeSideBarActiveBtn();
      parentContainer.classList.add('active');
      document.querySelector(toggleSidebarContent(parentContainer.id)).classList.add('active')
      parentContainer.style.borderLeft = '2px solid blue';
      document.getElementById('sidebar-extension').style.width = '250px';
      // toggleSidebarContent(e);
    }
  });
});


// const toggleSidebarContent = (e) => {
//   let buttonId = e.target.closest('.sidebar__btn');
//   switch (buttonId.id) {
//     case 'filesBtn1': (buttonId.classList.contains('active')) ? sidebarNavContainer.classList.add('active') : sidebarNavContainer.classList.remove('active')
//   }
// }
// const removeSideBarActiveBtn = () => {
//   for (let i = 0; i < sidebarElements.length; i++) {
//     const element = sidebarElements[i];
//     if (element.classList.contains('active')) {
//       element.classList.remove('active');
//       element.style.border = 'none';
//     }
//   }
// }

// sidebarElements.forEach(sidebarbtn => {
//   sidebarbtn.addEventListener('click', (e) => {
//     const parentContainer = e.target.closest('.sidebar__btn');
//     (parentContainer.classList.contains('active')) ? (
//       parentContainer.classList.remove('active'),
//       parentContainer.style.border = 'none',
//       document.getElementById('sidebar-extension').style.width = '0px',
//       toggleSidebarContent(e)
//       // clearElement(extensionSideBar)

//     ) : (
//       removeSideBarActiveBtn(),
//       parentContainer.classList.add('active'),
//       parentContainer.style.borderLeft = '2px solid blue',
//       document.getElementById('sidebar-extension').style.width = '250px',
//       toggleSidebarContent(e)
//     )
//   })
// })

const clearElement = (parentElement) => {
  while (parentElement.children.length > 0) {
    parentElement.removeChild(parentElement.children[0]);
  }
}

const searchAvailableID = () => {
  const entries = document.querySelectorAll('.result__entry');
  for (let i = 1; ; i++) {
    let idAvailable = true;

    for (let entry of entries) {
      let idValue = Number(entry.id.split('-')[1]);
      if (idValue === i) {
        idAvailable = false;
        break;
      }
    }
    if (idAvailable) return i;
  }
}

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

const selectCategoryItem = e => {
  const nodes = [...e.target.parentNode.children];
  const selectedNode = e.target;

  nodes.forEach(node => {
    if (node !== selectedNode && node.classList.contains('selected')) {
      node.classList.remove('selected');
      node.classList.remove('category__list--item-selected');
    }
  });

  selectedNode.classList.add('selected');
  selectedNode.classList.add('category__list--item-selected');
  showSubcategoryList(selectedNode.textContent);
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
      const subcategory = categories[category];
      const fragment = document.createDocumentFragment();
      for (const subcategories in subcategory) {
        let item = document.createElement('p');
        item.innerHTML = subcategories;
        item.style.userSelect = 'none';
        item.classList.add('subcategory__list--item');

        const deleteBtn = document.createElement('div');
        deleteBtn.innerHTML = deleteBtnSVG;
        deleteBtn.addEventListener('click', async (e) => {
          const subcategoryName = e.target.closest('.subcategory__list--item').textContent;
          const confirmed = await deleteEntryWarning('sub-category', subcategoryName);

          if (confirmed) {
            const categorySelectedName = document.querySelector(('.category__list--item-selected')).textContent;
            delete categories[categorySelectedName][subcategoryName]
            localStorage.setItem('customCategories', JSON.stringify(categories));
            e.target.closest('.subcategory-list').removeChild(e.target.closest('.subcategory__list--item'));

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
    item.addEventListener('click', (e) => {
      selectCategoryItem(e);
    });
    const deleteBtn = document.createElement('div');
    deleteBtn.innerHTML = deleteBtnSVG;
    deleteBtn.addEventListener('click', async (e) => {
      const categoryName = e.target.closest('.category__list--item').textContent;
      const confirmed = await deleteEntryWarning('category', `${categoryName} (and all its sub-categories)`);

      if (confirmed) {
        delete categories[categoryName];
        localStorage.setItem('customCategories', JSON.stringify(categories));
        e.target.closest('.category-list').removeChild(e.target.closest('.category__list--item'));

      }
    });
    item.appendChild(deleteBtn);
    fragment.appendChild(item);

  }
  categoryContainer.appendChild(fragment);
}

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
const addNewSubcategory = async (category, subcategory) => {
  if (categories[category].hasOwnProperty(subcategory)) {
    await understoodWarning('A aub-category with this name already exist');
  } else {
    categories[category][subcategory] = [];
    localStorage.setItem('customCategories', JSON.stringify(categories));
    showSubcategoryList(category);
    loadSidebarMenuData();
  }
}

const checkURL = async () => {
  if (URLRegex()) {
    let entryLink = linkElement.value;
    if (!entryLink.includes('www.')) { 
      entryLink = entryLink.split('//');
      entryLink = entryLink[0]+'//www.'+entryLink[1];
   }
    try {
      const response = await fetch(entryLink);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return await customWarning(`An error occurred while trying to access the URL.\n Please verify the entered URL. If you're sure the link is correct, press 'Accept' to continue.\n On the contrary if the URL is incorrect, press 'Cancel' and correct the entered URL.`); // Devolvemos false si se produce un error en la solicitud      
    };
  } else {
    return false; // Devolvemos una promesa resuelta en false si no se cumple la condición del if
  }
}

const URLRegex = () => {
  const expresion = /^(ftp|http|https):\/\/[^ "]+$/;
  if (linkElement.value.length > 8 && !expresion.test(linkElement.value)) linkElement.style.background = 'red';
  else {
    linkElement.style.background = '#fff';
    if (expresion.test(linkElement.value)) return true;
    else {
      return false;
    }
  }
}

const insertLink = () => {
  if (categoryElement.selectedIndex > 0 && subcategoryElement.selectedIndex > 0 && URLRegex && descriptionElement.value != "" && nameElement.value != "") {
    checkURL()
      .then(result => {
        if (result === true) addEntry();
      })
      .catch(error => {
        console.log(error);
      });

  } else {
    console.log('dentro else');
  }
}

const loadEntries = () => {
  let fragment = document.createDocumentFragment();

  for (const category in categories) {
    for (const subcategory in categories[category]) {
      const elements = categories[category][subcategory];
      for (const element of elements) {
        let entryName = element.name;
        let entryDescription = element.description;
        let entryURL = element.URL;
        let container = document.createElement('div');
        let nameNode = document.createElement('p');
        let categoryNode = document.createElement('p');
        let subcategoryNode = document.createElement('p');
        let descriptionNode = document.createElement('p');
        let linkNode = document.createElement('p');
        let tools = document.createElement('div');
        let editBtn = document.createElement('div');
        let deleteBtn = document.createElement('div');

        container.id = `entry-${searchAvailableID()}`;
        container.setAttribute('class', `result__entry ${astroClass}`);
        nameNode.textContent = entryName;
        nameNode.setAttribute('class', astroClass);
        categoryNode.textContent = category;
        categoryNode.setAttribute('class', astroClass);

        subcategoryNode.innerHTML = subcategory;
        subcategoryNode.setAttribute('class', astroClass);

        descriptionNode.innerHTML = entryDescription;
        descriptionNode.setAttribute('class', astroClass);

        linkNode.innerHTML = entryURL;
        linkNode.setAttribute('class', astroClass);

        tools.setAttribute('class', `link-tools ${astroClass}`);

        editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
        editBtn.innerHTML = editBtnSVG;
        editBtn.addEventListener('click', (e) => {
          const entryParent = e.target.closest('.result__entry');
          editEntry(entryParent);
        })

        deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
        deleteBtn.innerHTML = deleteBtnSVG;
        deleteBtn.addEventListener('click', async (e) => {
          const entryName = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;
          const confirmed = await deleteEntryWarning('entry', entryName);
          if (confirmed) {
            const entryParent = e.target.closest('.result__entry');
            const entryName = entryParent.children[0].textContent;
            const entryDescription = entryParent.children[3].textContent;
            const entryURL = entryParent.children[4].textContent;
            if (removeEntry(entryName, entryDescription, entryURL)) {
              clearElement(entryParent);
              entryParent.parentNode.removeChild(entryParent);
            }
          }
        })
        container.appendChild(nameNode)
        container.appendChild(categoryNode);
        container.appendChild(subcategoryNode);
        container.appendChild(descriptionNode);
        container.appendChild(linkNode);
        tools.appendChild(editBtn);
        tools.appendChild(deleteBtn);
        container.appendChild(tools);
        fragment.appendChild(container);
      }
    }
  }
  return fragment;
}

const addEntry = async () => {
  const chceckDuplicateLink = (link) => {
    for (const category in categories) {
      for (const subcategory in categories[category]) {
        const elements = categories[category][subcategory];
        for (const element of elements) {
          if (element.URL === link) {
            return true;
          }
        }
      }
    }
    return false;
  }
  if (chceckDuplicateLink(linkElement.value)) {
    await understoodWarning('An entry with current URL is already exist');
  } else {
    let fragment = document.createDocumentFragment();
    let iconName = document.querySelector('#selectedIconName').textContent.split(': ')[1];
    let container = document.createElement('div');
    let name = document.createElement('p');
    let category = document.createElement('p');
    let subcategory = document.createElement('p');
    let description = document.createElement('p');
    let URLLink = document.createElement('p');
    let tools = document.createElement('div');
    let editBtn = document.createElement('div');
    let deleteBtn = document.createElement('div');

    container.id = `entry-${searchAvailableID()}`;
    container.setAttribute('class', `result__entry ${astroClass}`);

    name.textContent = nameElement.value;
    name.setAttribute('class', astroClass);

    category.textContent = categoryElement.value;
    category.setAttribute('class', astroClass);

    subcategory.textContent = subcategoryElement.value;
    subcategory.setAttribute('class', astroClass);

    description.textContent = descriptionElement.value;
    description.setAttribute('class', astroClass);

    URLLink.textContent = linkElement.value;
    URLLink.setAttribute('class', astroClass);

    tools.setAttribute('class', `link-tools ${astroClass}`);

    editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
    editBtn.innerHTML = editBtnSVG;
    editBtn.addEventListener('click', (e) => {
      const entryParent = e.target.closest('.result__entry');
      editEntry(entryParent);
    })

    deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
    deleteBtn.innerHTML = deleteBtnSVG;
    deleteBtn.addEventListener('click', async (e) => {
      const alertText = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;

      const confirmed = await deleteEntryWarning('entry', alertText);
      if (confirmed) {
        const entryParent = e.target.closest('.result__entry');
        const entryName = entryParent.children[0].textContent;
        const entryDescription = entryParent.children[3].textContent;
        const entryURL = entryParent.children[4].textContent;
        if (removeEntry(entryName, entryDescription, entryURL)) {
          clearElement(entryParent);
          entryParent.parentNode.removeChild(entryParent);
        }
      }
    })

    container.appendChild(name);
    container.appendChild(category);
    container.appendChild(subcategory);
    container.appendChild(description);
    container.appendChild(URLLink);
    tools.appendChild(editBtn);
    tools.appendChild(deleteBtn);
    container.appendChild(tools);
    fragment.appendChild(container);

    console.log("categoryElement.value:", categoryElement.value);
    console.log("subcategoryElement.value:", subcategoryElement.value);
    console.log("nameElement.value:", nameElement.value);
    console.log("descriptionElement.value:", descriptionElement.value);
    console.log("linkElement.value:", linkElement.value);
    console.log("iconName:", iconName);


    categories[categoryElement.value][subcategoryElement.value].push({
      name: nameElement.value,
      description: descriptionElement.value,
      URL: linkElement.value,
      icon: (iconName === undefined) ? 'default' : iconName
    });
    localStorage.setItem('customCategories', JSON.stringify(categories));
    document.getElementById('formResult').appendChild(fragment);
  }
  resetEntryFormValues();
  loadSidebarMenuData();
  // console.log(categories)
}
const removeEntry = (name, description, link) => {
  for (const category in categories) {
    for (const subcategory in categories[category]) {
      const entries = categories[category][subcategory];
      const entryIndex = entries.findIndex(
        (entry) => entry.name === name && entry.description === description && entry.URL === link
      );

      if (entryIndex !== -1) {
        entries.splice(entryIndex, 1);
        isEditing = false;
        document.querySelector('#iconSelectionToggle').classList.remove('disabled');
        document.querySelector('#markerIconSelection').classList.remove('disabled');
        document.querySelector('#submitLink').classList.remove('disabled');
        nameElement.disabled = false;
        categoryElement.disabled = false;
        subcategoryElement.disabled = false;
        editNode = null;
        localStorage.setItem('customCategories', JSON.stringify(categories));
        return true; // Salir de la función después de eliminar la entrada
      }
    }
  }
  return false;
};

const showIconsToChange = async () => {
  try {
    const response = await fetch('./img/Icons/icons.svg');
    const responseContent = await response.text();
    const fragment = document.createDocumentFragment();

    // Utilizar DOMParser para convertir el contenido SVG en nodos de elementos
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(responseContent, 'image/svg+xml');
    const symbols = svgDoc.querySelectorAll('symbol');

    symbols.forEach(symbol => {
      const itemContainer = document.createElement('div');
      const itemSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const itemUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');

      itemContainer.classList.add('change__icon--item');
      itemSVG.classList.add('icon');
      itemSVG.setAttribute('width', '42');
      itemSVG.setAttribute('height', '42');
      itemUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./img/Icons/icons.svg#${symbol.id}`);

      itemContainer.addEventListener('click', (e)=> {
        selectedIconToChange = e.target.closest('.change__icon--item').children[0].children[0].href.baseVal.split('#')[1];
        let selectedIcon = document.querySelector('.change__icon--item.selected');
        const iconsContainer = document.querySelector('#markerIconSelection');
        
        if (selectedIcon !== null && selectedIcon !== e.target.closest('.change__icon--item')) {
            selectedIcon.classList.remove('selected');
            e.target.closest('.change__icon--item').classList.add('selected')
        }
        else {
            e.target.closest('.change__icon--item').classList.add('selected')
        }
        // iconsContainer.classList.remove('active');
    });
      itemSVG.appendChild(itemUse);
      itemContainer.appendChild(itemSVG);
      fragment.appendChild(itemContainer);
    });

    // Obtener el contenedor y agregar los elementos creados al DOM
    const iconCollectionContainer = document.querySelector('#changeIconContainer');
    iconCollectionContainer.innerHTML = '';
    iconCollectionContainer.appendChild(fragment);
  } catch (error) {
    console.error('Error fetching SVG:', error);
  }
};

// const showIconsToChange = async ()=> {
//   try {
//     const response = await fetch('./img/Icons/icons.svg');
//     const responseContent = await response.text();
//     const fragment = document.createDocumentFragment();
//     let iconCollectionContainer = document.querySelector('#changeIconContainer');
//     iconCollectionContainer.innerHTML = responseContent;
//     let symbols = iconCollectionContainer.querySelectorAll('symbol');

//     symbols.forEach(symbol => {
//       const itemContainer = document.createElement('div');
//       const itemSVG = document.createElement('svg');
//       const itemUse = document.createElement('use');
//       itemContainer.classList.add('marker__icon--item');
//       itemSVG.classList.add('icon');
//       itemSVG.setAttribute('width', '44');
//       itemSVG.setAttribute('height', '44');
//       itemUse.setAttribute('xlink:href', `./img/Icons/icons.svg#${symbol.id}`)
//       itemSVG.append(itemUse);
//       itemContainer.appendChild(itemSVG);
//       fragment.appendChild(itemContainer);
//     })
//       iconCollectionContainer.appendChild(fragment);
//     // console.log(iconCollectionContainer.children[0].children.length)
//     // fragment.appendChild(iconCollectionContainer);
//     // return fragment;
    
//   } catch (error) {
//     console.error('Error fetching SVG:', error);
//   }
// }

// const editEntry = (entryParent) => {
//   const values = entryParent.children;
//   const oldValues = Array.from(values).map((element) => element.innerHTML);
//   if (!isEditing) {
//     isEditing = true;
//     document.querySelector('#iconSelectionToggle').classList.add('disabled');
//     document.querySelector('#markerIconSelection').classList.add('disabled');
//     document.querySelector('#submitLink').classList.add('disabled');
//     categoryElement.disabled = true;
//     subcategoryElement.disabled = true;
//     nameElement.disabled = true;
//     editNode = entryParent;
//     entryParent.classList.add('edit__mode')
//     let name = values[0].textContent;
//     let category = values[1].textContent;
//     let subcategory = values[2].textContent;
//     let description = values[3].textContent;
//     let link = values[4].textContent;


//     while (entryParent.children.length > 0) {
//       entryParent.removeChild(entryParent.children[0])
//     }

//     const fragment = document.createDocumentFragment();

//     let nameNode = document.createElement('input');
//     nameNode.setAttribute('type', 'text');
//     nameNode.value = name;
//     nameNode.setAttribute('class', astroClass);
//     fragment.appendChild(nameNode);

//     let categoryNode = document.createElement('select');
//     categoryNode.setAttribute('class', astroClass);
//     categoryNode.appendChild(getCategory());
//     categoryNode.addEventListener('change', (e) => {
//       clearElement(entryParent.children[1])
//       entryParent.children[1].appendChild(getSubCategory(e.target.value))
//     })
//     fragment.appendChild(categoryNode);

//     let subcategoryNode = document.createElement('select');
//     subcategoryNode.setAttribute('class', astroClass);
//     subcategoryNode.appendChild(getSubCategory(category));
//     fragment.appendChild(subcategoryNode);

//     let descriptionNode = document.createElement('input');
//     descriptionNode.setAttribute('type', 'text');
//     descriptionNode.value = description;
//     descriptionNode.setAttribute('class', astroClass);
//     fragment.appendChild(descriptionNode);

//     let linkNode = document.createElement('input');
//     linkNode.setAttribute('type', 'text');
//     linkNode.value = link;
//     linkNode.setAttribute('class', astroClass);
//     fragment.appendChild(linkNode);


//     let tools = document.createElement('div');
//     let iconBtn = document.createElement('div');
//     let iconsContainer = document.createElement('div');
//     let editBtn = document.createElement('div');
//     let deleteBtn = document.createElement('div');
    
//     // let iconCollectionObject = document.createElement('object');
//     // iconCollectionObject.id = 'iconsSprite';
//     // iconCollectionObject.setAttribute('type', 'image/svg+xml');
//     // iconCollectionObject.data = './img/Icons/icons.svg';
//     // iconCollectionContainer.appendChild(iconCollectionObject);
//     tools.setAttribute('class', `link-tools ${astroClass}`);
//     iconBtn.setAttribute('class', `entry__icon--btn ${astroClass}`);
//     iconBtn.innerHTML = iconBtnSVG;
//     iconsContainer.id = 'changeIconContainer';
//     iconBtn.appendChild(iconsContainer);
//     iconBtn.addEventListener('click', async ()=> {
//       document.querySelector('#changeIconContainer').classList.toggle('active');
//       if (!changeIconActived) {
//         changeIconActived = true;
//         showIconsToChange();
//         // iconBtn.appendChild(showIconsToChange());
//       }
//       // alert()
//     })

//     // iconBtn.appendChild(iconCollectionContainer);

//     editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
//     editBtn.innerHTML = saveBtnSVG;
//     editBtn.addEventListener('click', (e) => {
//       const entryParent = e.target.closest('.result__entry');
//       saveEntry(entryParent, oldValues);
//     })

//     deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
//     deleteBtn.innerHTML = deleteBtnSVG;
//     deleteBtn.addEventListener('click', async (e) => {
//       const entryName = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;
//       const confirmed = await deleteEntryWarning('entry', entryName);
//       if (confirmed) {
//         const entryParent = e.target.closest('.result__entry');
//         const entryName = entryParent.children[0].value;
//         const entryDescription = entryParent.children[3].value;
//         const entryURL = entryParent.children[4].value;
//         if (removeEntry(entryName, entryDescription, entryURL)) {
//           clearElement(entryParent);
//           entryParent.parentNode.removeChild(entryParent);
//         };
//       }
//     })
//     tools.appendChild(iconBtn);
//     tools.appendChild(editBtn);
//     tools.appendChild(deleteBtn);
//     fragment.appendChild(tools);
//     entryParent.appendChild(fragment);

//     for (let i = 0; i < entryParent.children[1].options.length; i++) {
//       let option = entryParent.children[1].options[i];
//       if (category === option.value) entryParent.children[1].selectedIndex = option.index;
//     }
//     for (let i = 0; i < entryParent.children[2].options.length; i++) {
//       let option = entryParent.children[2].options[i];
//       if (subcategory === option.value) {
//         entryParent.children[1].selectedIndex = option.index;
//       }
//     }
//   }


// }

const editEntry = (entryParent) => {
  const values = entryParent.children;
  const oldValues = Array.from(values).map((element) => element.innerHTML);
  selectedIconToChange = undefined;
  if (!isEditing) {
    isEditing = true;
    document.querySelector('#iconSelectionToggle').classList.add('disabled');
    document.querySelector('#markerIconSelection').classList.add('disabled');
    document.querySelector('#submitLink').classList.add('disabled');
    categoryElement.disabled = true;
    subcategoryElement.disabled = true;
    nameElement.disabled = true;
    editNode = entryParent;
    entryParent.classList.add('edit__mode');

    let name = values[0].textContent;
    let category = values[1].textContent;
    let subcategory = values[2].textContent;
    let description = values[3].textContent;
    let link = values[4].textContent;

    while (entryParent.children.length > 0) {
      entryParent.removeChild(entryParent.children[0]);
    }

    const fragment = document.createDocumentFragment();

    let nameNode = document.createElement('input');
    nameNode.setAttribute('type', 'text');
    nameNode.value = name;
    nameNode.setAttribute('class', astroClass);
    fragment.appendChild(nameNode);

    let categoryNode = document.createElement('select');
    categoryNode.setAttribute('class', astroClass);
    categoryNode.appendChild(getCategory());
    categoryNode.addEventListener('change', (e) => {
      clearElement(entryParent.children[2]);
      entryParent.children[2].appendChild(getSubCategory(e.target.value));
    });
    fragment.appendChild(categoryNode);

    let subcategoryNode = document.createElement('select');
    subcategoryNode.setAttribute('class', astroClass);
    subcategoryNode.appendChild(getSubCategory(category));
    fragment.appendChild(subcategoryNode);

    let descriptionNode = document.createElement('input');
    descriptionNode.setAttribute('type', 'text');
    descriptionNode.value = description;
    descriptionNode.setAttribute('class', astroClass);
    fragment.appendChild(descriptionNode);

    let linkNode = document.createElement('input');
    linkNode.setAttribute('type', 'text');
    linkNode.value = link;
    linkNode.setAttribute('class', astroClass);
    fragment.appendChild(linkNode);

    let tools = document.createElement('div');
    let iconBtn = document.createElement('div');
    let iconsContainer = document.createElement('div');
    let editBtn = document.createElement('div');
    let deleteBtn = document.createElement('div');

    tools.setAttribute('class', `link-tools ${astroClass}`);
    iconBtn.setAttribute('class', `entry__icon--btn ${astroClass}`);
    iconBtn.innerHTML = iconBtnSVG;
    iconsContainer.id = 'changeIconContainer';
    iconBtn.appendChild(iconsContainer);
    iconBtn.addEventListener('click', async () => {
      document.querySelector('#changeIconContainer').classList.toggle('active');
      if (!changeIconActived) {
        changeIconActived = true;
        showIconsToChange();
        // iconBtn.appendChild(showIconsToChange());
      }
      // alert()
    });

    // iconBtn.appendChild(iconCollectionContainer);

    editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
    editBtn.innerHTML = saveBtnSVG;
    editBtn.addEventListener('click', (e) => {
      const currentEntryParent = e.target.closest('.result__entry');
      saveEntry(currentEntryParent, oldValues);
    });

    deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
    deleteBtn.innerHTML = deleteBtnSVG;
    deleteBtn.addEventListener('click', async (e) => {
      const alertText = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;

      const confirmed = await deleteEntryWarning('entry', alertText);
      if (confirmed) {
        const currentEntryParent = e.target.closest('.result__entry');
        const entryName = currentEntryParent.children[0].value;
        const entryDescription = currentEntryParent.children[3].value;
        const entryURL = currentEntryParent.children[4].value;
        if (removeEntry(entryName, entryDescription, entryURL)) {
          clearElement(currentEntryParent);
          currentEntryParent.parentNode.removeChild(currentEntryParent);
        }
      }
    });

    tools.appendChild(iconBtn);
    tools.appendChild(editBtn);
    tools.appendChild(deleteBtn);
    fragment.appendChild(tools);
    entryParent.appendChild(fragment);

    for (let i = 0; i < entryParent.children[1].options.length; i++) {
      let option = entryParent.children[1].options[i];
      if (category === option.value) {
        entryParent.children[1].selectedIndex = i;
      }
    }

    for (let i = 0; i < entryParent.children[2].options.length; i++) {
      let option = entryParent.children[2].options[i];
      if (subcategory === option.value) {
        entryParent.children[2].selectedIndex = i;
      }
    }
  }
  console.log(categories)
};

const saveEntry = (entryParent, oldValues) => {
  const values = entryParent.children;
  const name = values[0].value;
  const category = values[1].value;
  const subcategory = values[2].value;
  const description = values[3].value;
  const link = values[4].value;
  const oldName = oldValues[0]
  const oldCategory = oldValues[1];
  const oldSubcategory = oldValues[2];
  const oldDescription = oldValues[3];
  const oldLink = oldValues[4];
  let oldIcon

  // Eliminar el elemento antiguo del objeto categories
  if (oldCategory && oldSubcategory && oldDescription && oldLink) {
    const oldEntry = {
      name: oldName,
      description: oldDescription,
      URL: oldLink
    };

    if (categories[oldCategory] && categories[oldCategory][oldSubcategory]) {
      const entryIndex = categories[oldCategory][oldSubcategory].findIndex(
        (element) =>
          element.name === oldEntry.name &&
          element.description === oldEntry.description &&
          element.URL === oldEntry.URL
      );
      oldIcon = categories[oldCategory][oldSubcategory][entryIndex].icon;
      if (entryIndex !== -1) {
        categories[oldCategory][oldSubcategory].splice(entryIndex, 1);
      }
    }
  }
  while (entryParent.children.length > 0) {
    entryParent.removeChild(entryParent.children[0]);
  }

  const fragment = document.createDocumentFragment();
  const nameNode = document.createElement('p');
  const categoryNode = document.createElement('p');
  const subcategoryNode = document.createElement('p');
  const descriptionNode = document.createElement('p');
  const linkNode = document.createElement('p');
  let tools = document.createElement('div');
  let editBtn = document.createElement('div');
  let deleteBtn = document.createElement('div');

  nameNode.innerHTML = name;
  nameNode.classList.add(astroClass);
  categoryNode.innerHTML = category;
  categoryNode.classList.add(astroClass);
  subcategoryNode.innerHTML = subcategory;
  subcategoryNode.classList.add(astroClass);
  descriptionNode.innerHTML = description;
  descriptionNode.classList.add(astroClass);
  linkNode.innerHTML = link;
  linkNode.classList.add(astroClass);
  fragment.appendChild(nameNode);
  fragment.appendChild(categoryNode);
  fragment.appendChild(subcategoryNode);
  fragment.appendChild(descriptionNode);
  fragment.appendChild(linkNode);

  tools.setAttribute('class', `link-tools ${astroClass}`);

  editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
  editBtn.innerHTML = editBtnSVG;
  editBtn.addEventListener('click', (e) => {
    const entryParent = e.target.closest('.result__entry');
    editEntry(entryParent);
  });

  deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
  deleteBtn.innerHTML = deleteBtnSVG;
  deleteBtn.addEventListener('click', async (e) => {
    const entryName = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;
    const confirmed = await deleteEntryWarning('entry', entryName);
    if (confirmed) {
      const entryParent = e.target.closest('.result__entry');
      const entryName = entryParent.children[0].textContent;
      const entryDescription = entryParent.children[3].textContent;
      const entryURL = entryParent.children[4].textContent;
      if (removeEntry(entryName, entryDescription, entryURL)) {
        clearElement(entryParent);
        entryParent.parentNode.removeChild(entryParent);
      }
    }
  })
  tools.appendChild(editBtn);
  tools.appendChild(deleteBtn);
  fragment.appendChild(tools);
  entryParent.appendChild(fragment);
  isEditing = false;
  document.querySelector('#iconSelectionToggle').classList.remove('disabled');
  document.querySelector('#markerIconSelection').classList.remove('disabled');
  document.querySelector('#submitLink').classList.remove('disabled');
  nameElement.disabled = false;
  categoryElement.disabled = false;
  subcategoryElement.disabled = false;
  editNode = null;
  let icon = undefined;
  alert(oldIcon)
  alert(selectedIconToChange)
  // Agregar el nuevo elemento al objeto categories
  if (category && subcategory && name && description && link) {
    if (oldIcon !== selectedIconToChange && selectedIconToChange !== undefined) {
      icon = selectedIconToChange;
    } else {
      icon = oldIcon;
    }
    const newEntry = {
      name: name,
      description: description,
      URL: link, 
      icon: icon
    };
    console.log(`primer new icon: ${newEntry.icon}`)
    if (!categories[category]) {
      categories[category] = { [subcategory]: [newEntry] };
    } else {
      if (!categories[category][subcategory]) {
        categories[category][subcategory] = [newEntry];
      } else {
        categories[category][subcategory].push(newEntry);
      }
    }
  }
  changeIconActived = false;
  localStorage.setItem('customCategories', JSON.stringify(categories));
  loadSidebarMenuData();
};

const setInputActive = (value) => {
  linkElement.disabled = !value;
  descriptionElement.disabled = !value;  
}

const hideConfigContainers = () => {
  document.getElementById('configCategoriesContainer').classList.remove('active');
  document.getElementById('configMarkersContainer').classList.remove('active');
  document.getElementById('importCustomMarkersContainer').classList.remove('active');
  document.getElementById('dbConfigOptions').classList.remove('active');
}
const resetEntryFormValues = ()=> {
  nameElement.value = '';
  categoryElement.selectedIndex = 0;
  subcategoryElement.selectedIndex = 0;
  descriptionElement.value = '';
  linkElement.value = '';
  if (document.querySelector('.marker__icon--item.selected') != null) document.querySelector('.marker__icon--item.selected').classList.remove('selected');
  document.querySelector('#selectedIconName').textContent = 'Select an icon...';
}

//CUSTOM ALERTS
const deleteEntryWarning = (elementType, elementName) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: `This action will remove the ${elementType}: ${elementName}. Are you sure?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};

const customWarning = (errorText, confirmText = 'Yes, add it!', cancelText = 'No, cancel!') => {
  return new Promise((resolve) => {
    Swal.fire({
      title: 'Warning',
      text: errorText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};

const understoodWarning = (warningText) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: 'Warning',
      text: warningText,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Understood'
    }).then((result) => {
      resolve(result.isConfirmed)
    });
  });
};
/*
USE EXAMPLE
function() async (elementType, elementName) => {
 const confirmed = await functionName(arguments)`);
      
      if (confirmed) {
        -> Actions to do...
      }

*/


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

  /* Edit and Delete buttons (maybe onle is needed in developement) */
  const editBtns = document.querySelectorAll('.entry__edit--btn');
  const deleteBtns = document.querySelectorAll('.entry__delete--btn');

  editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const entryParent = e.target.closest('.result__entry');
      editEntry(entryParent);
    })
  });
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const entryName = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;
      const confirmed = await deleteEntryWarning('entry', entryName);
      if (confirmed) {
        const entryParent = e.target.closest('.result__entry');
        const entryName = entryParent.children[0].textContent;
        const entryDescription = entryParent.children[3].textContent;
        const entryURL = entryParent.children[4].textContent;
        if (removeEntry(entryName, entryDescription, entryURL)) {
          clearElement(entryParent);
          entryParent.parentNode.removeChild(entryParent);
        }
      }
    })
  });
  /* End edit and delete button section */

  /* Show options when config icon is pressed */
  document.getElementById('configDB').addEventListener('click', () => {
    document.getElementById('dbConfigOptions').classList.toggle('active');
  });
  /* Show edit categories container */
  document.getElementById('dbConfigOptions-editCategories').addEventListener('click', () => {
    hideConfigContainers();
    document.getElementById('configCategoriesContainer').classList.add('active');
    showCategoryList();
  });
  /* Show edit markers container */
  document.getElementById('dbConfigOptions-editMarkers').addEventListener('click', () => {
    hideConfigContainers();
    document.getElementById('configMarkersContainer').classList.add('active');
  });
  /* Show import custom settings container */
  document.getElementById('dbConfigOptions-importCustomSettings').addEventListener('click', () => {
    hideConfigContainers();
    document.getElementById('importCustomMarkersContainer').classList.add('active');
  });
  /* Call import new category in edit categories form */
  document.getElementById('newCategoryBtn').addEventListener('click', (e) => {
    const categoryInput = document.querySelector('#newCategoryInput');
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
        addNewSubcategory(categorySelected.textContent, subcategoryInput.value);
        subcategoryInput.value = '';
      }
      else {
        understoodWarning('To add a new sub-category, you must enter the name in order to add it')
      }
    } else {
      await understoodWarning('To add a new sub-category, you must first select a parent category in order to add it.');
    }
  });
  /* Import / Export settings block */
  document.getElementById('dbConfigOptions-exportCustomSettings').addEventListener('click', () => {
    downloadJSON(categories, 'customMarkers.json')
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

  /* Move sidebar to left */
  document.getElementById('posLeftSide').addEventListener('click', () => {
    contentContainer.style.flexDirection = 'row';
    sideBar.style.flexDirection = 'row';
  });

  /* Move sidebar to right */
  document.getElementById('posRightSide').addEventListener('click', () => {
    contentContainer.style.flexDirection = 'row-reverse';
    sideBar.style.flexDirection = 'row-reverse';
  });

  /* Deactive setting options menu on leave */
  
  document.querySelector('#dbConfigNav').addEventListener('mouseleave', ()=>{
    if (document.querySelector('#dbConfigOptions').classList.contains('active')) document.querySelector('#dbConfigOptions').classList.remove('active')
  });  
}

/* Load base functions and set defaults values */
setInputActive(false);
categoryElement.appendChild(getCategory());

enableEntriesListeners();
loadSidebarMenuData();
activeIconSelector();
resetEntryFormValues();

document.getElementById('formResult').appendChild(loadEntries());
