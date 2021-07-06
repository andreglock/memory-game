// The following line makes sure your styles are included in the project. Don't remove this.
import '../styles/main.scss';
// Import any additional modules you want to include below \/
import dogOne from './../images/dogOne.jpg'; // Tell webpack this JS file uses those images
import dogTwo from './../images/dogTwo.jpg';
import pacOne from './../images/pacOne.jpg';
import pacTwo from './../images/pacTwo.jpg';
import eggOne from './../images/eggOne.jpg';
import eggTwo from './../images/eggTwo.jpg';
import back from './../images/back.jpg'


// \/ All of your javascript should go here \/
const cards = [
    {
        pair: 1,
        title: "Black Dog",
        description: "A cute black dog",
        img: dogOne,
    },
    {
        pair: 1,
        title: "White Dog",
        description: "A cute white dog",
        img: dogTwo,
    },
    {
        pair: 2,
        title: "Pac Man Green",
        description: "O",
        img: pacOne,
    },
    {
        pair: 2,
        title: "Lorem ipsum",
        description: "Lorem ipsum",
        img: pacTwo,
    },
    {
        pair: 3,
        title: "Egg",
        description: "Omelet",
        img: eggOne,
    },
    {
        pair: 3,
        title: "Lorem ipsum",
        description: "Lorem ipsum",
        img: eggTwo,
    },
];
  
const randomCards = [];

cards.sort(() => (Math.random() - 0.5));

const gameContainer = document.getElementById("game-container")

for (let i = 0; i < cards.length; i++) {
    randomCards.push(document.createElement("div"));
    randomCards[i].className = "book m-4 d-inline-flex";
    randomCards[i].innerHTML = 
        `<div class="image-flip">
            <div class="mainflip pair${cards[i].pair}">
                <div class="frontside">
                    <div class="card">
                        <img class="card-img-cover img- fluid" src="${back}" alt="card image">
                    </div>
                </div>
                <div class="backside">
                    <div class="card" style="width:20rem;">
                        <div class="card-header">
                            ${cards[i].title}
                        </div>
                        <div class="card-body">
                            <img class="card-img-top img- fluid" src="${cards[i].img}" alt="card image">
                            <p class="card-text">${cards[i].description}</p>
                            <a href="#" class="btn btn-info btn-md">Info Button</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    gameContainer.appendChild(randomCards[i]);
}

/* const flippersBack = document.querySelectorAll(".backside");

flippersBack.forEach(element => {
    element.addEventListener("click", (e) => {
        e.target.style.webkitTransform = 'rotateY(0deg)'
        e.target.style.mozTransform = 'rotateY(0deg)'
        e.target.style.oTransform = 'rotateY(0deg)'
        e.target.style.msTransform = 'rotateY(0deg)'
        e.target.style.transform = 'rotateY(0deg)'
    })
}); */

const flippersFront = document.querySelectorAll(".mainflip");
let flipped = 0;
let moves = 0;
let pairsUncovered = 0;

flippersFront.forEach(element => {
    element.addEventListener("click", () => {
        // prevents flipping more than two || prevents flipping again
        if (flipped === 2 || element.classList.contains("flipcardTrue")) {
            return;
        }
        element.classList.toggle("flipcard") ? flipped++ : flipped--;
        element.classList.toggle("flipcardTrue");

        const flippedCards = document.querySelectorAll(".flipcardTrue");
        
        // Check for Pair
        if (flippedCards.length === 2) {     
            if (flippedCards[0].classList[1] === flippedCards[1].classList[1]) {
                flipped = 0;
                pairsUncovered++;
                moves++;
                flippedCards[0].classList.remove("flipcardTrue");
                flippedCards[1].classList.remove("flipcardTrue");
                if (pairsUncovered === 3) {
                    setTimeout(() => {
                    alert(`Congratulations you finished in ${moves} moves.`)
                    }, 1000)
                }
                return;
            }
        }

        // flip back in 2 seconds
        if (flipped === 2) {
            setTimeout(() => {
                if (flipped === 2) {
                    flippedCards.forEach(flippedCard => {
                        flippedCard.classList.toggle("flipcard");
                        flippedCard.classList.toggle("flipcardTrue");
                    flipped = 0;
                    moves++;
                    })
                } 
            }, 2000)
        }
    })
});