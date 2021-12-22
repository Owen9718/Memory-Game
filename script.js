const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let noClicking = false;
let cardsFlipped = 0;
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(event) {

    if (noClicking) return;
    if (event.target.classList.contains("flipped")) return;

    let currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList[0];
    console.log("you just clicked", event.target);

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        card1 = card1 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }

    if (card1 && card2) {
        noClicking = true;
        let card1Color = card1.classList[0]
        let card2Color = card2.classList[0];


        if (card1Color === card2Color) {
            card1.removeEventListener('click', handleCardClick);
            card2.removeEventListener('click', handleCardClick);
            card1 = null;
            card2 = null;
            noClicking = false;
            cardsFlipped += 2;
        }
        else {
            setTimeout(function () {
                card1.style.backgroundColor = ''
                card2.style.backgroundColor = ''
                card1.classList.remove('flipped')
                card2.classList.remove('flipped')
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000)
        }
    }
    if (cardsFlipped === COLORS.length) {
        alert("GAME OVER!")
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);
