// Get all the screens
const loginScreen = document.getElementById('login-screen');
const menuScreen = document.getElementById('menu-screen');
const balanceScreen = document.getElementById('balance-screen');
const withdrawScreen = document.getElementById('withdraw-screen');
const depositScreen = document.getElementById('deposit-screen');
const changePinScreen = document.getElementById('change-pin-screen');
const receiptScreen = document.getElementById('receipt-screen');

// Get display elements
const pinDisplay = document.getElementById('pin-display');
const newPinDisplay = document.getElementById('new-pin-display');
const amountDisplay = document.getElementById('amount-display');
const depositAmountDisplay = document.getElementById('deposit-amount-display');
const loginMessage = document.getElementById('login-message');
const pinMessage = document.getElementById('pin-message');
const currentBalanceDisplay = document.getElementById('current-balance');
const transactionList = document.getElementById('transaction-list');

// Receipt elements
const receiptDate = document.getElementById('receipt-date');
const receiptTime = document.getElementById('receipt-time');
const receiptType = document.getElementById('receipt-type');
const receiptAmount = document.getElementById('receipt-amount');
const receiptBalance = document.getElementById('receipt-balance');

// Get all the buttons
const clearBtn = document.getElementById('clear-btn');
const enterBtn = document.getElementById('enter-btn');
const menuButtons = document.querySelectorAll('.menu-btn');
const backFromBalanceBtn = document.getElementById('back-from-balance');
const confirmWithdrawBtn = document.getElementById('confirm-withdraw');
const cancelWithdrawBtn = document.getElementById('cancel-withdraw');
const confirmDepositBtn = document.getElementById('confirm-deposit');
const cancelDepositBtn = document.getElementById('cancel-deposit');
const confirmPinChangeBtn = document.getElementById('confirm-pin-change');
const cancelPinChangeBtn = document.getElementById('cancel-pin-change');
const doneBtn = document.getElementById('done-btn');

// Get all number keys and quick amount buttons
const numberKeys = document.querySelectorAll('.key[data-number]');
const quickAmounts = document.querySelectorAll('.quick-amount');

// Bank account data
let bankAccount = {
    pin: "1234", // Default PIN
    balance: 1250.00, // Starting balance
    transactions: [
        { type: "Deposit", amount: 1000.00, date: "2023-10-01", balance: 1000.00 },
        { type: "Deposit", amount: 250.00, date: "2023-10-05", balance: 1250.00 }
    ]
};

// Variables to store user input
let pinInput = '';
let newPinInput = '';
let amountInput = '';
let currentScreen = 'login';

// Function to show a specific screen and hide others
function showScreen(screenToShow) {
    // Hide all screens first
    loginScreen.classList.add('hidden');
    menuScreen.classList.add('hidden');
    balanceScreen.classList.add('hidden');
    withdrawScreen.classList.add('hidden');
    depositScreen.classList.add('hidden');
    changePinScreen.classList.add('hidden');
    receiptScreen.classList.add('hidden');
    
    // Show the requested screen
    if (screenToShow === 'login') {
        loginScreen.classList.remove('hidden');
        currentScreen = 'login';
        pinInput = '';
        updatePinDisplay();
        loginMessage.textContent = '';
    } else if (screenToShow === 'menu') {
        menuScreen.classList.remove('hidden');
        currentScreen = 'menu';
    } else if (screenToShow === 'balance') {
        balanceScreen.classList.remove('hidden');
        currentScreen = 'balance';
        updateBalanceDisplay();
        updateTransactionHistory();
    } else if (screenToShow === 'withdraw') {
        withdrawScreen.classList.remove('hidden');
        currentScreen = 'withdraw';
        amountInput = '';
        updateAmountDisplay();
    } else if (screenToShow === 'deposit') {
        depositScreen.classList.remove('hidden');
        currentScreen = 'deposit';
        amountInput = '';
        updateDepositAmountDisplay();
    } else if (screenToShow === 'change-pin') {
        changePinScreen.classList.remove('hidden');
        currentScreen = 'change-pin';
        newPinInput = '';
        updateNewPinDisplay();
        pinMessage.textContent = '';
    } else if (screenToShow === 'receipt') {
        receiptScreen.classList.remove('hidden');
        currentScreen = 'receipt';
    }
}

// Function to update the PIN display
function updatePinDisplay() {
    let displayText = '';
    
    // Show * for each digit entered
    for (let i = 0; i < pinInput.length; i++) {
        displayText += '*';
    }
    
    // Fill the rest with _
    for (let i = pinInput.length; i < 4; i++) {
        displayText += '_';
    }
    
    pinDisplay.textContent = displayText;
}

// Function to update the new PIN display
function updateNewPinDisplay() {
    let displayText = '';
    
    // Show * for each digit entered
    for (let i = 0; i < newPinInput.length; i++) {
        displayText += '*';
    }
    
    // Fill the rest with _
    for (let i = newPinInput.length; i < 4; i++) {
        displayText += '_';
    }
    
    newPinDisplay.textContent = displayText;
}

// Function to update the amount display
function updateAmountDisplay() {
    if (amountInput === '') {
        amountDisplay.textContent = '$0';
    } else {
        amountDisplay.textContent = '$' + amountInput;
    }
}

// Function to update the deposit amount display
function updateDepositAmountDisplay() {
    if (amountInput === '') {
        depositAmountDisplay.textContent = '$0';
    } else {
        depositAmountDisplay.textContent = '$' + amountInput;
    }
}

// Function to update the balance display
function updateBalanceDisplay() {
    currentBalanceDisplay.textContent = '$' + bankAccount.balance.toFixed(2);
}

// Function to update transaction history
function updateTransactionHistory() {
    transactionList.innerHTML = '';
    
    // Show only the last 5 transactions
    const recentTransactions = bankAccount.transactions.slice(-5);
    
    recentTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const typeSpan = document.createElement('span');
        typeSpan.className = 'transaction-type';
        typeSpan.textContent = transaction.type;
        
        const amountSpan = document.createElement('span');
        amountSpan.className = `transaction-amount ${transaction.type.toLowerCase()}`;
        amountSpan.textContent = (transaction.type === 'Withdraw' ? '-$' : '+$') + transaction.amount.toFixed(2);
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'transaction-date';
        dateSpan.textContent = transaction.date;
        
        transactionItem.appendChild(typeSpan);
        transactionItem.appendChild(amountSpan);
        transactionItem.appendChild(dateSpan);
        
        transactionList.appendChild(transactionItem);
    });
}

// Function to add a transaction
function addTransaction(type, amount) {
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    bankAccount.transactions.push({
        type: type,
        amount: amount,
        date: dateString,
        balance: bankAccount.balance
    });
}

// Function to update receipt information
function updateReceipt(type, amount) {
    const now = new Date();
    receiptDate.textContent = now.toLocaleDateString();
    receiptTime.textContent = now.toLocaleTimeString();
    receiptType.textContent = type;
    receiptAmount.textContent = (type === 'Withdraw' ? '-$' : '+$') + amount.toFixed(2);
    receiptBalance.textContent = '$' + bankAccount.balance.toFixed(2);
}

// Add event listeners to number keys
numberKeys.forEach(key => {
    key.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        
        if (currentScreen === 'login') {
            // On login screen, add to PIN
            if (pinInput.length < 4) {
                pinInput += number;
                updatePinDisplay();
            }
        } else if (currentScreen === 'withdraw' || currentScreen === 'deposit') {
            // On withdraw/deposit screens, add to amount
            amountInput += number;
            
            if (currentScreen === 'withdraw') {
                updateAmountDisplay();
            } else {
                updateDepositAmountDisplay();
            }
        } else if (currentScreen === 'change-pin') {
            // On change PIN screen, add to new PIN
            if (newPinInput.length < 4) {
                newPinInput += number;
                updateNewPinDisplay();
            }
        }
    });
});

// Add event listeners to quick amount buttons
quickAmounts.forEach(button => {
    button.addEventListener('click', function() {
        if (currentScreen === 'withdraw') {
            const amount = this.getAttribute('data-amount');
            amountInput = amount;
            updateAmountDisplay();
        }
    });
});

// Clear button functionality
clearBtn.addEventListener('click', function() {
    if (currentScreen === 'login') {
        pinInput = '';
        updatePinDisplay();
        loginMessage.textContent = '';
    } else if (currentScreen === 'withdraw' || currentScreen === 'deposit') {
        amountInput = '';
        
        if (currentScreen === 'withdraw') {
            updateAmountDisplay();
        } else {
            updateDepositAmountDisplay();
        }
    } else if (currentScreen === 'change-pin') {
        newPinInput = '';
        updateNewPinDisplay();
        pinMessage.textContent = '';
    }
});

// Enter button functionality
enterBtn.addEventListener('click', function() {
    if (currentScreen === 'login') {
        // Check if PIN is correct
        if (pinInput === bankAccount.pin) {
            showScreen('menu');
        } else {
            loginMessage.textContent = 'Wrong PIN. Try again.';
            pinInput = '';
            updatePinDisplay();
        }
    } else if (currentScreen === 'withdraw') {
        // Process withdrawal
        if (amountInput !== '' && parseInt(amountInput) > 0) {
            processWithdrawal();
        }
    } else if (currentScreen === 'deposit') {
        // Process deposit
        if (amountInput !== '' && parseInt(amountInput) > 0) {
            processDeposit();
        }
    } else if (currentScreen === 'change-pin') {
        // Process PIN change
        if (newPinInput.length === 4) {
            processPinChange();
        } else {
            pinMessage.textContent = 'PIN must be 4 digits';
        }
    }
});

// Process withdrawal
function processWithdrawal() {
    const amount = parseFloat(amountInput);
    
    if (amount > bankAccount.balance) {
        loginMessage.textContent = 'Insufficient funds';
        setTimeout(() => {
            loginMessage.textContent = '';
            showScreen('menu');
        }, 2000);
    } else {
        bankAccount.balance -= amount;
        addTransaction('Withdraw', amount);
        updateReceipt('Withdraw', amount);
        showScreen('receipt');
    }
}

// Process deposit
function processDeposit() {
    const amount = parseFloat(amountInput);
    bankAccount.balance += amount;
    addTransaction('Deposit', amount);
    updateReceipt('Deposit', amount);
    showScreen('receipt');
}

// Process PIN change
function processPinChange() {
    bankAccount.pin = newPinInput;
    pinMessage.textContent = 'PIN changed successfully!';
    pinMessage.style.color = '#2ecc71';
    
    setTimeout(() => {
        showScreen('menu');
    }, 1500);
}

// Menu buttons functionality
menuButtons.forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        
        if (action === 'balance') {
            showScreen('balance');
        } else if (action === 'withdraw') {
            showScreen('withdraw');
        } else if (action === 'deposit') {
            showScreen('deposit');
        } else if (action === 'change-pin') {
            showScreen('change-pin');
        } else if (action === 'exit') {
            showScreen('login');
        }
    });
});

// Back from balance button
backFromBalanceBtn.addEventListener('click', function() {
    showScreen('menu');
});

// Withdraw buttons
confirmWithdrawBtn.addEventListener('click', function() {
    if (amountInput !== '' && parseInt(amountInput) > 0) {
        processWithdrawal();
    }
});

cancelWithdrawBtn.addEventListener('click', function() {
    showScreen('menu');
});

// Deposit buttons
confirmDepositBtn.addEventListener('click', function() {
    if (amountInput !== '' && parseInt(amountInput) > 0) {
        processDeposit();
    }
});

cancelDepositBtn.addEventListener('click', function() {
    showScreen('menu');
});

// PIN change buttons
confirmPinChangeBtn.addEventListener('click', function() {
    if (newPinInput.length === 4) {
        processPinChange();
    } else {
        pinMessage.textContent = 'PIN must be 4 digits';
    }
});

cancelPinChangeBtn.addEventListener('click', function() {
    showScreen('menu');
});

// Done button
doneBtn.addEventListener('click', function() {
    showScreen('menu');
});

// Start with the login screen
showScreen('login');

// Initialize the balance display
updateBalanceDisplay();