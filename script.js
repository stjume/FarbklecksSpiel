const gameContainer = document.getElementById('game-container');
const klecksBilder = [
    "images/klecks2.png",
    "images/klecks3.png",
    "images/klecks4.png",
    "images/klecks5.png",
    "images/klecks6.png",
    "images/klecks7.png",
    "images/klecks8.png",
    "images/klecks9.png",
    "images/klecks10.png"
]
const klecksPositionen = [];
const minDistance = 10;
// const maxRespawns = 0;
let clickCount = 0;


function createKleckse(anzahl) {
    for (let i = 0; i < anzahl; i++) {
        const randomIndex = Math.floor(Math.random() * klecksBilder.length);
        const randomBild = klecksBilder[randomIndex];

        const klecksSize = randomSize();

        const klecks = document.createElement("div");
        klecks.classList.add("klecks");
        klecks.style.backgroundImage = `url("${randomBild}")`;
        klecks.style.width = klecksSize + "px";
        klecks.style.height = klecksSize + "px";
        klecks.style.position = "absolute";
        const position = getValidPosition(klecksSize);
        klecks.style.left = position.x + "px";
        klecks.style.top = position.y + "px";
        klecks.style.backgroundSize = "contain";
        klecks.style.backgroundRepeat = "no-repeat";
        klecks.style.backgroundPosition = "center";
        // klecks.dataset.respawnsLeft = maxRespawns;

        klecksPositionen.push({x: position.x, y: position.y});

    gameContainer.appendChild(klecks);

    klecks.addEventListener("click", () => {
        // let respawnsLeft = Number(klecks.dataset.respawnsLeft);
        clickCount++;
        klecks.remove();
        if (clickCount % 3 === 0) {
            createKleckse(1);
        }
        })
    }
}


function getValidPosition(klecksGroesse) {      //random und unique x,y Koordianten
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;


    let randomX;
    let randomY;
    let validPosition = false;

    while (!validPosition) {
        randomX = Math.floor(Math.random() * (containerWidth - klecksGroesse)); // damit es am Rand nicht rausragt
        randomY = Math.floor(Math.random() * (containerHeight-klecksGroesse));
        validPosition = true;

        for (const pos of klecksPositionen) {
            const dx = randomX - pos.x;
            const dy = randomY - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy); 

            if(minDistance > distance) {
                validPosition = false;
                break;
            }
        }
    }
    return {x: randomX, y: randomY};
}

function randomSize () {
    const min = 140;
    const max = 180;
    const size = Math.random() * (max - min) + min;
    return size;
}

createKleckse(5);

