const fs = require('fs')

// для ввода с клавиатуры
const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
})

const ask = () => new Promise(r => rl.question('', r))

// считываем код
const code = fs.readFileSync(process.argv[2], 'utf8')
const lines = code.split('\n').filter(l => l)

const labels = {}
lines.forEach((l, i) => {
	if (l.endsWith(':')) labels[l.slice(0, -1)] = i
})

const mem = {}
const stack = []
// какая строка сейчас
let pc = 0

function step() {
	if (pc >= lines.length) return
	let line = lines[pc]
	if (line.endsWith(':')) {
		pc++
		step()
		return
	}

	const [op, arg] = line.split(/\s+/)
	switch (op) {
		case 'push':
			stack.push(+arg)
			break
		case 'load':
			stack.push(mem[arg] ?? 0)
			break
		case 'store':
			mem[arg] = stack.pop()
			break
		case 'add':
			{
				let b = stack.pop(),
					a = stack.pop()
				stack.push(a + b)
			}
			break
		case 'sub':
			{
				let b = stack.pop(),
					a = stack.pop()
				stack.push(a - b)
			}
			break
		case 'mul':
			{
				let b = stack.pop(),
					a = stack.pop()
				stack.push(a * b)
			}
			break
		case 'mod':
			{
				let b = stack.pop(),
					a = stack.pop()
				if (b === 0) throw 'div0'
				stack.push(a % b)
			}
			break
		case 'eq':
			{
				let b = stack.pop(),
					a = stack.pop()
				stack.push(a === b ? 1 : 0)
			}
			break
		case 'jmp':
			pc = labels[arg]
			step()
			return
		case 'jz':
			if (stack.pop() === 0) {
				pc = labels[arg]
				step()
				return
			}
			break
		case 'print':
			console.log(stack.pop())
			break
		case 'read':
			ask().then(v => {
				stack.push(+v)
				pc++
				step()
			})
			return
		case 'halt':
			process.exit(0)
	}
	pc++
	step()
}
step()
