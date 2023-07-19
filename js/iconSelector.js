const activeIconSelector = ()=> {
    const iconSelection = document.querySelector('#iconSelectionToggle');
    iconSelection.addEventListener('click', (e)=> {
    document.querySelector('#markerIconSelection').classList.toggle('active');
    });
};
document.addEventListener('DOMContentLoaded', function () {
    const iconItems = document.querySelectorAll('.marker__icon--item');
    iconItems.forEach(icon => {
        icon.addEventListener('click', (e)=> {
            let selectedIcon = document.querySelector('.marker__icon--item.selected');
            const iconsContainer = document.querySelector('#markerIconSelection');
            const iconSelectedText = document.querySelector('#selectedIconName');
            
            if (selectedIcon !== null && selectedIcon !== e.target.closest('.marker__icon--item')) {
                selectedIcon.classList.remove('selected');
                e.target.closest('.marker__icon--item').classList.add('selected')
            }
            else {
                e.target.closest('.marker__icon--item').classList.add('selected')
            }
            iconsContainer.classList.remove('active');
            iconSelectedText.textContent = `Selected icon: ${e.target.closest('.marker__icon--item').children[0].children[0].href.baseVal.split('#')[1]}`
            console.log(selectedIcon)
            console.log(e.target.closest('.marker__icon--item').children[0].children[0].href.baseVal.split('#')[1])
        });
    });
});
export { activeIconSelector }