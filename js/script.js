
'use strict';

import * as Convert from "./Convert.js";
import * as BaseCheck from "./BaseCheck.js";

//variables
let fromBaseSelect = document.querySelector('#from-base'),
    toBaseSelect = document.querySelector('#to-base'),
    convertedOutput = document.querySelector('#converted-num'),
    button = document.querySelector('#sub-button'),
    fromBaseEnter = document.querySelector('#first-enter'),
    toBaseEnter = document.querySelector('#second-enter'),
    userNumberInput = document.querySelector('#user-number');

//checking
fromBaseSelect.addEventListener('change', function () {
    enterBase();
});

toBaseSelect.addEventListener('change', function () {
    enterBase();
});

function enterBase() {
    if (fromBaseSelect.options[fromBaseSelect.selectedIndex].value === 'from-base-coded') {
        fromBaseEnter.classList.remove('hide');
    } else  {
        fromBaseEnter.classList.add('hide');
    }

    if (toBaseSelect.options[toBaseSelect.selectedIndex].value === 'to-base-coded') {
        toBaseEnter.classList.remove('hide');
    } else  {
        toBaseEnter.classList.add('hide');
    }
}

fromBaseEnter.addEventListener('input', function () {
    checkTheBase(fromBaseEnter);
});
toBaseEnter.addEventListener('input', function () {
    checkTheBase(toBaseEnter);
});
function checkTheBase(baseEl) {
    let base = parseInt(baseEl.value, 10);
    let warning = baseEl.nextElementSibling;

    if (isNaN(base) || base <= 1 || base > 36) {
        warning.classList.remove('hide');
    } else {
        warning.classList.add('hide');
    }
}

userNumberInput.addEventListener('blur', function () {
    BaseCheck.isInGivenBase(userNumberInput, fromBaseEnter, fromBaseSelect);
    if (!userNumberInput.nextElementSibling.classList.contains('hide')){
        convertedOutput.value = '';
    }
});
button.addEventListener('click', function () {
    BaseCheck.isInGivenBase(userNumberInput, fromBaseEnter, fromBaseSelect);
    if (userNumberInput.nextElementSibling.classList.contains('hide')){
        convertation(fromBaseSelect, toBaseSelect);
    } else{
        convertedOutput.value = '';
    }
});

function convertation(fromBase, toBase){
    let from = fromBase.value;
    let to = toBase.value;

    let dec, out;
    if (from === 'from-base-coded') {
        dec = Convert.baseToDecimal(userNumberInput.value, (+fromBaseEnter.value));
    } else if (from === 'from-roman-numeral') {
        dec = Convert.romanToDecimal(userNumberInput.value);
    } else if (from === 'from-binary-coded-decimal') {
        dec = Convert.bcdToDecimal(userNumberInput.value);
    }

    if (to === 'to-base-coded') {
        out = Convert.decimalToBase(dec, (+toBaseEnter.value));
    } else if (to === 'to-roman-numeral') {
        out = Convert.decimalToRoman(dec);
    } else if (to === 'to-binary-coded-decimal') {
        out = Convert.decimalToBcd(dec);
    }
    convertedOutput.value = out;
}

