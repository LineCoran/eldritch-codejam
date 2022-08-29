import ancientsData from '../data/ancients';
import cardsDataBrown from '../data/mythicCards/brown';
import cardsDataBlue from '../data/mythicCards/blue';
import cardsDataGreen from '../data/mythicCards/green';

let threIsDifficulty = false;
let threIsAnctient = false;
let difficulty = '';
let ancient = '';
let currentNumberOfCard = 0;
let globalLinkForCard;
let currentStages;

let cardsOnFirstStage = 0;
let cardsOnSecondStage = 0;
let cardsOnThirdStage = 0;
let arrCardsAllStages = [];


const ancientsCards = document.querySelectorAll('.ancient__card');
const ancients = document.querySelectorAll('.ancient__card')
const difficultyButtons = document.querySelectorAll('.difficulty');
const mixDeckButton = document.querySelector('.mix__button');
const deckButton = document.querySelector('.deck');
const lastCard = document.querySelector('.last__card');


function listenerForDifficultyButtons() {
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', function(item) {
            for (let i = 0; i<difficultyButtons.length; i++) {
                if (difficultyButtons[i].classList.contains('difficulty-active')) {
                    difficultyButtons[i].classList.remove('difficulty-active');
                }
            }
            item.target.classList.add('difficulty-active');
            difficulty = item.target.id;
            threIsDifficulty = true;
            
        })
    }
}

function listenerForAnctientCards() {
    for (let i = 0; i < ancients.length; i++) {
        ancients[i].addEventListener('click', function(item) {
            
            for (let i = 0; i<ancients.length; i++) {
                if (ancients[i].classList.contains('ancient__card-active')) {
                    ancients[i].classList.remove('ancient__card-active');
                }
            }
            item.target.classList.add('ancient__card-active');
            ancient = item.target.id;
            threIsAnctient = true;
        })
    }
}

function startGlobalCard() {
    let brownCards = [...cardsDataBrown];
    let greenCards = [...cardsDataGreen];
    let blueCards = [...cardsDataBlue];

    return  {
        blueCards: blueCards,
        greenCards: greenCards,
        brownCards: brownCards,
    }
}

function setBackgroundImageOnAncient() {
    for (let i = 0; i<ancientsCards.length; i++) {
        ancientsCards[i].style.backgroundImage = `url(${ancientsData[i].cardFace})`;
    }
}

function findCurrentAncient() {
    let currentAncient;
    for (let i = 0; i < ancientsData.length; i++) {
        if (ancientsData[i].id == ancient)  {
            currentAncient = ancientsData[i];
        };
    }
    return currentAncient;
}

function returnRandomNum(num) {
    return (Math.floor(Math.random()*num));
}

function createMassiveCards(obj) {

    currentNumberOfCard = 0;

    let cards = startGlobalCard();

    let allStages = {
        firstStage: {...obj.firstStage},
        secondStage: {...obj.secondStage},
        thirdStage: {...obj.thirdStage}
    }

    currentStages = {
        ...allStages
    }

    console.log(allStages);
    let globalArr = [];
    for (let key in allStages) {
        let stage = [];
        for (let prop in allStages[key]) {
            let count = allStages[key][prop];
            while (count != 0) {
                let randomNum = returnRandomNum(cards[prop].length);
                if (checkCardsSetting(cards[prop][randomNum], difficulty, cards[prop])) {
                    stage.push(cards[prop][randomNum]);
                    count--;
                    cards[prop].splice(randomNum, 1);
                }
            }
        }
        globalArr.push(stage);
    }


    return globalArr;
}

function checkThereIsThisCard(colorCard, word) {
    let result = false;
    for (let i = 0; i<colorCard.length; i++) {
        if (colorCard[i].difficulty == word) {
            return true;
        }
    }
    return result;
}

function checkCardsSetting(card, setting, colorCard) {
    let result = false;

    if (setting == 'very easy') {
        let word = (checkThereIsThisCard(colorCard, 'easy'))?'easy':'normal';
        if (card.difficulty == word) {
            result = true;
        }
    } else if (setting == 'easy') {
        let word = 'hard'
        if (card.difficulty !== word) {
            result = true
        }
    } else if (setting == 'medium') {
        result = true;
    
    } else if (setting == 'hard') {
        let word = 'easy';
        if (card.difficulty !== word) {
        result = true;
        }
    } else if (setting == 'very hard') {
        let word = (checkThereIsThisCard(colorCard, 'hard'))?'hard':'normal';
        if (card.difficulty == word) {
            result = true;
        }
    }
    return result;
}


function init() {
    listenerForDifficultyButtons();
    listenerForAnctientCards();
    setBackgroundImageOnAncient();
}


init();

function createDeck() {
    if (!threIsAnctient) {
        alert('Выберите Древнего');
        return
    }

    if (!threIsDifficulty) {
        alert('Выберите сложность')
        return;
    }
    let arr = createMassiveCards(findCurrentAncient());
    globalLinkForCard = createLinkForCards(arr);

    deckButton.addEventListener('click', showNextCard);
    updageCurrentState();
}

function createLinkForCards(mainArr) {
    let cardsLink = [];

    console.log(mainArr);

    let cardsLinkWithStages = [];

    for (let i = 0; i < mainArr.length; i++) {
        let step = [];
        for (let j = 0; j < mainArr[i].length; j++) {
            step.push(mainArr[i][j]);
        } 
        cardsLinkWithStages.push(step);
    }


    for (let i = 0; i < cardsLinkWithStages.length; i++) {
        cardsLinkWithStages[i].sort(() => Math.random() - 0.5)
    }


    for (let i = 0; i<cardsLinkWithStages.length; i++) {
        for (let j = 0; j<cardsLinkWithStages[i].length; j++) {
            cardsLink.push(cardsLinkWithStages[i][j]);
        }
    }
    console.log(cardsLink);
    return cardsLink;
}

function showNextCard() {

    console.log(globalLinkForCard);
    if (currentNumberOfCard == globalLinkForCard.length) {
        alert('Колода закончилась');
        deckButton.removeEventListener('click', showNextCard);
        return;
    }
    lastCard.style.backgroundImage = `url(${globalLinkForCard[currentNumberOfCard].cardFace})`;
    

    updateValueOnCurrentState(globalLinkForCard[currentNumberOfCard].color);
    updageCurrentState();
    console.log(globalLinkForCard[currentNumberOfCard].cardFace);
    console.log(globalLinkForCard[currentNumberOfCard].color);

    currentNumberOfCard++
    
}

function updateValueOnCurrentState(color) {
    cardsOnFirstStage = sumCardsOnStage(currentStages.firstStage);
    cardsOnSecondStage = sumCardsOnStage(currentStages.secondStage);
    cardsOnThirdStage = sumCardsOnStage(currentStages.thirdStage);    

    if (cardsOnFirstStage > 0) {
            currentStages.firstStage[`${color}Cards`]-=1;
    } else if (cardsOnSecondStage > 0) {
        currentStages.secondStage[`${color}Cards`]-=1;
    } else if (cardsOnThirdStage > 0) {
        currentStages.thirdStage[`${color}Cards`]-=1;
    } else {
        alert('gameove');
    }
}

function updageCurrentState() {

    arrCardsAllStages = [];

    for (let key in currentStages) {
        for (let prop in currentStages[key]) {
            arrCardsAllStages.push(currentStages[key][prop]);
        }
    }

    let dotsInCurrentState = document.querySelectorAll('.dot');

    for (let i = 0; i < dotsInCurrentState.length; i++) {
        dotsInCurrentState[i].innerHTML = arrCardsAllStages[i];
    }

}

function sumCardsOnStage(stage) {
    let sum = 0;
    for (let key in stage) {
        sum+=stage[key]
    }
    return sum;
}




mixDeckButton.addEventListener('click', createDeck);
