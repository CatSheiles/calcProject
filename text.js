let runningTotal = 0;
let buffer = "0"; //whats on the screen
let previousOperator; //what was last operator used e.g plus sign, minus sign = operator

const screen = document.querySelector('.screen'); //this is where its writing out to

function buttonClick(value){
    if (isNaN(value)) { 
        //this is not a number
    handleSymbol(value);
    }else {
        //this is a number
    handleNumber(value);

    }
screen.innerText = buffer; //re-rendering the screen buffer whatever is clicked
}

//handling what numbers&symbols do on the keypad
function handleSymbol(symbol){
//    if(symbol === 'C') {
//        buffer = '0';
//        runningTotal = 0;
//    }instead of doing a bunch of if-else statements for buttons, do switch as below for each case-with break after each switch case
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break; 
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        }
}    

function handleMath(symbol){
    if(buffer === '0') {
        //do nothing
        return; 
    }

const intBuffer = parseInt(buffer); //turning string into a number

if (runningTotal === 0) {
    runningTotal = intBuffer;
}else {
    flushOperation(intBuffer); //this flush operation is going to handle what operator button is chosen & its handled below
}

previousOperator = symbol;

buffer = '0';

} //end of handleMath part

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    }else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    }else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    }else {
        buffer += numberString;
    }

}

//init just sets everything up so add it once and call later/see its called at bottom
function init () {
    document.querySelector('.calc-buttons') //what happens when someone clicks a button
    addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}





init();
