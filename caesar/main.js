const args = process.argv.slice(2)

const fs = require('fs')

const inputString = fs.readFileSync(args[0], 'utf8')
let k = parseInt(args[1])

// upLetters [65 - 90]
// lowLetters [97 - 122]

function encodeLetters(k, symb) {
	let numSynb = symb.charCodeAt(0)

	let start
	let end

	if (65 <= numSynb && numSynb <= 90) {
		start = 65
		end = 90
	} else {
		start = 97
		end = 122
	}

	let newNumSymb = numSynb + k

	if (k > 0) {
		if (newNumSymb > end) {
			return String.fromCharCode(start + (newNumSymb % end) - 1)
		} else {
			return String.fromCharCode(newNumSymb)
		}
	} else {
		let a = start - numSynb

		if (newNumSymb < start) {
			return String.fromCharCode(end - a)
		} else {
			return String.fromCharCode(newNumSymb)
		}
	}
}

function main(k, str) {
	let res = ''

	for (let index = 0; index < str.length; index++) {
		let numS = str.charCodeAt(index)
		if ((65 <= numS && numS <= 90) || (97 <= numS && numS <= 122)) {
			res += encodeLetters(k, str[index])
		}
	}
	console.log(res)
}


main(k, inputString)
