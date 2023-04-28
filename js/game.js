const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disable-card');

    if (disabledCards.length == 20 ) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter ) {

        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            
        firstCard.classList.remove('card-reveal');
        secondCard.classList.remove('card-reveal');

        firstCard = '';
        secondCard = '';
        }, 500)
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('card-reveal')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('card-reveal');
        firstCard = target.parentNode;   
    } else if (secondCard == '') {
        target.parentNode.classList.add('card-reveal');
        secondCard = target.parentNode;   
        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character);

    return card;
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTimer = +timer.innerHTML;
        timer.innerHTML = currentTimer + 1;
    }, 1000)
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() -0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}