const fs = require('fs')

const inputString = fs.readFileSync('input.txt', 'utf8')
const map = new Map()

// console.log(inputString)
let count = 0
let sum = 0

for (let i = 0; i < inputString.length; i++) {
	if (!(inputString[i] in map)) {
		count = inputString.split(inputString[i]).length - 1
		map.set(inputString[i], count)
	}
}


for (const [key, value] of map) {
	pI = value / inputString.length
	sum += -(pI * Math.log2(pI))
}

console.log(sum)
