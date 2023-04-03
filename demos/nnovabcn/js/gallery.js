const galleries = getElement('.galleries__container');
// let Gallery;



const createGalleryObject = () =>{
    Gallery = {
        galleryData: [],
        elements: null,
        altElements: null,
        currentGallery: undefined,
        currentGalleryIndex: undefined,
        currentImage: undefined,

        imageToFigure: function (image, index, i) {   
            // AI tip -> This function contains elements that are not modified. You can create an object with the properties of these elements and then use the spread operator to apply them to the created object.
            const commonAttributes = {
                src: image.src,
                alt: image.alt,
                title: image.title,
                class: 'gallery__item--img',
            };

            let container = createElements('FIGURE', `figure_${index}${i}`, 'gallery__img--container');
            let overlay = createElements('DIV', `overlay_image_${index}${i}`, 'gallery__item--overlay');

            container.appendChild(image);
            overlay.innerText = image.alt;
            container.appendChild(overlay);

            setAttributes(image, {...commonAttributes});

            return container;
        },

        elementToGalleryArray: function (e) {
            let data = []
            let tempArray;
            if (e.target.classList.contains('gallery__menu--item')) {
                tempArray = [...galleries.children[e.target.attributes.index.value].children]
            } else {
                tempArray = [...galleries.children[e.target.parentElement.attributes.index.value].children]
            }
            tempArray.forEach(elem => {                
                data.push(elem.children[0].src);
            })
            return data;
        },

        listImgURL: function (elem, index, i) {
            let galleryFragment = document.createDocumentFragment();
            if (elem.children.length>0) {
                [...elem.children].forEach(image => {
                    if (image.classList.contains('featured')) {
                        this.galleryData.push({
                            src: image.src,
                            alt: image.alt
                        })
                    }
                    galleryFragment.appendChild(this.imageToFigure(image, index, i)) 
            })
            elem.appendChild(galleryFragment)
         }            
        },

        importImgURL: function () {
            // let indexLetters = 'abcdefghijklmnopqrstuvwxyz'; // AI tip -> No se por que cree esta variable como una array de elementos cuando se puede iterar un string de igual manera. MENUDA FUMADA ME PEGUÉ AQUI...
            [...galleries.children].forEach((elem, i) => {
                this.listImgURL(elem, i, i);
            });
        },

        selectGalleryImages: (quantity) => {
            let galleriesSelected = [];
            let imageAlt = [];
            while (quantity > 0) {   // AI tip -> The condition is already checked in the condition of the `while` loop, so a `do-while` loop is not necessary. 
                number = getRandomNumber(Gallery.galleryData.length - 1);      
                galleriesSelected.push(Gallery.galleryData[number].src);
                imageAlt.push(Gallery.galleryData[number].alt)
                Gallery.galleryData.splice(number, 1);
                quantity--;
            }
            return { galleriesSelected, imageAlt };
        },

        openViewer: function (e) {
            getElement('.gallery__viewer--container').style.display='flex';
            this.checkImageIndex(e);
            this.updateViewer();
        }, 

        closeViewer: function () {
            getElement('.gallery__viewer--container').style.display='none';
        }, 

        updateViewer: function () {         
            getElement('.viewer__picture--img').src=`${this.currentGallery[this.currentImage]}`;
            getElement('.viewer__pagination--count').innerText =`${this.currentImage+1}/${this.currentGallery.length}`
        }, 

        checkImageIndex: function (e) { 
            this.currentImage = this.currentGallery.indexOf(e.target.parentElement.children[0].src);
        },

        createGeneralGallery: function () {
            let query = this.selectGalleryImages(7);
            this.elements = query.galleriesSelected;
            this.altElements = query.imageAlt;

            let generalGallery = document.createDocumentFragment();

            this.elements.forEach((element, index) => {
                let container = createElements('FIGURE', `figure_${index}`, 'gallery__img--container');
                let image = createElements('IMG', `image_${index}`, 'gallery__item--img');
                let overlay = createElements('DIV', `overlay_image_${index}`, 'gallery__item--overlay');

                setAttributes(image, { src: element, alt: this.altElements[index], class: 'gallery__item--img' });

                container.appendChild(image);
                overlay.innerText = this.altElements[index]
                container.appendChild(overlay);
                generalGallery.appendChild(container);
                            
            });
            getElement('.general__gallery--container').appendChild(generalGallery);
            this.currentGalleryIndex = 0;
            this.currentGallery = getElement('.general__gallery--container');
        },

        setGalleries: function () {
            let galleriesList = galleries.children;
            let desktopMenuContainer = getElement('.gallery__menu--list-desktop');
            let mobileMenuContainer = getElement('.gallery__menu--list-mobile');
            let desktopFragment = document.createDocumentFragment();
            let mobileFragment = document.createDocumentFragment();

           for (let i = 0; i < galleriesList.length; i++) {
            const element = galleriesList[i];
            if (element.classList.contains('galleries__items--container') && !element.classList.contains('disabled') && !element.classList.contains('general__gallery--container')) {
                element.classList.add('disabled');
            } 
            if (element.classList.contains('galleries__items--container')) {
                let desktopItem = this.createGalleryMenu(element, i);
                let mobileItem = this.createGalleryMenu(element, i);
                desktopFragment.appendChild(desktopItem);
                mobileFragment.appendChild(mobileItem);
            }            
           }    
           desktopMenuContainer.appendChild(desktopFragment);           
           mobileMenuContainer.appendChild(mobileFragment);
        },

        createGalleryMenu: function (element, count) {
            let menuItem = createElements('LI', `gallery_menu-${count}`, 'gallery__menu--item');
            let menuLink = createElements('A', `gallery_link-${count}`, 'gallery__menu--link');
            
            menuLink.innerText = element.attributes.titulo.value;
            setAttributes(menuItem, { index: count })
            menuItem.appendChild(menuLink);
            return menuItem
        },

        createListener: function () {
            getElement('.gallery__container').addEventListener('click', (e) => {
              if (e.target.parentElement.classList.contains('gallery__img--container')) {
                if (e.target.parentElement.parentElement.classList.contains('general__gallery--container')) {
                    this.currentGallery = this.elements;
                }
                this.openViewer(e);
              } else if (e.target.classList.contains('gallery__menu--item') || e.target.classList.contains('gallery__menu--link')) {
                /*
                    AI tip -> In the createListener function, instead of repeating the same code to check if the clicked item has the class 'gallery__menu--item' or 'gallery__menu--link', 
                    a targetElement variable is created that stores the correct item, thus reducing duplication of code.
                    ESTE ME HA PUESTO MÁS CACHONDO QUE NACHO VIDAL EN SUPERVIVIENTES ...
                */
                    const targetElement = e.target.classList.contains('gallery__menu--item') ? e.target : e.target.parentElement;

                    galleries.children[this.currentGalleryIndex].classList.remove('enabled');
                    galleries.children[this.currentGalleryIndex].classList.add('disabled');
                    this.currentGallery = this.elementToGalleryArray(e);
                    this.currentGalleryIndex = targetElement.attributes.index.value;
                    galleries.children[this.currentGalleryIndex].classList.remove('disabled');
                    galleries.children[this.currentGalleryIndex].classList.add('enabled');
              } else if (e.target.classList.contains('viewer__btn--close')) {
                    this.closeViewer();
              } else if (e.target.classList.contains('viewer__btn--previous')) {
                    this.currentImage = (this.currentImage > 0) ? this.currentImage - 1 : this.currentGallery.length - 1;
                    this.updateViewer();
              } else if (e.target.classList.contains('viewer__btn--next')) {
                    this.currentImage = (this.currentImage < this.currentGallery.length - 1) ? this.currentImage + 1 : 0;
                    this.updateViewer();
              } else if (e.target.classList.contains('gallery__show--more')) {
                    getElement('.gallery__menu--mobile').classList.toggle('active');
                    e.target.classList.toggle('active');
                    (e.target.classList.contains('active')) ? e.target.textContent='- Ocultar galerías -' : e.target.textContent='Mostrar más galerías'
              }
            });
          }
        };
      };

const initGallery = () => {      
    try {
        createGalleryObject();
        Gallery.importImgURL();
        Gallery.setGalleries();
        Gallery.createGeneralGallery();
        Gallery.createListener();    
        checkNavigatorLanguage();
    } catch (error) {
        console.error("Ha ocurrido un error en la inicialización de la galería", error);
    }
}

document.addEventListener('DOMContentLoaded', initGallery); // AI tip -> De función auto-llamada me aconseja hacer un EventListener al cargar el contenido del DOM anteriormente: (function(){initGallery()})()