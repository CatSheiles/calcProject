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
        case '=':
            if (previousOperator === null) {
                //so above is user hasn't entered anything yet - so screen is null
                //you need two numbers to do math
            return;
            }
            flushOperation(parseInt(buffer)); //this does the math part of equal
            previousOperator = null; //clear the button out after
            buffer = runningTotal;
            runningTotal = 0; //after math is done reassign to zero
            break;
        case '←': //tip copy and paste symbols from the DOM
            if(buffer.length === 1){ //backspace 1 character
                buffer = '0';
            }else {
                buffer = buffer.substring(0, buffer.length - 1); //-1 is stop 1 short of going all the way to the end
            }
            break;
        case '+': //note these need to be the signs not the &plus that is in the html
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
//js and decimals don't go well together and client didn't need so none included

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
