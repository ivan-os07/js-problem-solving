const args = process.argv.slice(2)

const fs = require('fs')

const inputSubString = fs.readFileSync(args[0], 'utf8') // подстрока
const inputString = fs.readFileSync(args[1], 'utf8') // большая строка

function create_param(substr) {
	const alphabet = new Map()
	const lenSubstr = substr.length

	for (let i = 0; i <= lenSubstr - 1; i++) {
		alphabet.set(substr[i], lenSubstr - 1 - i)
	}

	return { alphabet, lenSubstr }
}

function get_number(param, symb) {
	return param.alphabet.has(symb) ? param.alphabet.get(symb) : param.lenSubstr
}

function main(subStr, bigStr) {
	const param = create_param(subStr)
	let i = param.lenSubstr - 1

	while (i < bigStr.length) {
		let j = param.lenSubstr - 1
		while (j >= 0 && bigStr[i - (param.lenSubstr - 1 - j)] === subStr[j]) {
			j--
		}
		if (j < 0) {
			console.log('You win')
			console.log({ start: i - param.lenSubstr + 1, end: i })
			return
		}

		const badChar = bigStr[i]
		i += Math.max(1, get_number(param, badChar))
	}

	console.log('Lose')
}

main(inputSubString, inputString)
