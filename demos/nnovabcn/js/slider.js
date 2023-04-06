class Slider {
    constructor(sliderContainer, navContainer, interval = 5000) {
      this.sliderContainer = sliderContainer;
      this.navContainer = navContainer;
      this.sliderItems = sliderContainer.querySelectorAll(".slider__item--container");
      this.activeIndex = 0;
      this.interval = interval;
      this.initSlider();
    }
  
    createNavItems() {
      this.sliderItems.forEach((item, index) => {
        const navItem = document.createElement("div");
        navItem.classList.add("slider__navegation--item");
        if (index === 0) {
          navItem.classList.add("active");
        }
        navItem.addEventListener("click", () => {
          this.goToSlide(index);
        });
        this.navContainer.appendChild(navItem);
      });
    }
  
    goToSlide(index) {
      if (index === this.activeIndex) {
        return;
      }
      const prevNavItem = this.navContainer.querySelector(".slider__navegation--item.active");
      prevNavItem.classList.remove("active");
      this.navContainer.children[index].classList.add("active");
      this.sliderItems[this.activeIndex].classList.remove("active");
      this.sliderItems[index].classList.add("active");
      this.activeIndex = index;
    }
  
    rotateSlides() {
      const nextIndex = (this.activeIndex + 1) % this.sliderItems.length;
      this.goToSlide(nextIndex);
    }
  
    initSlider() {
      this.sliderItems.forEach((item, index) => {
        if (index === 0) {
          item.classList.add("active");
        }
      });
      this.createNavItems();
      this.rotationInterval = setInterval(() => this.rotateSlides(), this.interval);
      this.sliderContainer.addEventListener("mouseover", () => {
        clearInterval(this.rotationInterval);
      });
      this.sliderContainer.addEventListener("mouseout", () => {
        this.rotationInterval = setInterval(() => this.rotateSlides(), this.interval);
      });
    }
  }
  
  const createSliderObject = ()=> {
    const sliderContainer = document.querySelector(".slider__section--container");
    const navContainer = document.querySelector(".slider__navegation--container");
    const slider = new Slider(sliderContainer, navContainer);
  }
//   document.addEventListener("DOMContentLoaded", createSliderObject);