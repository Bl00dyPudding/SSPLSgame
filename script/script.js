const closeGreeting = () => {
    document.getElementById('greeting').remove();
    document.getElementById('battle').classList.remove('hidden');
    let array = document.querySelectorAll('.clickable');
    array.forEach(elem => elem.disabled = false);
};

const showHint = () => {
    document.getElementById('hintBox').classList.remove('hidden');
    document.getElementById('hintBox').innerText =
        'Ножницы режут бумагу.\n' +
        'Бумага заворачивает камень.\n' +
        'Камень давит ящерицу,\n' +
        'а ящерица травит Спока,\n' +
        'в то время как Спок ломает ножницы,\n' +
        'которые, в свою очередь, отрезают голову ящерице,\n' +
        'которая ест бумагу, на которой улики против Спока,\n' +
        'который испаряет камень,\n' +
        'а камень, разумеется, затупляет ножницы.';
    const closeHint = () => {
        document.getElementById('hintBox').classList.add('hidden');
        document.getElementById('hintBox').innerText = '';
    };
    setTimeout(closeHint, 2000);
};

const randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

const reset = () => {
    document.getElementById('wins').innerText = `0`;
    document.getElementById('round').innerText = `1`;
    let array = document.querySelectorAll('.clickable');
    array.forEach(elem => elem.disabled = false);
    document.getElementById('prize').innerText = '';
    document.getElementById('win').classList.add('hidden');
    document.getElementById('win').classList.remove('modal');
};

const roundCounter = (param) => {
    if (!param) {
        let round = document.getElementById('round').innerText;
        document.getElementById('round').innerText = `${++round}`;
    }
};

const winsCounter = param => {
    let wins = 0;
    if (param) {
        document.getElementById('wins').innerText = `${wins}`;
    } else {
        wins = document.getElementById('wins').innerText;
        document.getElementById('wins').innerText = `${++wins}`;
    }
};

const whoHasWon = (player, computer) => {
    let result;
    if (player === 'scissors' && computer === 'paper'
     || player === 'paper' && computer === 'stone'
     || player === 'stone' && computer === 'lizard'
     || player === 'lizard' && computer === 'spock'
     || player === 'spock' && computer === 'scissors'
     || player === 'scissors' && computer === 'lizard'
     || player === 'lizard' && computer === 'paper'
     || player === 'paper' && computer === 'spock'
     || player === 'spock' && computer === 'stone'
     || player === 'stone' && computer === 'scissors') {
        result = player;
    } else if (player === computer) {
        result = null;
    } else {
        result = computer;
    }
    return result;
};


const renderPage = (player, computer, text, isWin) => {
    document.getElementById('computer').innerText = computer;
    document.getElementById('player').innerText = player;
    document.getElementById('result').innerText = text;
    if (isWin) {
        let array = document.querySelectorAll('.clickable');
        array.forEach(elem => elem.disabled = true);
        document.getElementById('win').classList.remove('hidden');
        document.getElementById('win').classList.add('modal');
        let round = document.getElementById('round').innerText;
        if (round <= 10) {
            document.getElementById('prize').innerText =
                `Ты достоин главного приза!`;
        } else {
            document.getElementById('prize').innerText =
                `Ты победил! Количество раундов: ${round}. 
                Но сможешь ли ты одержать победу меньше чем за 10 раундов, 
                чтобы получить главный приз?`;
        }
    }
};

const checkForWin = () => {
    if(document.getElementById('wins').innerText === '5') {
        return true;
    }
};


const newTurn = (player) => {
    let computer = randomInteger(1,5);

    switch (computer) {
        case 1:
            computer = 'stone';
            break;
        case 2:
            computer = 'scissors';
            break;
        case 3:
            computer = 'paper';
            break;
        case 4:
            computer = 'lizard';
            break;
        case 5:
            computer = 'spock';
            break;
        default:
            console.log('Что-то пошло не по плану');
    }

    const winner = whoHasWon(player, computer);

    let text = '';

    if (winner === player) {
        winsCounter();
        text = 'Ты одерживаешь победу в этом раунде';
    } else if (winner === computer) {
        winsCounter('reset');
        text = 'Искусственный интеллект тебя сделал';
    } else {
        text = 'Ничья, идем дальше';
    }

    let isWin = checkForWin();
    roundCounter(isWin);
    renderPage(player, computer, text, isWin);
};




const mouseClick = evt => {

    if (evt.target.id === 'start') {
        closeGreeting();
    }

    if (evt.target.classList.contains('clickable')) {
        newTurn(evt.target.id);
    }

    if (evt.target.id === 'restart') {
        reset();
    }

    if (evt.target.id === 'hint') {
        showHint();
    }

};

document.addEventListener('click', mouseClick);