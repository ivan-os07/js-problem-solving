const args = process.argv.slice(2)
const fs = require('fs')

const inputString = fs.readFileSync(args[0], 'utf8')

// Считываем частоту каждого символа
function getFreqMap(str) {
	const freq = {}
	for (const ch of str) freq[ch] = (freq[ch] || 0) + 1
	return freq
}

/*
строим дерево, где
[a, b] - правая и левая ветки
a[1] + b[1] - общая сумма частот
*/
function combine(a, b) {
	return [[a, b], a[1] + b[1]]
}

// функция для построения дерева Хаффмана
function buildHuffmanTree(lst) {
	while (lst.length > 1) {
		// сортируем по возрастанию частоты
		lst.sort((a, b) => a[1] - b[1])

		// shift удаляет первый элемент массива и возвращает его
		const left = lst.shift()
		const right = lst.shift()

		const newNode = combine(left, right)
		lst.push(newNode)
	}

	return lst[0]
}

// получаем map с символами и их частотами
const freqMap = getFreqMap(inputString)

// freqMap -> массив [символ, частота]
let list = Object.entries(freqMap)

// строим дерево
const tree = buildHuffmanTree(list)

// console.dir(tree, { depth: null })

// // Рекурсивное построение таблицы кодов из массивной структуры
function buildCodesFromArray(node, prefix = '', codes = {}) {
	/*

	node: внутренний узел
	prefix: двоичный код
	codes: результат где все символы и их коды

	*/

	// node[0] - массив из двух веток или символа
	// проверка на то, что в узле только строка
	// те что крайний элемент в дереве
	if (typeof node[0] === 'string') {
		// получаем символ
		const char = node[0]
		codes[char] = prefix || '0'
	} else {
		// Иначе это внутренний узел: [ [left, right], freq ]
		const [children] = node
		// Рекурсивно обходим каждый уровень дерева
		buildCodesFromArray(children[0], prefix + '0', codes)
		buildCodesFromArray(children[1], prefix + '1', codes)
	}
	return codes
}

const codes = buildCodesFromArray(tree)
console.log('Коды символов:', codes)
