import { hideConfigContainers } from './menuFunctions.js';
import { clearElement, loadDefaultCategories } from './functions.js';
import { deleteEntryWarning, customWarning, understoodWarning } from './alerts.js';
// import { loadSidebarMenuData } from './sidebar.js';
import { loadSidebarMenuData } from './searcher.js';

import { getCategory, showCategoryList, getSubCategory, addNewSubcategory, addNewCategory, manageCategoriesListeners } from './manage-categories.js';
import { closePopup } from './sweetalert2/src/instanceMethods.js';
const nameElement = document.querySelector('#markernameInput');
const categoryElement = document.querySelector('#categoryInput');
const subcategoryElement = document.querySelector('#subcategoryInput');
const linkElement = document.querySelector('#linkInput');
const descriptionElement = document.querySelector('#descriptionInput');
const iconBtnSVG = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Change icon</title><path d="M13 21H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16l7-3 5.5 2.5M16 10a2 2 0 110-4 2 2 0 010 4zM16 19h3m3 0h-3m0 0v-3m0 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
const editBtnSVG = `<svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Edit marker</title><path d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const deleteBtnSVG = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Delete marker</title><path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const saveBtnSVG = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><title>Save marker</title><path d="M3 7.5V5a2 2 0 012-2h11.172a2 2 0 011.414.586l2.828 2.828A2 2 0 0121 7.828V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.5M6 21v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 21v-7.4a.6.6 0 00-.6-.6H15M16 3v5.4a.6.6 0 01-.6.6h-1.9M8 3v3M1 12h11m0 0L9 9m3 3l-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const astroClass = 'astro-FDMGHVX6';
const dropBox = document.querySelector('#dropBox');
const entryTitlesTemplate = document.querySelector('#entryTitlesTemplate');
const entryTemplate = document.querySelector('#entryTemplate');
const editEntriesTemplate = document.querySelector('#editEntryTemplate');

let isEditing = false;
let editNode = null;
let changeIconActived = false;
let selectedIconToChange;

let categories = loadDefaultCategories();
// Returns default or custom markers database
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

const resetEntryFormValues = ()=> {
  nameElement.value = '';
  categoryElement.selectedIndex = 0;
  subcategoryElement.selectedIndex = 0;
  descriptionElement.value = '';  
  linkElement.value = '';
  document.querySelector('#searchToolInput').value = "";
  if (document.querySelector('.marker__icon--item.selected') != null) document.querySelector('.marker__icon--item.selected').classList.remove('selected');
  document.querySelector('#selectedIconName').textContent = 'Select an icon...';
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
const addEntry = async () => {
  categories = loadDefaultCategories();

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
      const entryNode = entryTemplate.content.cloneNode(true);
      entryNode.querySelector('.result__entry').id = `entry-${searchAvailableID()}`;
      entryNode.querySelector('.entry__name').textContent = nameElement.value;
      entryNode.querySelector('.entry__category').textContent = categoryElement.value;
      entryNode.querySelector('.entry__subcategory').textContent = subcategoryElement.value;
      entryNode.querySelector('.entry__description').textContent = descriptionElement.value;
      entryNode.querySelector('.entry__url').textContent = linkElement.value;

      entryNode.querySelector('.entry__edit--btn').addEventListener('click', (e) => {
        const entryParent = e.target.closest('.result__entry');
        editEntry(entryParent);
      })

      entryNode.querySelector('.entry__delete--btn').addEventListener('click', async (e) => {
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
      fragment.appendChild(entryNode);  

      let iconName = document.querySelector('#selectedIconName').textContent.split(': ')[1];  

      categories[categoryElement.value][subcategoryElement.value].push({
        name: nameElement.value,
        description: descriptionElement.value,
        URL: linkElement.value,
        icon: (iconName === undefined) ? 'default' : iconName
      });
      localStorage.setItem('customCategories', JSON.stringify(categories));
      document.getElementById('formResult').appendChild(fragment);
      categories = loadDefaultCategories();
    }

    resetEntryFormValues();
    loadSidebarMenuData();
  }
const loadEntries = () => { 
  categories = loadDefaultCategories();
  let lastUsedID = 0;

  const setID = () => {
    const entries = document.querySelectorAll('.result__entry');
    let idAvailable = false;

    while (!idAvailable) {
      lastUsedID++;
      idAvailable = true;

      for (let entry of entries) {
        let idValue = Number(entry.id.split('-')[1]);
        if (idValue === lastUsedID) {
          idAvailable = false;
          break;
        }
      }
    }

    return lastUsedID;
  }

  const entriesContainer = document.querySelector('#formResult')
  let fragment = document.createDocumentFragment();  
  clearElement(entriesContainer);
  const entryTitlesNode = entryTitlesTemplate.content.cloneNode(true);
  fragment.appendChild(entryTitlesNode);

  for (const category in categories) {
    for (const subcategory in categories[category]) {
      const elements = categories[category][subcategory];
      for (const element of elements) {
        const entryNode = entryTemplate.content.cloneNode(true);
        entryNode.querySelector('.result__entry').id = `entry-${setID()}`;
        entryNode.querySelector('.entry__name').textContent = element.name;
        entryNode.querySelector('.entry__category').textContent = category;
        entryNode.querySelector('.entry__subcategory').textContent = subcategory;
        entryNode.querySelector('.entry__description').textContent = element.description;
        entryNode.querySelector('.entry__url').textContent = element.URL;

        entryNode.querySelector('.entry__edit--btn').addEventListener('click', (e) => {
          const entryParent = e.target.closest('.result__entry');
          editEntry(entryParent);
        })

        entryNode.querySelector('.entry__delete--btn').addEventListener('click', async (e) => {
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
        fragment.appendChild(entryNode);
      }
    }
  }
  entriesContainer.appendChild(fragment);
}  
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
    const editEntryNode = editEntriesTemplate.content.cloneNode(true);
    editEntryNode.querySelector('.entry__edit--name').value = name;
    const categorySelect = editEntryNode.querySelector('.entry__edit--category');
    categorySelect.appendChild(getCategory());
    categorySelect.addEventListener('change', (e) => {
        clearElement(entryParent.children[2]);
        entryParent.children[2].appendChild(getSubCategory(e.target.value));
      });
    
    editEntryNode.querySelector('.entry__edit--subcategory').appendChild(getSubCategory(category));
    editEntryNode.querySelector('.entry__edit--description').value = description;
    editEntryNode.querySelector('.entry__edit--url').value = link;
      
    editEntryNode.querySelector('.entry__icon--btn').addEventListener('click', async () => {
        document.querySelector('#changeIconContainer').classList.toggle('active');
        if (!changeIconActived) {
          changeIconActived = true;
          showIconsToChange();
          // iconBtn.appendChild(showIconsToChange());
        }
      });

    editEntryNode.querySelector('.entry__edit--btn').addEventListener('click', (e) => {
        const currentEntryParent = e.target.closest('.result__entry');
        saveEntry(currentEntryParent, oldValues);
      });


    editEntryNode.querySelector('.entry__delete--btn').addEventListener('click', async (e) => {
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

    fragment.appendChild(editEntryNode);
    
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

  const entryNode = entryTemplate.content.cloneNode(true);
  entryNode.querySelector('.entry__name').textContent = name;
  entryNode.querySelector('.entry__category').textContent = category;
  entryNode.querySelector('.entry__subcategory').textContent = subcategory;
  entryNode.querySelector('.entry__description').textContent = description;
  entryNode.querySelector('.entry__url').textContent = link;

  entryNode.querySelector('.entry__edit--btn').addEventListener('click', (e) => {
    const entryParent = e.target.closest('.result__entry');
    editEntry(entryParent);
  })

  entryNode.querySelector('.entry__delete--btn').addEventListener('click', async (e) => {
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
  fragment.appendChild(entryNode);

  isEditing = false;
  document.querySelector('#iconSelectionToggle').classList.remove('disabled');
  document.querySelector('#markerIconSelection').classList.remove('disabled');
  document.querySelector('#submitLink').classList.remove('disabled');
  nameElement.disabled = false;
  categoryElement.disabled = false;
  subcategoryElement.disabled = false;
  editNode = null;
  let icon = undefined;
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
  categories = loadDefaultCategories();
  loadSidebarMenuData();
  loadEntries();

};  

// const loadEntries = () => { 
//   const entriesContainer = document.querySelector('#formResult')
//   let fragment = document.createDocumentFragment();  
//   clearElement(entriesContainer);

//   const titles = document.createElement('div');
//   titles.innerHTML = `<p class="entry__name astro-FDMGHVX6">Name</p><p class="category astro-FDMGHVX6">Category</p><p class="subcategory astro-FDMGHVX6">Sub-category</p><p class="description astro-FDMGHVX6">Description</p><p class="link astro-FDMGHVX6">URL direction</p><p class="astro-FDMGHVX6">Edit / Delete</p>` 
//   titles.id = "entry-titles"
//   titles.setAttribute('class', `result__entry--title ${astroClass}`)
//   fragment.appendChild(titles);

//   for (const category in categories) {
//     for (const subcategory in categories[category]) {
//       const elements = categories[category][subcategory];
//       for (const element of elements) {
//         let entryName = element.name;
//         let entryDescription = element.description;
//         let entryURL = element.URL;

//         let container = document.createElement('div');
//         let nameNode = document.createElement('p');
//         let categoryNode = document.createElement('p');
//         let subcategoryNode = document.createElement('p');
//         let descriptionNode = document.createElement('p');
//         let linkNode = document.createElement('p');
//         let tools = document.createElement('div');
//         let editBtn = document.createElement('div');
//         let deleteBtn = document.createElement('div');

//         container.id = `entry-${searchAvailableID()}`;
//         container.setAttribute('class', `result__entry ${astroClass}`);
//         nameNode.textContent = entryName;
//         nameNode.setAttribute('class', astroClass);
//         categoryNode.textContent = category;
//         categoryNode.setAttribute('class', astroClass);

//         subcategoryNode.innerHTML = subcategory;
//         subcategoryNode.setAttribute('class', astroClass);

//         descriptionNode.innerHTML = entryDescription;
//         descriptionNode.setAttribute('class', astroClass);

//         linkNode.innerHTML = entryURL;
//         linkNode.setAttribute('class', astroClass);

//         tools.setAttribute('class', `link-tools ${astroClass}`);

//         editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
//         editBtn.innerHTML = editBtnSVG;
//         editBtn.addEventListener('click', (e) => {
//           const entryParent = e.target.closest('.result__entry');
//           editEntry(entryParent);
//         })

//         deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
//         deleteBtn.innerHTML = deleteBtnSVG;
//         deleteBtn.addEventListener('click', async (e) => {
//           const entryName = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;
//           const confirmed = await deleteEntryWarning('entry', entryName);
//           if (confirmed) {
//             const entryParent = e.target.closest('.result__entry');
//             const entryName = entryParent.children[0].textContent;
//             const entryDescription = entryParent.children[3].textContent;
//             const entryURL = entryParent.children[4].textContent;
//             if (removeEntry(entryName, entryDescription, entryURL)) {
//               clearElement(entryParent);
//               entryParent.parentNode.removeChild(entryParent);
//             }
//           }
//         })
//         container.appendChild(nameNode)
//         container.appendChild(categoryNode);
//         container.appendChild(subcategoryNode);
//         container.appendChild(descriptionNode);
//         container.appendChild(linkNode);
//         tools.appendChild(editBtn);
//         tools.appendChild(deleteBtn);
//         container.appendChild(tools);
//         fragment.appendChild(container);
//       }
//     }
//   }
//   entriesContainer.appendChild(fragment);
// }  
// const addEntry = async () => {
//   const chceckDuplicateLink = (link) => {
//     for (const category in categories) {
//       for (const subcategory in categories[category]) {
//         const elements = categories[category][subcategory];
//         for (const element of elements) {
//           if (element.URL === link) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }
//   if (chceckDuplicateLink(linkElement.value)) {
//     await understoodWarning('An entry with current URL is already exist');
//   } else {
//     let fragment = document.createDocumentFragment();
//     let iconName = document.querySelector('#selectedIconName').textContent.split(': ')[1];
//     let container = document.createElement('div');
//     let name = document.createElement('p');
//     let category = document.createElement('p');
//     let subcategory = document.createElement('p');
//     let description = document.createElement('p');
//     let URLLink = document.createElement('p');
//     let tools = document.createElement('div');
//     let editBtn = document.createElement('div');
//     let deleteBtn = document.createElement('div');

//     container.id = `entry-${searchAvailableID()}`;
//     container.setAttribute('class', `result__entry ${astroClass}`);

//     name.textContent = nameElement.value;
//     name.setAttribute('class', astroClass);

//     category.textContent = categoryElement.value;
//     category.setAttribute('class', astroClass);

//     subcategory.textContent = subcategoryElement.value;
//     subcategory.setAttribute('class', astroClass);

//     description.textContent = descriptionElement.value;
//     description.setAttribute('class', astroClass);

//     URLLink.textContent = linkElement.value;
//     URLLink.setAttribute('class', astroClass);

//     tools.setAttribute('class', `link-tools ${astroClass}`);

//     editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
//     editBtn.innerHTML = editBtnSVG;
//     editBtn.addEventListener('click', (e) => {
//       const entryParent = e.target.closest('.result__entry');
//       editEntry(entryParent);
//     })

//     deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
//     deleteBtn.innerHTML = deleteBtnSVG;
//     deleteBtn.addEventListener('click', async (e) => {
//       const alertText = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;

//       const confirmed = await deleteEntryWarning('entry', alertText);
//       if (confirmed) {
//         const entryParent = e.target.closest('.result__entry');
//         const entryName = entryParent.children[0].textContent;
//         const entryDescription = entryParent.children[3].textContent;
//         const entryURL = entryParent.children[4].textContent;
//         if (removeEntry(entryName, entryDescription, entryURL)) {
//           clearElement(entryParent);
//           entryParent.parentNode.removeChild(entryParent);
//         }
//       }
//     })

//     container.appendChild(name);
//     container.appendChild(category);
//     container.appendChild(subcategory);
//     container.appendChild(description);
//     container.appendChild(URLLink);
//     tools.appendChild(editBtn);
//     tools.appendChild(deleteBtn);
//     container.appendChild(tools);
//     fragment.appendChild(container);


//     categories[categoryElement.value][subcategoryElement.value].push({
//       name: nameElement.value,
//       description: descriptionElement.value,
//       URL: linkElement.value,
//       icon: (iconName === undefined) ? 'default' : iconName
//     });
//     localStorage.setItem('customCategories', JSON.stringify(categories));
//     document.getElementById('formResult').appendChild(fragment);
//   }
//   resetEntryFormValues();
//   loadSidebarMenuData();
// }
// const editEntry = (entryParent) => {
//   const values = entryParent.children;
//   const oldValues = Array.from(values).map((element) => element.innerHTML);
//   selectedIconToChange = undefined;
//   if (!isEditing) {
//     isEditing = true;
//     document.querySelector('#iconSelectionToggle').classList.add('disabled');
//     document.querySelector('#markerIconSelection').classList.add('disabled');
//     document.querySelector('#submitLink').classList.add('disabled');
//     categoryElement.disabled = true;
//     subcategoryElement.disabled = true;
//     nameElement.disabled = true;
//     editNode = entryParent;
//     entryParent.classList.add('edit__mode');

//     let name = values[0].textContent;
//     let category = values[1].textContent;
//     let subcategory = values[2].textContent;
//     let description = values[3].textContent;
//     let link = values[4].textContent;

//     while (entryParent.children.length > 0) {
//       entryParent.removeChild(entryParent.children[0]);
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
//       clearElement(entryParent.children[2]);
//       entryParent.children[2].appendChild(getSubCategory(e.target.value));
//     });
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

//     tools.setAttribute('class', `link-tools ${astroClass}`);
//     iconBtn.setAttribute('class', `entry__icon--btn ${astroClass}`);
//     iconBtn.innerHTML = iconBtnSVG;
//     iconsContainer.id = 'changeIconContainer';
//     iconBtn.appendChild(iconsContainer);
//     iconBtn.addEventListener('click', async () => {
//       document.querySelector('#changeIconContainer').classList.toggle('active');
//       if (!changeIconActived) {
//         changeIconActived = true;
//         showIconsToChange();
//         // iconBtn.appendChild(showIconsToChange());
//       }
//     });

//     // iconBtn.appendChild(iconCollectionContainer);

//     editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
//     editBtn.innerHTML = saveBtnSVG;
//     editBtn.addEventListener('click', (e) => {
//       const currentEntryParent = e.target.closest('.result__entry');
//       saveEntry(currentEntryParent, oldValues);
//     });

//     deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
//     deleteBtn.innerHTML = deleteBtnSVG;
//     deleteBtn.addEventListener('click', async (e) => {
//       const alertText = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;

//       const confirmed = await deleteEntryWarning('entry', alertText);
//       if (confirmed) {
//         const currentEntryParent = e.target.closest('.result__entry');
//         const entryName = currentEntryParent.children[0].value;
//         const entryDescription = currentEntryParent.children[3].value;
//         const entryURL = currentEntryParent.children[4].value;
//         if (removeEntry(entryName, entryDescription, entryURL)) {
//           clearElement(currentEntryParent);
//           currentEntryParent.parentNode.removeChild(currentEntryParent);
//         }
//       }
//     });

//     tools.appendChild(iconBtn);
//     tools.appendChild(editBtn);
//     tools.appendChild(deleteBtn);
//     fragment.appendChild(tools);
//     entryParent.appendChild(fragment);

//     for (let i = 0; i < entryParent.children[1].options.length; i++) {
//       let option = entryParent.children[1].options[i];
//       if (category === option.value) {
//         entryParent.children[1].selectedIndex = i;
//       }
//     }

//     for (let i = 0; i < entryParent.children[2].options.length; i++) {
//       let option = entryParent.children[2].options[i];
//       if (subcategory === option.value) {
//         entryParent.children[2].selectedIndex = i;
//       }
//     }
//   }
// };  
// const saveEntry = (entryParent, oldValues) => {
//   const values = entryParent.children;
//   const name = values[0].value;
//   const category = values[1].value;
//   const subcategory = values[2].value;
//   const description = values[3].value;
//   const link = values[4].value;
//   const oldName = oldValues[0]
//   const oldCategory = oldValues[1];
//   const oldSubcategory = oldValues[2];
//   const oldDescription = oldValues[3];
//   const oldLink = oldValues[4];
//   let oldIcon

//   // Eliminar el elemento antiguo del objeto categories
//   if (oldCategory && oldSubcategory && oldDescription && oldLink) {
//     const oldEntry = {
//       name: oldName,
//       description: oldDescription,
//       URL: oldLink
//     };

//     if (categories[oldCategory] && categories[oldCategory][oldSubcategory]) {
//       const entryIndex = categories[oldCategory][oldSubcategory].findIndex(
//         (element) =>
//           element.name === oldEntry.name &&
//           element.description === oldEntry.description &&
//           element.URL === oldEntry.URL
//       );
//       oldIcon = categories[oldCategory][oldSubcategory][entryIndex].icon;
//       if (entryIndex !== -1) {
//         categories[oldCategory][oldSubcategory].splice(entryIndex, 1);
//       }
//     }
//   }
//   while (entryParent.children.length > 0) {
//     entryParent.removeChild(entryParent.children[0]);
//   }

//   const fragment = document.createDocumentFragment();
//   const nameNode = document.createElement('p');
//   const categoryNode = document.createElement('p');
//   const subcategoryNode = document.createElement('p');
//   const descriptionNode = document.createElement('p');
//   const linkNode = document.createElement('p');
//   let tools = document.createElement('div');
//   let editBtn = document.createElement('div');
//   let deleteBtn = document.createElement('div');

//   nameNode.innerHTML = name;
//   nameNode.classList.add(astroClass);
//   categoryNode.innerHTML = category;
//   categoryNode.classList.add(astroClass);
//   subcategoryNode.innerHTML = subcategory;
//   subcategoryNode.classList.add(astroClass);
//   descriptionNode.innerHTML = description;
//   descriptionNode.classList.add(astroClass);
//   linkNode.innerHTML = link;
//   linkNode.classList.add(astroClass);
//   fragment.appendChild(nameNode);
//   fragment.appendChild(categoryNode);
//   fragment.appendChild(subcategoryNode);
//   fragment.appendChild(descriptionNode);
//   fragment.appendChild(linkNode);

//   tools.setAttribute('class', `link-tools ${astroClass}`);

//   editBtn.setAttribute('class', `entry__edit--btn ${astroClass}`);
//   editBtn.innerHTML = editBtnSVG;
//   editBtn.addEventListener('click', (e) => {
//     const entryParent = e.target.closest('.result__entry');
//     editEntry(entryParent);
//   });

//   deleteBtn.setAttribute('class', `entry__delete--btn ${astroClass}`);
//   deleteBtn.innerHTML = deleteBtnSVG;
//   deleteBtn.addEventListener('click', async (e) => {
//     const entryName = `${e.target.closest('.result__entry').children[2].textContent} with URL: ${e.target.closest('.result__entry').children[3].textContent}`;
//     const confirmed = await deleteEntryWarning('entry', entryName);
//     if (confirmed) {
//       const entryParent = e.target.closest('.result__entry');
//       const entryName = entryParent.children[0].textContent;
//       const entryDescription = entryParent.children[3].textContent;
//       const entryURL = entryParent.children[4].textContent;
//       if (removeEntry(entryName, entryDescription, entryURL)) {
//         clearElement(entryParent);
//         entryParent.parentNode.removeChild(entryParent);
//       }
//     }
//   })
//   tools.appendChild(editBtn);
//   tools.appendChild(deleteBtn);
//   fragment.appendChild(tools);
//   entryParent.appendChild(fragment);
//   isEditing = false;
//   document.querySelector('#iconSelectionToggle').classList.remove('disabled');
//   document.querySelector('#markerIconSelection').classList.remove('disabled');
//   document.querySelector('#submitLink').classList.remove('disabled');
//   nameElement.disabled = false;
//   categoryElement.disabled = false;
//   subcategoryElement.disabled = false;
//   editNode = null;
//   let icon = undefined;
//   // Agregar el nuevo elemento al objeto categories
//   if (category && subcategory && name && description && link) {
//     if (oldIcon !== selectedIconToChange && selectedIconToChange !== undefined) {
//       icon = selectedIconToChange;
//     } else {
//       icon = oldIcon;
//     }
//     const newEntry = {
//       name: name,
//       description: description,
//       URL: link, 
//       icon: icon
//     };
//     if (!categories[category]) {
//       categories[category] = { [subcategory]: [newEntry] };
//     } else {
//       if (!categories[category][subcategory]) {
//         categories[category][subcategory] = [newEntry];
//       } else {
//         categories[category][subcategory].push(newEntry);
//       }
//     }
//   }
//   changeIconActived = false;
//   localStorage.setItem('customCategories', JSON.stringify(categories));
//   loadSidebarMenuData();
// };  



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
      categories = loadDefaultCategories();
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

const setInputActive = (value) => {
  linkElement.disabled = !value;
  descriptionElement.disabled = !value;  
}  



const managementListeners = () => {

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

 


}

export { setInputActive, categoryElement, subcategoryElement, linkElement, resetEntryFormValues, loadEntries, hideConfigContainers, URLRegex, insertLink, managementListeners, isEditing, categories, deleteBtnSVG }