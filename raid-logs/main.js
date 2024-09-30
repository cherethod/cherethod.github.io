async function getPlayerData() {
    const response = await fetch('data.json')
    const data = await response.json()
    return data.standings.roster[2].standings.player
}



const class_icons = {
    "Paladin": "https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg",
    "Warrior": "https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg",
    "Hunter": "https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg",
    "Rogue": "https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg",
    "Priest": "https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg",
    "Death Knight": "https://wow.zamimg.com/images/wow/icons/large/classicon_deathknight.jpg",
    "Shaman": "https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg",
    "Mage": "https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg",
    "Warlock": "https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg",
    "Druid": "https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg"
}

const playerFragment = document.createDocumentFragment()   


const playerData = getPlayerData().then(data => {
   data.map(player => {
        const playerName = player.name.split('-')[0]
        const playerDiv = document.createElement('div')
        playerDiv.classList.add('player')
        const playerImg = document.createElement('img')
        playerImg.src = class_icons[player.class]
        playerDiv.appendChild(playerImg)
        const playerNameTitle = document.createElement('h2')
        const playerLogLink = document.createElement('a')
        playerLogLink.href = `https://es.classic.warcraftlogs.com/character/eu/mandokir/${playerName}#difficulty=3&size=25`
        playerLogLink.target = '_blank'
        playerLogLink.textContent = playerName
        playerNameTitle.appendChild(playerLogLink)
        playerDiv.appendChild(playerNameTitle)
        playerFragment.appendChild(playerDiv)

    })
    document.querySelector('.players').appendChild(playerFragment)
})







