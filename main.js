const buildListElement = document.querySelector('.builds__list');
const buildDetailsElement = document.querySelector('.build__details--container')

const ascendancies = {
    Elementalist : ["https://poe.ninja/images/classes/Elementalist_avatar.png", "Elementalist", '#7070ff'],
    Occultist : ["https://poe.ninja/images/classes/Occultist_avatar.png", "Occultist", '#7070ff'],
    Deadeye: ["https://poe.ninja/images/classes/Deadeye_avatar.png", "Deadeye", '#70ff70'],
    Raider: ["https://poe.ninja/images/classes/Raider_avatar.png", "Raider", '#70ff70'],
    Parhfinder: ["https://poe.ninja/images/classes/Pathfinder_avatar.png", "Pathfinder", '#70ff70'],
    Juggernaut : ["https://poe.ninja/images/classes/Juggernaut_avatar.png", "Juggernaut", '#e05030'],
    Gladiator : ["https://poe.ninja/images/classes/Gladiator_avatar.png", "Gladiator", '#e0e070'],
    Inquisitor : ["https://poe.ninja/images/classes/Inquisitor_avatar.png", "Inquisitor", '#c040ff'],
    Hierophant : ["https://poe.ninja/images/classes/Hierophant_avatar.png", "Hierophant", '#c040ff'],
    Trickster : ["https://poe.ninja/images/classes/Trickster_avatar.png", "Trickster", '#30c0d0'],
    Chieftain: ["https://poe.ninja/images/classes/Chieftain_avatar.png","Chieftain", '#e05030']
}
const listOfBuilds = ["Ignite Ethereal Knives", "Venom Gyre", "Cold Dot Elementalist", "Cold Dot Trickster", "Boneshatter Jugger", "Artillery Ballista", "Corrupting Fever", "Vortex WintertideBrand", "Poisonous Concoction", "Toxic Rain", "Spark Inquisitor", "Bladefall Blade Blast", "Vortex Ignite", "SST Bleed Glad", "Consecrated Path Totems Chieftain", "Enkis Arc Witch", "Freezing pulse / Ice Spear", "Bane Occultist", "Cold Blade Vortex", "Hydrosphere Occultist", "Lightning Conduit", "Caustic Arrow / Toxic Rain - Heist"]

const starterBuilds = [
    /* NAME_OF_BUILD : [ HAS_POB, HAS_LEVELING_GUIDE, LINK_TO_BUILD, IMG_SRC, ASCENDANCE_IMG, ASCENDANCE_NAME, ADDITIONAL LINKS, [LINKS] ] */
    ["Ignite Ethereal Knives", false, false, "https://poe.ninja/challenge/builds/char/HardPrimat/Atza_LCBoom?i=4&search=skill%3DEthereal-Knives%26sort%3Ddps", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/c/c6/Ethereal_Knives_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1], ascendancies.Elementalist[2], false ],
    ["Venom Gyre", true, true, "https://pastebin.com/T66FtWj8", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/8/87/Venom_Gyre_skill_icon.png", ascendancies.Deadeye[0], ascendancies.Deadeye[1],ascendancies.Deadeye[2], false],
    ["Cold Dot Elementalist", true, false, "https://pobb.in/Dn8NmIPTsRmN", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1], ascendancies.Elementalist[2], false],
    ["Cold Dot Trickster", true, true, "https://pastebin.com/vkyj09nE", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Trickster[0], ascendancies.Trickster[1],ascendancies.Trickster[2], false],
    ["Boneshatter Jugger", true, false, "https://pobb.in/2CeoUfE7a_Kh","https://www.poewiki.net/images/4/4f/Boneshatter_skill_icon.png", ascendancies.Juggernaut[0], ascendancies.Juggernaut[1],ascendancies.Juggernaut[2], false ],
    ["Artillery Ballista", true, false, "https://docs.google.com/spreadsheets/d/1h1Perq4qn16sBO1KtgIUgdQvAUAB8ADjrPe-FkXJOuM/edit#gid=0", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/ae/Artillery_Ballista_skill_icon.png", ascendancies.Raider[0], ascendancies.Raider[1],ascendancies.Raider[2], false],
    ["Corrupting Fever", true, true, "https://docs.google.com/spreadsheets/d/10GrhukrSPpC-mhMenIutX2sGpQdk4YOGfRsaYUN8_IU/edit?usp=sharing", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/3/3c/Corrupting_Fever_skill_icon.png", ascendancies.Gladiator[0], ascendancies.Gladiator[1],ascendancies.Gladiator[2], false],
    ["Vortex WintertideBrand", true, false, "https://pastebin.com/6UZwR4GB", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Occultist[0], ascendancies.Occultist[1],ascendancies.Occultist[2], false],
    ["Spark Inquisitor", true, true, "https://pastebin.com/iHZQyKhd", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/a/a6/Spark_skill_icon.png", ascendancies.Inquisitor[0], ascendancies.Inquisitor[1],ascendancies.Inquisitor[2], false],
    ["Poisonous Concoction", true, true, "https://pastebin.com/knQvkvLT", "https://www.poewiki.net/images/3/38/Poisonous_Concoction_skill_icon.png", ascendancies.Occultist[0], ascendancies.Occultist[1],ascendancies.Occultist[2], false],    
    ["Toxic Rain", true, true, "https://pobb.in/MqBwqqTLVBhW", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/c/cf/Toxic_Rain_skill_icon.png", ascendancies.Parhfinder[0], ascendancies.Parhfinder[1],ascendancies.Parhfinder[2], false],
    ["Bladefall Blade Blast", true, true, "https://maxroll.gg/poe/build-guides/bladefall-bladeblast-occultist-league-starter-guide#patoc-heading-15", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/7/7b/Blade_Blast_skill_icon.png", ascendancies.Occultist[0], ascendancies.Occultist[1],ascendancies.Occultist[2], false],
    ["Vortex Ignite", true, false, "https://pobb.in/Wpgkn_eNGegH", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1], ascendancies.Elementalist[2], false],
    ["SST Bleed Glad", true, true, "https://docs.google.com/spreadsheets/d/e/2PACX-1vQKSQdtZzkc8ZJLoNL5opiu26rkT6JXYV1QIAlqBhdw7Ez1eoR-3JQQyQ8h6AJKr1RXsytaitm2nzYg/pubhtml", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/8/8f/Spectral_Shield_Throw_skill_icon.png", ascendancies.Gladiator[0], ascendancies.Gladiator[1],ascendancies.Gladiator[2], false],
    ["Consecrated Path Totems Chieftain", true, false, "https://pastebin.com/LdmrDQHM", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/f/f7/Consecrated_Path_skill_icon.png", ascendancies.Chieftain[0], ascendancies.Chieftain[1],ascendancies.Chieftain[2], false ],
    ["Enkis Arc Witch", true, true, "https://www.pathofexile.com/forum/view-thread/1147951", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/08/Arc_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1], ascendancies.Elementalist[2], false],
    ["Freezing pulse / Ice Spear", true, true, "https://pastebin.com/U6BGkuw1","https://static.wikia.nocookie.net/pathofexile_gamepedia/images/1/1b/Freezing_Pulse_skill_icon.png", ascendancies.Hierophant[0], ascendancies.Hierophant[1],ascendancies.Hierophant[2], false],
    ["Bane Occultist", true, true, "https://pastebin.com/nNZPVUQj", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/2/2f/Bane_skill_icon.png", ascendancies.Occultist[0], ascendancies.Occultist[1],ascendancies.Occultist[2], true, [["3.20 Atlas", "https://poeplanner.com/AwAAAwAZAAMBAF8Ait83-duD4mH3g-vvlSba9m0TPTYJ-3sQJ5PgVQzInnWKGdXwsH2PGi94es_SfR_QQ2rIG8uHOr4Vzxh9LpXuHgK5QlB-wc_XB1ga2x4H8Cr-RnQGiyT0CIucxlWIJljmiy30IuoiNVM6w4jvir5IDqsPqp2Kxq5UMLcpUrFJBwQfk5YRvxYKKyunWlgZbUi1BaQBMpunCRSzTIJ2UUkLbOV8UBH6j8cfQFwvoYxsGbLFwdtr0bQY7LyvTx2E4wAACAB6QthpB5HdYnB68HyhflR6CABdLxq6eaW26CQBffspVfXGGCsXlvj_8t4mNlYLvwQVLQQAAP______________________AAACAAAAAwD_____________PAAAAAAUAB-LCAAAAAAAAAMDAAAAAAAAAAAA"], ["Crafting Sheet", "https://docs.google.com/spreadsheets/d/1O54mt-OR9iKl6M6-spoNLE18ankeTWQc9n5zhD2ztp8/edit#gid=1431444864"]]],
    ["Cold Blade Vortex", true, true, "https://pastebin.com/YdKEb607", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/00/Blade_Vortex_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1], ascendancies.Elementalist[2], false],
    ["Hydrosphere Occultist", true, true, "https://pastebin.com/KptEhxUr", "https://static.wikia.nocookie.net/pathofexile_gamepedia/images/0/06/Vortex_skill_icon.png", ascendancies.Occultist[0], ascendancies.Occultist[1], ascendancies.Occultist[2], false],
    ["Lightning Conduit", true, false, "https://pobb.in/u/Lolcohol/NUfq9M21A9CW", "https://www.poewiki.net/images/d/d0/Lightning_Conduit_skill_icon.png", ascendancies.Elementalist[0], ascendancies.Elementalist[1], ascendancies.Elementalist[2], false],
    ["Caustic Arrow / Toxic Rain - Heist", true, true, "https://pobb.in/u/Guitaraholic/9AgmFjQ6pq43", "https://www.poewiki.net/images/9/92/Caustic_Arrow_skill_icon.png", ascendancies.Raider[0], ascendancies.Raider[1],ascendancies.Raider[2], false]
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
    await cleanDisplay()
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
                ascenName.setAttribute('class', 'ascen__name');
                ascenName.style.color=elem[7]
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
                if (elem[8]) {
                    // console.log(elem[8])
                    for (let i = 0; i < elem[9].length; i++) {
                        const addLinks = elem[9][i];
                        let additionalLink = document.createElement('P');
                        additionalLink.setAttribute('class', 'build__link');
                        additionalLink.innerHTML = `<a style='color:#75ddf7' href=${elem[9][i][1]} target='_blank'>${elem[9][i][0]}</a>`;
                        buildDetailsFragment.appendChild(additionalLink)
                        // console.log(addLinks)
                    }
                    buildDetailsFragment.appendChild(buildLink)
                 } else {
                    buildDetailsFragment.appendChild(buildLink)
                }

                /* DETAILS SECTION END */ 

                buildDetailsElement.appendChild(buildDetailsFragment)
            }        
        })
    
}
