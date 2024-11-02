const upperDisplay = document.getElementById("upper-display");
const lowerDisplay = document.getElementById("lower-message");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");
const pinButtons = document.getElementById("pin-buttons");
const numericButtons = document.getElementById("numeric-buttons");
const blockedButtons = document.getElementById("blocked-buttons");
const withdrawPanelButton = document.getElementById("withdraw-panel-button");
const depositPanelButton = document.getElementById("deposit-panel-button");
const continueButtons = document.getElementById("continue-buttons");
const menuButtons = document.getElementById("menu-buttons");
const withdrawButton = document.getElementById("withdraw-button");
const depositButton = document.getElementById("deposit-button");
let value;
let pin;
let action;
let balance = 2000; // hardcoded user's starting balance
let attemptsAllowed = 5; // maximum amount of allowed attempts in case of incorrect input

// clears the upper display message
function clearDisplay() {
    upperDisplay.value = "";
}

// reads and displays input from the "numeric-buttons" panel
function addDigit(input) {
    value += input;
    upperDisplay.value = `£${value}`;
}

// reads input from the "pin-buttons" panel and displays "*" instead of digits
function addPin(input) {
    pin += input;
    upperDisplay.value = "* ".repeat(pin.length);
}

// clears the PIN and display
function delPin() {
    pin = ""
    clearDisplay()
}

// returns to the general menu screen
function continueFunc() {
    generalOperations()
}

// deletes the last digit of the entered amount and displays the changed amount
function delDigit() {
    value = value.slice(0, value.length - 1);
    upperDisplay.value = `£${value}`;
}

// activates "blocked-buttons" key panel without the "onclick" function
function panelBlock() {
    pinButtons.style.display = "none";
    numericButtons.style.display = "none";
    blockedButtons.style.display = "grid";
}

// activates "pin-buttons" key panel with the addPin() "onclick" function
function pinPanel() {
    pinButtons.style.display = "grid";
    blockedButtons.style.display = "none";
    numericButtons.style.display = "none";
}

// activates "numeric-buttons" key panel with the addDigit() "onclick" function and
// alters the "withdraw-button" and "deposit-button" depending on the operations
function numericPanel() {
    pinButtons.style.display = "none";
    numericButtons.style.display = "grid";
    blockedButtons.style.display = "none";
    if (action == "deposit") {
        withdrawPanelButton.style.display = "none";
        depositPanelButton.style.display = "inline-block";
    } else if (action == "withdraw") {
        withdrawPanelButton.style.display = "inline-block";
        depositPanelButton.style.display = "none";
    }
}

// displays PIN screen and evokes the "pin-buttons" panel
function pinScreen() {
    startButton.style.display = "none";
    pin = "";
    message.innerText = "Please, enter your PIN (4 digits)";
    clearDisplay();
    pinPanel();
}

// displays the screen with general operations and evokes the "blocked-buttons" panel
function generalOperations() {
    continueButtons.style.display = "none";
    menuButtons.style.display = "grid";
    lowerDisplay.innerText = "";
    message.innerText = "Choose an operation with your balance";
    clearDisplay();
    panelBlock();
}

// displays deposit menu screen and evokes the "numeric-buttons" panel
function addMoneyMenu() {
    menuButtons.style.display = "none";
    depositButton.style.display = "inline-block";
    value = "";
    action = "deposit";
    upperDisplay.value = `£${Number(value)}`;
    message.innerText = "Enter the amount you want to deposit";
    numericPanel();
}

// displays withdraw menu screen and evokes the "numeric-buttons" panel
function withdrawMoneyMenu() {
    menuButtons.style.display = "none";
    withdrawButton.style.display = "inline-block";
    value = "";
    action = "withdraw";
    upperDisplay.value = `£${Number(value)}`;
    message.innerText = "Enter the amount you want to withdraw";
    numericPanel();
}

// checks if the entered PIN is 4 digits long and displays an error if it's not
// decreasing the number of attempts allowed
function pinCheck() {
    attemptsAllowed --;
    if (attemptsAllowed > 0) {
        try {
            if (pin.length == 4) {
                upperDisplay.value = "PIN accepted";
                pin = "";
                setTimeout(generalOperations, 2000);
            } else if (pin.length > 4){
                pin = ""
                throw "too long"
            } else {
                pin = ""
                throw "too short"
            }
        }
        catch(err) {
            upperDisplay.value = `Error: your PIN is ${err}. ${attemptsAllowed} attempts left`;
        };
    } else {
        upperDisplay.value = "You're out of attempts";
        setTimeout(start, 3000);
    }
}

// displays the farewell message on the screen, evokes the "blocked-buttons" panel
// and returns to the start screen after a set up time 
function exit() {
    continueButtons.style.display = "none";
    menuButtons.style.display = "none";
    message.innerText = "";
    lowerDisplay.innerText = "Bye!";
    clearDisplay();
    panelBlock();
    setTimeout(start, 3000);
}

// displays the start screen, evokes the "blocked-buttons" panel and sets the number of allowed attempts
function start() {
    startButton.style.display = "block";
    attemptsAllowed = 5;
    message.innerText = "Press start to begin";
    lowerDisplay.innerText = "";
    clearDisplay();
    panelBlock();
}

// displays the user's balanse evoking the "blocked-buttons" at the same time
function checkBalance() {
    message.innerText = "";
    upperDisplay.value = `Your balance is £${balance}`;
    panelBlock();
    isContinue();
}

// these two following functions allow to add or withdraw money, throwing
// the error if the amount entered equals 0
function addMoney() {
    let money = value;
    message.innerText = "";
    depositButton.style.display = "none";
    numericPanel();
    try {
        if (money == 0) {
            throw 'is £0'
        } else if (money <= 999999) { // maximum amount per operation
            balance += Number(money)
            upperDisplay.value = `Done! Now your balance is £${balance}`
            panelBlock()
            isContinue()
        } else {
            throw 'is too large'
        };
    }
    catch(err) {
        upperDisplay.value = `Error: the deposit amount ${err}`
        isContinue()
        panelBlock()
    }
}

function withdrawMoney() {
    let money = value;
    message.innerText = "";
    withdrawButton.style.display = "none";
    numericPanel();
    try {
        if (money == 0) {
            throw `is £0`
        } else if (money <= balance) { // amount must not exceed the current balance
            balance -= Number(money)
            upperDisplay.value = `Done! Now your balance is £${balance}`
            isContinue()
            panelBlock()
        } else {
            throw 'exceeds the balance'
        };
    }
    catch(err) {
        upperDisplay.value = `Error: the amount ${err}`
        isContinue();
        panelBlock();
    }
}

// displays continue buttons (Yes/No) on the screen
function isContinue() {
    menuButtons.style.display = "none";
    continueButtons.style.display = "grid";
    lowerDisplay.innerText = "Do you like to continue?";
}

clearDisplay(); // clears the upper display message after every start