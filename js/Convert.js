//Number Based Convertation
export function baseToDecimal(str, base){
	let num = 0; 
	for(let i = 0; i < str.length; i++){
		num *= base;
        num += valueInDecimal(str[i].charCodeAt());
	}
	console.log(num);
	return num;
}

export function valueInDecimal(c){
	if (c >= '0'.charCodeAt() && c <= '9'.charCodeAt())
		return (c - '0'.charCodeAt());
	else
		return (c - 'A'.charCodeAt() + 10);
}

export function valueInBase(num){
    if (num >= 0 && num <= 9)
        return String.fromCharCode(num + '0'.charCodeAt());
    else
        return String.fromCharCode(num - 10 + 65);
}

export function decimalToBase(num, base){
    let str = "";
    while (num > 0){
        str = valueInBase(num % base) + str;
        num = parseInt(num / base);
    }
    return str;
}

//Roman Based Convertation
export function value(r){
	if (r == 'I')
		return 1;
	if (r == 'V')
		return 5;
	if (r == 'X')
		return 10;
	if (r == 'L')
		return 50;
	if (r == 'C')
		return 100;
	if (r == 'D')
		return 500;
	if (r == 'M')
		return 1000;
	return -1;
}

export function romanToDecimal(str){
	let num = 0;
	for (let i = 0; i < str.length; i++) {
		let s1 = value(str[i]);
		if (i + 1 < str.length) {
			let s2 = value(str[i + 1]);
			if (s1 >= s2) {
				num += s1;
			} 
			else{
				num += s2 - s1;
				i++;
			}
		} 
		else{
			num += s1;
		}
	}
	return num;
}

export function decimalToRoman(num){
	let nums = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
	let syms = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"];
	let i = nums.length - 1;
	let str = "";
	while(num > 0){
		let div = Math.floor(num / nums[i]);
		num = parseInt(num % nums[i]);
		while(div--){
		  str += syms[i];
		}
		i--;
	}
	return str;
}

//Binary-decimal Based Conversation
export function bcdToDecimal(str){
    let num = 0;
    let i;
    for (i = 0; i < str.length % 4; i++) {
        num *= 2;
        num += valueInDecimal(str[i].charCodeAt()); 
    }
	for(; i < str.length;){
        let part = 0;
        for (let k = 0; k < 4; k++) {
            part *= 2;
            part += valueInDecimal(str[i++].charCodeAt());
        }
        num *= 10;
        num += part;
	}
	return num;
}

export function decimalToBcd(num){
    if (num === 0) {
        return "0000";
    }
    let res = "";
    while (num > 0) {
        let part = "";
        let partNum = num % 10;
        for (let i = 0; i < 4; i++) {
            part = partNum % 2 + part;
            partNum = parseInt(partNum / 2);
        }
        num = parseInt(num / 10);
        res = part + res;
    }
    return res;
}

