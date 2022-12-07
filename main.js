const buildListElement = document.querySelector('.builds__list');
const buildDetailsElement = document.querySelector('.build__details--container')

const ascendancies = {
    Elementalist : ["https://poe.ninja/images/classes/Elementalist_avatar.png", "Elementalist"],
    Occultist : ["https://poe.ninja/images/classes/Occultist_avatar.png", "Occultist"],
    Deadeye: ["https://poe.ninja/images/classes/Deadeye_avatar.png", "Deadeye"],
    Raider: ["https://poe.ninja/images/classes/Raider_avatar.png", "Raider"],
    Juggernaut : ["https://poe.ninja/images/classes/Juggernaut_avatar.png", "Juggernaut"],
    Gladiator : ["https://poe.ninja/images/classes/Gladiator_avatar.png", "Gladiator"],
    Inquisitor : ["https://poe.ninja/images/classes/Inquisitor_avatar.png", "Inquisitor"]
}
const listOfBuilds = ["Ignite_Ethereal_Knives", "Venom_Gyre", "Cold_Dot", "Boneshatter_Jugger", "Artillery_Ballista", "Corrupting_Fever", "Vortex_WintertideBrand", "Poisonous_Concoction", "Toxic_Rain", "Spark_Inquisitor"]

const starterBuilds = [
    /* NAME_OF_BUILD : [ HAS_POB, HAS_LEVELING_GUIDE, LINK_TO_BUILD, IMG_SRC, ASCENDANCE_IMG, ASCENDANCE_NAME ] */
    ["Ignite_Ethereal_Knives", false, false, "https://poe.ninja/challenge/builds/char/HardPrimat/Atza_LCBoom?i=4&search=skill%3DEthereal-Knives%26sort%3Ddps", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/c/c6/Ethereal_Knives_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1] ],
    ["Venom_Gyre", true, true, "https://pastebin.com/T66FtWj8", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/8/87/Venom_Gyre_skill_icon.png", ascendancies.Deadeye[0], ascendancies.Deadeye[1]],
    ["Cold_Dot", true, undefined, "https://pobb.in/Dn8NmIPTsRmN", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1]],
    ["Boneshatter_Jugger", true, false, "https://pobb.in/2CeoUfE7a_Kh","https://www.poewiki.net/images/4/4f/Boneshatter_skill_icon.png", ascendancies.Juggernaut[0], ascendancies.Juggernaut[1] ],
    ["Artillery_Ballista", true, false, "https://docs.google.com/spreadsheets/d/1h1Perq4qn16sBO1KtgIUgdQvAUAB8ADjrPe-FkXJOuM/edit#gid=0", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/ae/Artillery_Ballista_skill_icon.png", ascendancies.Raider[0], ascendancies.Raider[1]],
    ["Corrupting_Fever", true, true, "https://docs.google.com/spreadsheets/d/10GrhukrSPpC-mhMenIutX2sGpQdk4YOGfRsaYUN8_IU/edit?usp=sharing", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/3/3c/Corrupting_Fever_skill_icon.png", ascendancies.Gladiator[0], ascendancies.Gladiator[1]],
    ["Vortex_WintertideBrand", true, false, "https://pastebin.com/6UZwR4GB", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Occultist[0], ascendancies.Occultist[1]],
    ["Spark_Inquisitor", true, true, "https://pastebin.com/iHZQyKhd", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/a6/Spark_skill_icon.png", ascendancies.Inquisitor[0], ascendancies.Inquisitor[1]]
]

let buildListFragment = document.createDocumentFragment()

listOfBuilds.map(build => {
    let buildListItem = document.createElement('LI');
    buildListItem.innerHTML = build;
    buildListItem.setAttribute('class', 'builds__list--item');
    buildListItem.setAttribute('onclick', `displaySelectedBuild('${build}')`)
    buildListFragment.appendChild(buildListItem);
})
buildListElement.appendChild(buildListFragment);

const cleanDisplay = ()=> {
    if (buildDetailsElement.childElementCount>0) {
        do {
            buildDetailsElement.removeChild(buildDetailsElement.children[0])
        } while (buildDetailsElement.childElementCount>0);
    }
}


const displaySelectedBuild = async (buildSelected)=> {
    await cleanDisplay();
    starterBuilds.map(elem => {
        if (elem[0] == buildSelected) {
            let buildDetailsFragment = document.createDocumentFragment()
            /* SPELL ICON START */
            let spellIcon = document.createElement('IMG');
            spellIcon.setAttribute('src', elem[4]);
            spellIcon.setAttribute('class', 'spell__icon--img');
            buildDetailsFragment.appendChild(spellIcon);
            /* SPELL ICON END */
            /* -------------- */
            /* ASCENDANCE ICON START */
            let ascendIcon = document.createElement('IMG');
            ascendIcon.setAttribute('src', elem[5])
            ascendIcon.setAttribute('class', 'ascen__icon--img')
            buildDetailsFragment.appendChild(ascendIcon)
            /* ASCENDANCE ICON END */
            /* ------------------- */
            /* ASCENDANCE NAME START */ 
            let ascenName = document.createElement('P');
            ascenName.innerHTML = elem[6];
            ascenName.setAttribute('class', 'ascen__name')
            buildDetailsFragment.appendChild(ascenName)
            /* ASCENDANCE NAME END */ 
            /* ------------------- */
            /* DETAILS SECTION START */ 
            let infoDetails = document.createElement('DIV');
            infoDetails.setAttribute('class', 'build__info--details');

            let POBContainer = document.createElement('DIV');
            POBContainer.setAttribute('class', 'pob__container');

            let hasPOB = document.createElement('P')
            hasPOB.setAttribute('class', 'pob__text')
            hasPOB.innerHTML='POB LINK?'
            POBContainer.appendChild(hasPOB);
            let POBCheck = document.createElement('IMG');
            (elem[1]) ? POBCheck.setAttribute('src', './img/ok.png') :  POBCheck.setAttribute('src', './img/error.png');
            POBCheck.setAttribute('class', 'pob__check');

            POBContainer.appendChild(POBCheck);
            infoDetails.appendChild(POBContainer);

            let guideContainer = document.createElement('DIV');
            guideContainer.setAttribute('class', 'guide__container');

            let hasGuide = document.createElement('P')
            hasGuide.setAttribute('class', 'pob__text')
            hasGuide.innerHTML='LEVELING GUIDE?'
            guideContainer.appendChild(hasGuide);
            let guideCheck = document.createElement('IMG');
            (elem[1]) ? guideCheck.setAttribute('src', './img/ok.png') :  guideCheck.setAttribute('src', './img/error.png');
            guideCheck.setAttribute('class', 'guide__check');

            guideContainer.appendChild(guideCheck);
            infoDetails.appendChild(guideContainer);

            buildDetailsFragment.appendChild(infoDetails);

            let buildLink = document.createElement('P');
            buildLink.setAttribute('class', 'build__link');
            buildLink.innerHTML = `${elem[0]} build: <a style='color:#75ddf7' href=${elem[3]} target='_blank'>${elem[3]}</a>`;

            buildDetailsFragment.appendChild(buildLink)

            /* DETAILS SECTION END */ 

            buildDetailsElement.appendChild(buildDetailsFragment)
        }        
    })
}
