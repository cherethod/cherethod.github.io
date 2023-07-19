const getTodaysDate = ()=> {
    const today = new Date();
    return today;
}

const counterElement = document.querySelector('.contador');
const searchBtn = document.querySelector(('.start__btn'));
const minsElement = document.getElementById('mins');
const secsElement = document.getElementById('secs');
const checkDateSaved = localStorage.getItem('seoCheckerLastUse')


const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  const updateCounter = (minsElement, secsElement, remainingTime) => {
    const mins = Math.floor(remainingTime / 1000 / 60).toString().padStart(2, '0');
    const secs = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');
    minsElement.textContent = mins;
    secsElement.textContent = secs;
  };

// Mostrar el contador y actualizarlo cada segundo
counterElement.style.display = 'grid';
searchBtn.style.display = 'none';



counterElement.style.display = 'none'; 
searchBtn.style.display = 'block';

if (checkDateSaved != null) {
    const fullSavedDate = checkDateSaved.split('-');
    const fullCalendar = fullSavedDate[0].split('/');
    const fullTime = fullSavedDate[1].split(':');
    const day = fullCalendar[0];
    const month = fullCalendar[1];
    const year = fullCalendar[2];
    const hour = fullTime[0];
    const minutes = fullTime[1];
    const seconds = fullTime[2];
    const getSavedDate = new Date(`${month} ${day}, ${year} ${hour}:${minutes}:${seconds}`)

    const remainingTime = (getTodaysDate() - getSavedDate)
    updateCounter(minsElement, secsElement, remainingTime);

    while (remainingTime > 0) {
    delay(1000);
    remainingTime -= 1000;
    updateCounter(minsElement, secsElement, remainingTime);
    }

    console.log()
    if (day < getTodaysDate().getDate().toString() || month != getTodaysDate().getMonth().toString()) {
        alert()
    }
} else {
    localStorage.setItem('seoCheckerLastUse', `${getTodaysDate().getDate()}/${getTodaysDate().getMonth()}/${getTodaysDate().getFullYear()} - ${getTodaysDate().getHours()}:${getTodaysDate().getMinutes()}:${getTodaysDate().getSeconds()}`)    
}

// console.log(checkDateSaved)

// console.log(getDate().getHours())