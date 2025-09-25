const args = process.argv.slice(2)
const fs = require('fs')

const inputString = fs.readFileSync(args[0], 'utf8')
let k = parseInt(args[1])

function encodeLetters(k, symb) {
	let numSymb = symb.charCodeAt(0)
	let start, end

	if (65 <= numSymb && numSymb <= 90) {
		start = 65
		end = 90
	} else if (97 <= numSymb && numSymb <= 122) {
		start = 97
		end = 122
	} else {
		return symb // неалфавитные символы возвращаем как есть
	}

	let range = end - start + 1
	let newNumSymb = ((((numSymb - start + k) % range) + range) % range) + start

	return String.fromCharCode(newNumSymb)
}

function main(k, str) {
	let res = ''
	for (let i = 0; i < str.length; i++) {
		res += encodeLetters(k, str[i])
	}
	console.log(res)
}

main(k, inputString)
