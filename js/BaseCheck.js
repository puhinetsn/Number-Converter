export function isInGivenBase(inputNum, baseSelect, baseType) {
    let userNum = inputNum.value;
    let b = baseSelect.value;
    let type = baseType.value;
    
    if (userNum.length > 15){
        inputNum.nextElementSibling.classList.remove('hide');
        return true;
    }
    
    if ((type === 'from-base-coded' &&  isInNumBase(b, userNum)) ||(type === 'from-roman-numeral' &&  isInRoman(userNum)) || (type === 'from-binary-coded-decimal' &&  isInBinaryDecimal(userNum))){
        inputNum.nextElementSibling.classList.add('hide');
        return false;
    } else{
        inputNum.nextElementSibling.classList.remove('hide');
        return true;
    } 
}

export function isInNumBase(b, userNum){
        b = +b;
        if (b > 36 || b < 2) {
            return false;
        }
        for(let i = 0; i < userNum.length; i++){
            if((isNaN(+userNum[i]) || userNum[i] < 0 || userNum[i] >= Math.min(b, 10)) &&
                (userNum[i].charCodeAt() < 'A'.charCodeAt() || userNum[i].charCodeAt() > (b - 11 + 'A'.charCodeAt()))){
                return false;
            } 
        }
        return true;  
}

export function isInRoman(userNum){
    const validRomanNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
        let countV = 0, countL = 0, countD = 0;
        for (let i = 0; i < userNum.length; i++) {
            let curr = validRomanNumerals.indexOf(userNum[i]);
            let next = -1;

            if (curr === -1){
                return false;
            }
            let countNextChar = 1;
            for (let j = i + 1; j < userNum.length; j++){
                if(userNum[j] === userNum[i]) {
                    countNextChar += 1;
                    if (countNextChar === 4){
                        return false;
                    }
                } else{
                    break;
                }
            }

            if (curr === 1){
                countV++;
            } else if (curr === 3){
                countL++;
            } else if (curr === 5){
                countD++;
            }
            if (countV > 1 || countL > 1 || countD > 1){
                return false;
            }

            if (i < userNum.length - 1){
                next = validRomanNumerals.indexOf(userNum[i + 1])
                if (curr === 1 || curr === 3 || curr === 5){
                    if (curr < next){
                        return false;
                    }
                } else if (curr === 0 && next !== 0 && next > 2){
                    return false;
                } else if (curr === 2 && next === 5){
                    return false;
                }
            }
        }
        return true; 
}

export function isInBinaryDecimal(userNum){
    for (let j = userNum.length - 1; j >= 0; j-= 4){
        for(let k = j; k >= 0 && k > j - 3; k--){
            if (userNum[k] != '0' && userNum[k] != '1'){
                return false;
            }
        }
        if (j - 3 >= 0 && (userNum[j - 3] === '1' && (userNum[j - 2] === '1' || userNum[j - 1] === '1'))){
            return false;
        }
    }
    return true;
}