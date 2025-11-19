// const args = process.argv.slice(2)
// const fs = require('fs')

// const inputString = fs.readFileSync(args[0], 'utf8')

function floatToBinary(x) {
	// Специальные случаи
	if (x === Infinity) {
		return '01111111100000000000000000000000' // +inf
	}
	if (isNaN(x)) {
		return '01111111110000000000000000000000' // NaN
	}
	if (x === 0) {
		return '00000000000000000000000000000000' // 0
	}

	// Знак
	const sign = x < 0 ? 1 : 0

	// Работаем с модулем
	x = Math.abs(x)

	let intPart = Math.floor(x) // целая часть (floor округляет вниз)
	let fracPart = x - intPart // дробная часть

	// Целая часть → двоичная
	let intBinary = ''

	if (intPart === 0) intBinary = '0'

	while (intPart > 0) {
		intBinary = (intPart % 2) + intBinary
		intPart = Math.floor(intPart / 2)
	}

	// Дробная часть → двоичная
	let fracBinary = ''
	let count = 0 // колво знаков

	while (fracPart > 0 && count < 30) {
		fracPart *= 2
		const bit = Math.floor(fracPart)
		fracBinary += bit
		fracPart -= bit
		count++
	}

	let binary = intBinary + (fracBinary ? '.' + fracBinary : '')

}

floatToBinary('0.2')
