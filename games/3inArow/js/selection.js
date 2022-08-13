const input = document.getElementById('playername_input');
const keyboardKey = document.querySelectorAll('.keyboard__key');
let playerOneName = 'Jugador 1';
let playerTwoName = 'Jugador 2';
let avatarsPlayerOne = [];
let avatarsPlayerTwo = [];
let playerOneSymbol = undefined;
let playerTwoSymbol = undefined;
let currentPlayer = undefined;
let round = 0;
let winner = false;
let possibilities = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,6,9],
    [3,5,7],
    [4,5,6],
    [7,8,9]
 ]

const player = {
    playerSide: undefined,
    // playerName: `Jugador ${this.playerSide}`,
    playerAvatar: 'default',
    playerLifes: 5
}

class game {
    constructor (name, status) {        
    this.gameName = name;
    this.gameStatus = status;    
    }
    resetValues() {        
        playerOneName = 'Jugador 1';
        playerTwoName = 'Jugador 2';
        avatarsPlayerOne = [];
        avatarsPlayerTwo = [];
        playerOneSymbol = undefined;
        playerTwoSymbol = undefined;
        currentPlayer = undefined;
        round = 0;
        winner = false;
    }

}

class tresEnRaya extends game {
    constructor (name, status) {
    super (name, status);
    }
    cleanGrid() {
        let cells = document.querySelectorAll('.game__grid');
        cells.forEach(cell => {
            cell.innerHTML='';
            cell.classList.remove('grid--disabled');
            cell.style.backgroundColor='#FFF';
        });
    }
    launchGame() {
        document.querySelector('.lobby').style.display='none';
        document.querySelector('.select__playernames').style.display='flex';
        this.gameStatus = 'started';
        currentPlayer=1;
        document.getElementById('current_player').innerHTML=playerOneName.toUpperCase();
        initKeyboard();
    }
    setPlayerName() {
        let playerName = input.value;
        if (currentPlayer === 1) {
            playerOneName=playerName.toUpperCase();
            currentPlayer = 2; 
            document.getElementById('player1_name').innerHTML=playerName;
            input.value='';
            input.placeholder=playerTwoName.toUpperCase();
            document.getElementById('current_player').innerHTML=playerTwoName.toUpperCase();
        } else {
            playerTwoName = playerName.toUpperCase();
            document.getElementById('player2_name').innerHTML=playerTwoName;
            this.gameStatus = 'select avatars'
            this.setAvatars();
        }
    }
    setAvatars() {
        document.querySelector('.current__player').innerHTML=playerOneName;
        document.querySelector('.select__playernames').style.display='none';
        document.querySelector('.select__avatar').style.display='flex';
        currentPlayer = 1;
        const avatars = document.querySelectorAll('.avatar__img');
        avatars.forEach(avatar => {
            avatar.addEventListener('click', (avatar)=> {
                this.setPlayerAvatar(avatar);
            })
        })
    }
    setPlayerAvatar(elem) {
        let selectedAvatar = elem.target.attributes.src.value;
        function colectPlayerAvatars () {
            let mainAvatar = selectedAvatar
            let cutSrc = mainAvatar.indexOf('__');
            mainAvatar = mainAvatar.split('',cutSrc);
            let baseSrc = mainAvatar.join('');
            let loseAvatar = baseSrc+'__lose.png';
            let winAvatar = baseSrc+'__win.png';
            if (currentPlayer===1) {
                avatarsPlayerOne.push(selectedAvatar, loseAvatar, winAvatar)
            } else {
                avatarsPlayerTwo.push(selectedAvatar, loseAvatar, winAvatar);
            }
        }
        if (currentPlayer===1) {
            document.getElementById('player1_avatar').src=selectedAvatar;        
            colectPlayerAvatars();
            // alert()
            currentPlayer=2;
            document.querySelector('.current__player').innerHTML=playerTwoName;            
        } else {            
            document.getElementById('player2_avatar').src=selectedAvatar;
            document.querySelector('.select__avatar').style.display='none';
            colectPlayerAvatars();
            currentPlayer=1
            this.gameStatus = 'select symbol';
            this.setSymbol();
        }
    }
    setSymbol() {
        alert()
        document.querySelector('.select__symbol--container').style.display='grid';
        alert()
        document.getElementById('player_select-symbol').innerHTML=(currentPlayer==1) ? playerOneName : playerTwoName;
        let symbols = document.querySelectorAll('.select__symbol');
        symbols.forEach(symbol => {
            symbol.addEventListener('click', (e)=> {
                alert('EVENT')
            if  (e.target.id === 'cross') {
                alert('Set symbol')
                 playerOneSymbol = 'X';
                 playerTwoSymbol = 'O';
            } else {
                playerOneSymbol = 'O';
                playerTwoSymbol = 'X';
            }             
            // this.gameStatus='in game';     
            })
        })        
        let finishButtons = document.querySelectorAll('.cta--finish');   
        finishButtons.forEach(btn => (btn.classList.contains('cta__flex--left')) ? btn.style.display='inline-block' :  btn.style.display='none');        
        this.gameStatus='in game';  
        this.startGame();
    }
    startGame() {                   
        document.querySelector('.select__symbol--container').style.display='none';
        document.querySelector('.game__container').style.display='grid';
        document.getElementById('player1_avatar_ig').src=document.getElementById('player1_avatar').src;
        document.getElementById('player2_avatar_ig').src=document.getElementById('player2_avatar').src;
        (this.gameStatus==='in game') ? document.querySelector('.game__container--player1').style.opacity='1' : document.querySelector('.game__container--player2').style.opacity='1';
        document.getElementById('player_in_turn').innerHTML= (currentPlayer===1) ? playerOneName : playerTwoName;
        let cells = document.querySelectorAll('.game__grid');
        cells.forEach(cell => {
            // cell.classList.remove('grid--disabled');
            cell.addEventListener('click', e=> {
                this.setRound(e);
            })
        })                
    }
    checkCell(cell){
        (round<10 && winner===false && cell.target.innerHTML === '') ?  (
            (currentPlayer===1) ? (
                cell.target.innerHTML=playerOneSymbol,
                round++,
                document.querySelector('.game__container--player1').style.opacity='0.2',
                document.querySelector('.game__container--player2').style.opacity='1',          
                document.getElementById('player_in_turn').innerHTML=  playerTwoName
            ) : (
                cell.target.innerHTML=playerTwoSymbol,
                round++,
                document.querySelector('.game__container--player1').style.opacity='1',
                document.querySelector('.game__container--player2').style.opacity='0.2',
                document.getElementById('player_in_turn').innerHTML= playerOneName
            )
        ) : alert('Esta casilla ya está en uso!');
    }
    checkRound(id) {
        let selectedCell = `${id.target.id}`;
        selectedCell = Number(selectedCell.slice(-1)); 
        let targetRows = [];
        for (let i = 0; i < possibilities.length; i++) {
            const row = possibilities[i];
            if (row.includes(selectedCell)) {
                targetRows.push(row);
            }
        }
        if (currentPlayer==1) {
            for (let i = 0; i < targetRows.length; i++) {
                const cells = targetRows[i];
                let val1 = cells[0];
                let val2 = cells[1];
                let val3 = cells[2];
                let cell1 = document.getElementById(`game_grid_${val1}`).innerHTML;
                let cell2 = document.getElementById(`game_grid_${val2}`).innerHTML;
                let cell3 = document.getElementById(`game_grid_${val3}`).innerHTML;
                // console.log(cell1, cell2, cell3)
// 
                if (cell1 === cell2 && cell1 ===cell3) {
                    // alert()
                    winner = 1;
                    this.gameStatus = 'game end';
                    document.getElementById(`game_grid_${val1}`).style.backgroundColor='rgba(28, 182, 28, .60)';
                    document.getElementById(`game_grid_${val2}`).style.backgroundColor='rgba(28, 182, 28, .60)';
                    document.getElementById(`game_grid_${val3}`).style.backgroundColor='rgba(28, 182, 28, .60)';
                    this.gameFinished();
                } else {
                    currentPlayer = 2;
                }
            
            }
        } else {
            for (let i = 0; i < targetRows.length; i++) {
                const cells = targetRows[i];
                let val1 = cells[0];
                let val2 = cells[1];
                let val3 = cells[2];
                let cell1 = document.getElementById(`game_grid_${val1}`).innerHTML;
                let cell2 = document.getElementById(`game_grid_${val2}`).innerHTML;
                let cell3 = document.getElementById(`game_grid_${val3}`).innerHTML;

                if (cell1 === cell2 && cell1 ===cell3) {
                    // alert()
                    winner = 2;
                    this.gameStatus = 'game end';
                    document.getElementById(`game_grid_${val1}`).style.backgroundColor='rgba(28, 182, 28, .60)';
                    document.getElementById(`game_grid_${val2}`).style.backgroundColor='rgba(28, 182, 28, .60)';
                    document.getElementById(`game_grid_${val3}`).style.backgroundColor='rgba(28, 182, 28, .60)';
                    this.gameFinished();
                } else {                    
                    currentPlayer = 1;
                }            
            }
        }
    }
    gameFinished() {
        let grids = document.querySelectorAll('.game__grid');
        let buttons = document.querySelectorAll('.cta--finish');
        grids.forEach(grid => grid.classList.add('grid--disabled'));        
        document.querySelector('.game__container--player1').style.opacity='1';
        document.querySelector('.game__container--player2').style.opacity='1';
        document.querySelector('.game__paragraph').innerHTML='HA GANADO EL JUGADOR: ';
        (winner==1) ? document.querySelector('.game__paragraph').innerHTML+=`<span id='player_in_turn'>${playerOneName}<span/>` : document.querySelector('.game__paragraph').innerHTML+=`<span id='player_in_turn'>${playerTwoName}<span/>`
        //  AVATARS [ default , lose , win ]  //
        switch (winner) {
            case 0:
                document.querySelector('.game__paragraph').innerHTML='EMPATE';
                document.getElementById('player1_avatar_ig').src=avatarsPlayerOne[1];
                document.getElementById('player2_avatar_ig').src=avatarsPlayerTwo[1];
                break;
        
            case 1:
                document.getElementById('player1_avatar_ig').src=avatarsPlayerOne[2];
                document.getElementById('player2_avatar_ig').src=avatarsPlayerTwo[1];
                break;
            
            case 2:
                document.getElementById('player1_avatar_ig').src=avatarsPlayerOne[1];
                document.getElementById('player2_avatar_ig').src=avatarsPlayerTwo[2];
                break;
        }
        buttons.forEach(btn => btn.style.display='inline-block')
    }
    setRound(cell) {
        this.checkCell(cell)
        this.checkRound(cell)
        if (round === 9 && winner==false) {
            winner = 0;
            this.gameFinished();
        }
    }
    exitGame() {        
        this.cleanGrid();
        this.resetValues();
        document.querySelector('.game__container').style.display='none';        
        document.querySelector('.lobby').style.display='flex';
        let finishButtons = document.querySelectorAll('.cta--finish');
        finishButtons.forEach(btn => btn.style.display='none');
    }
    nextGame() {        
        this.cleanGrid();
        currentPlayer = 1;
        round = 0;
        winner = false;
        document.getElementById('player1_avatar_ig').src=avatarsPlayerOne[0];
        document.getElementById('player2_avatar_ig').src=avatarsPlayerTwo[0];
        document.querySelector('.game__container').style.display='grid';        
        document.querySelector('.lobby').style.display='none';
        let finishButtons = document.querySelectorAll('.cta--finish');
        finishButtons.forEach(btn => (btn.classList.contains('cta__flex--left')) ? btn.style.display='inline-block' :  btn.style.display='none');
    }
}

const backspace = inputValue => {
    let valueToFix = inputValue;
    let newValue = '';
    for (let i = 0; i < valueToFix.length-1; i++) {
        const word = valueToFix[i];
        newValue += word;
    }
    return newValue;
}

const initKeyboard = ()=> {
    input.value= '';
    keyboardKey.forEach(key => key.addEventListener('click', ()=>{
        value = ''
        if (key.classList.contains('keyboard__key--space') || key.classList.contains('keyboard__key--backspace')) {
             if (key.classList.contains('keyboard__key--space')) { 
               value= ' '
               input.value+=value;
            } else { 
            value = backspace(input.value);
            input.value=value;
            }
        } else {
            value = key.innerHTML;
            input.value+=value;
        } 
    })
    )
}
const tresEnRaya_App= new tresEnRaya('3 en raya', 'stoped')