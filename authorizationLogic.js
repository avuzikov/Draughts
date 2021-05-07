'use strict';

const account1 = {
  owner: 'Jason Mraz',
  login: 'jm',
  password: '1234', //will redo to saving hashes with salt later
  //statistics holds 2 parameters: name of the opponent and the result of the game
  statistics: [{ player: 'Alexander Uzikov', win: false }],
};

const account2 = {
  owner: 'Alexander Uzikov',
  login: 'au',
  password: '2345',
  statistics: [{ player: 'Jason Mraz', win: true }],
};

//array of accounts
const accounts = [account1, account2];
let timer;

//selection of html elements from the page
const btnLogin = document.querySelector('.login__btn');
const btnNewAccount = document.querySelector('.newacc__btn');
const fldLogin = document.querySelector('.login__input--user');
const fldPassword = document.querySelector('.login__input--password');
const overlay = document.querySelector('.overlay');
const logOutButton = document.querySelector('.logout--btn');
const updTimerButton = document.querySelector('.upd__tmr--btn');
const labelTimer = document.querySelector('.timer');
const logOutTimer = document.querySelector('.logout-timer');
//global variables:
let timeout;
let timeoutTime = 1000 * 60 * 30;
let currentUser;

const show = function (elem) {
  elem.classList.remove('hidden');
};

const hide = function (elem) {
  elem.classList.add('hidden');
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  let currAcc = accounts.find(
    user => user.login === fldLogin.value && user.password === fldPassword.value
  );
  if (currAcc) {
    timeout = setTimeout(logout, timeoutTime);
    currentUser = currAcc;
    openInterface();
    timer = startLogOutTimer();
  }
});

const openRegistrationWindow = function (e) {
  show(overlay);
};

const closeRegistrationWindow = function (e) {
  hide(overlay);
};

//blur the backgroud when new account button is pressed
btnNewAccount.addEventListener('click', function (e) {
  e.preventDefault();
  openRegistrationWindow();
});

//unblur if any place on the overlay is pressed
overlay.addEventListener('click', function (e) {
  e.preventDefault();
  closeRegistrationWindow();
});

logOutButton.addEventListener('click', function (e) {
  e.preventDefault();
  logout();
});

const logout = function () {
  currentUser = undefined;
  closeInterface();
};

const openInterface = function () {
  show(logOutButton);
  show(updTimerButton);
  show(logOutTimer);
};

const closeInterface = function () {
  hide(logOutButton);
  hide(updTimerButton);
  hide(logOutTimer);
};

const startLogOutTimer = function () {
  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);

    //in each call, print the remaining time to UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    //When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      logout();
    }
    time--;
  };

  let time = 20;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

updTimerButton.addEventListener('click', function () {
  clearInterval(timer);
  timer = startLogOutTimer();
});
