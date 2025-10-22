const args = process.argv.slice(2)

const fs = require('fs')

const inputSubString = fs.readFileSync(args[0], 'utf8') // подстрока
const inputString = fs.readFileSync(args[1], 'utf8') // большая строка

function create_matrix_params(str) {
	const m_rows = str.length

	const unique_symb = [...new Set(str)]
	const m_cols = unique_symb.length

	return { str, m_cols, m_rows, unique_symb }
}

function fill_matrix({ str, m_cols, m_rows, unique_symb }) {
	let matrix = []

	// создаем пустую матрицу m_rows x m_cols
	for (let i = 0; i < m_rows; i++) {
		matrix.push(Array(m_cols).fill(0))
	}

	// проход по матрице
	for (let state = 0; state < m_rows; state++) {
		for (let s = 0; s < unique_symb.length; s++) {
			let c = unique_symb[s]

			if (c === str[state]) {
				// если символ совпадает с ожидаемым, то переход вперед
				matrix[state][s] = state + 1
			} else {
				// откат для поиска максимального префикса
				let k = state
				while (k > 0) {
					if (str.slice(0, k) === str.slice(state - k + 1, state) + c) break
					k--
				}
				matrix[state][s] = k
			}
		}
	}

	return matrix
}

function find_substrng(substr, big_str) {
	let params = create_matrix_params(substr)
	let matrix = fill_matrix(params)

	let state = 0
	let flag = false

	for (let i = 0; i < big_str.length; i++) {
		// текущий элемент
		let c = big_str[i]
		// индекс текущего элемента в уникальных
		let idx = params.unique_symb.indexOf(c)

		// если символ не в уникальных символах подстроки, то переход в 0
		// indexOf возвращает -1 если не нашла элемента в set
		state = idx !== -1 ? matrix[state][idx] : 0

		if (state === substr.length) {
			// нашли подстроку
			console.log('You win')
			console.log({ start: i - substr.length + 1, end: i })
			flag = true
			break
		}
	}

	if (!flag) console.log('Lose')
	console.log(matrix)
}

find_substrng(inputSubString, inputString)

// console.log(fill_matrix(create_matrix_params('ананас')))
