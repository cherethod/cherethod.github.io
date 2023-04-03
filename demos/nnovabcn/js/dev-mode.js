let devModeStatus = false;
const parent = document.querySelector('.container')

const createDevModeBtn = ()=> {
    let devModeBtn = document.createElement('DIV');
    devModeBtn.style.width="60px";
    devModeBtn.style.height="60px";
    devModeBtn.style.display='flex';
    devModeBtn.style.placeContent='center';
    devModeBtn.style.placeItems='center';
    devModeBtn.style.position='absolute';
    devModeBtn.style.top='25px';
    devModeBtn.style.right='25px';
    devModeBtn.style.backgroundColor='orange';
    devModeBtn.style.userSelect='none';
    devModeBtn.style.cursor='pointer';
    devModeBtn.classList.add('devmode__btn');
    devModeBtn.innerText='DEV';
    parent.appendChild(devModeBtn);
}
let createDevModeListener = ()=> {
    let devModeBtn = document.querySelector('.devmode__btn');
    devModeBtn.addEventListener('click', (e)=> {
        (devModeStatus) ? (
            parent.classList.remove('dev__mode'),
            devModeStatus = false
            ) : (
                parent.classList.add('dev__mode'),
                devModeStatus = true
            )

        
    })
}

(function(){    
    createDevModeBtn();
    createDevModeListener();
})()