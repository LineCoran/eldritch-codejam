import ancientsData from '../data/ancients';
import cardsDataBrown from '../data/mythicCards/brown';
import cardsDataBlue from '../data/mythicCards/blue';
import cardsDataGreen from '../data/mythicCards/green';

let difficulty = '';
let ancient = '';


const ancients = document.querySelectorAll('.ancient__card')
const difficultyButtons = document.querySelectorAll('.difficulty');
const mixDeckButton = document.querySelector('.mix__button');


function listenerForDifficultyButtons() {
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', function(item) {
            difficulty = item.target.id;
            console.log(difficulty);
        })
    }
}

function listenerForAnctientCards() {
    for (let i = 0; i < ancients.length; i++) {
        ancients[i].addEventListener('click', function(item) {
            ancient = item.target.id;
            console.log(ancient);
        })
    }
}

function startGlobalCard() {
    return  {
        blueCards: cardsDataBlue,
        greenCards: cardsDataGreen,
        brownCards: cardsDataBrown,
    }
}

const ancientsCards = document.querySelectorAll('.ancient__card');

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

function createMassiveCards(obj, globalCards) {
    let allStages = {
        firstStage: obj.firstStage,
        secondStage: obj.secondStage,
        thirdStage: obj.thirdStage
    }
    let globalArr = [];
    for (let key in allStages) {
        let stage = [];
        for (let prop in allStages[key]) {
            let count = allStages[key][prop];
            while (count != 0) {
                let randomNum = returnRandomNum(globalCards[prop].length);
                if (checkCardsSetting(globalCards[prop][randomNum], difficulty, globalCards[prop])) {
                    stage.push(globalCards[prop][randomNum]);
                    count--;
                    globalCards[prop].splice(randomNum, 1);
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
    let arr = createMassiveCards(findCurrentAncient(), startGlobalCard());
    console.log(arr);
}

mixDeckButton.addEventListener('click', createDeck);
