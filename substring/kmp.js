const args = process.argv.slice(2)

const fs = require('fs')

const inputSubString = fs.readFileSync(args[0], 'utf8') // подстрока
const inputString = fs.readFileSync(args[1], 'utf8') // большая строка

function prefix(str) {
	let len = str.length
	let pi = new Array(len)
	pi[0] = 0
	let k = 0
	for (let i = 1; i < len; i++) {
		while (k > 0 && str.charAt(k) != str.charAt(i)) k = pi[k - 1]

		if (str.charAt(k) == str.charAt(i)) {
			k++
		}
		pi[i] = k
	}

	return pi
}

function KMP(substr, big_str) {
	const pi = prefix(substr)

	const n = big_str.length
	const m = substr.length

	let j = 0 // индекс в substr

	for (let i = 0; i < n; i++) {
		while (j > 0 && big_str.charAt(i) !== substr.charAt(j)) {
			j = pi[j - 1]
		}

		if (big_str.charAt(i) === substr.charAt(j)) {
			j++
		}

		if (j === m) {
			console.log('You win')
			console.log({ start: i - m + 1, end: i })
			return
		}
	}
	console.log('Lose')
}

KMP(inputSubString, inputString)
