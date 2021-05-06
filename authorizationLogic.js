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

//selection of html elements from the page
const btnLogin = document.querySelector('.login__btn');
const btnNewAccount = document.querySelector('.newacc__btn');
const fldLogin = document.querySelector('.login__input--user');
const fldPassword = document.querySelector('.login__input--password');

//global variables:
let timeout;
let timeoutTime = 1000 * 60 * 30;
let currentUser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  let currAcc = accounts.find(
    user => user.login === fldLogin.value && user.password === fldPassword.value
  );
  if (currAcc) {
    timeout = setTimeout(logout, timeoutTime);
    currentUser = currAcc;
    openInterface();
  }
});

btnNewAccount.addEventListener('click', function (e) {
  e.preventDefault();
});

const logout = function () {
  currentUser = undefined;
  closeInterface();
};

const openInterface = function () {};

const closeInterface = function () {};
