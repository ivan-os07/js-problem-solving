const args = process.argv.slice(2)

const fs = require('fs')

const inputSubString = fs.readFileSync(args[0], 'utf8') // подстрока
let inputString = fs.readFileSync(args[1], 'utf8') // большая строка

// функция приним строку и возвр сумму кодов этой строки
function simple_hash(str) {
	let s = 0

	for (let i = 0; i < str.length; i++) {
		s += str[i].charCodeAt(0)
	}
	return s
}

const sumSubString = simple_hash(inputSubString) // контрольная сумма подстроки
const l_SubString = inputSubString.length // длина подстроки

// сумма первого слайса
let sumSlice = simple_hash(inputString.slice(0, l_SubString))

// первый и последний + 1 символы слайса
let first_symb
let next_symb

// нужный слайс или коллизия
let contender

for (let i = 0; i <= inputString.length - l_SubString; i++) {
	if (sumSubString === sumSlice) {
		contender = inputString.slice(i, i + l_SubString)

		if (inputSubString === contender) {
			console.log('You win')
			console.log(i, i + l_SubString - 1)
			// ищем первое вхождение, поэтому выходим из цикла
			break
		}
	}

	// if (i != inputString.length - l_SubString) {
	// 	first_symb = inputString[i].charCodeAt(0)
	// 	next_symb = inputString[i + l_SubString].charCodeAt(0)

	// 	sumSlice = sumSlice - first_symb + next_symb
	// } else {
	// 	console.log('Lose')
	// 	break
	// }

	if (i == inputString.length - l_SubString) {
		console.log('Lose')
		break
	}

	first_symb = inputString[i].charCodeAt(0)
	next_symb = inputString[i + l_SubString].charCodeAt(0)

	sumSlice = sumSlice - first_symb + next_symb
}
