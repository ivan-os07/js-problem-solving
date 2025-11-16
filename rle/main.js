const args = process.argv.slice(2)

const fs = require('fs')

const inputString = fs.readFileSync(args[1], 'utf8')
// const outputString = fs.readFileSync('output.txt', 'utf8');

// Кодирование
function rleEncode(str) {
	// Однобуквенные строчки
	if (str.length === 1) {
		return str
	}

	let result = ''
	let i = 0 // указатель

	// Подстрока с неповторяющимися
	let local = ''

	while (i < str.length) {
		// кол-во повторений
		count = 1

		// Проход по подстроке
		while (str[i] === str[i + 1]) {
			count++
			i++
		}

		if (count > 1) {
			result += nonRepeating(local)
			local = ''

			let [c, ost] = repeating(count, str[i])
			result += c

			local += ost
		} else if (count === 1) {
			local += str[i]
		}

		i++
	}

	// строки полностью неповторяющ и когда на конце неповторяющ
	if (i == str.length && local != '') {
		result += nonRepeating(local)
	}

	return result
}

// Декодирование
function rleDecode(str) {
	let res = ''
	let i = 0

	while (i < str.length) {
		dec = str[i].charCodeAt(0)
		// console.log(dec)

		if (dec <= 127) {
			res += str.slice(i + 1, i + dec + 1)
			i += dec + 1
			// console.log(dec)
		} else if (dec >= 128) {
			res += str[i + 1].repeat(dec - 126)
			// console.log(dec - 126, dec)
			i += 2
		}
	}
	return res
}

// Доп. функция для кодирования неповторяющ
function nonRepeating(local) {
	if (local.length === 1) {
		return String.fromCharCode(1) + local
	}
	let local_res = ''
	let max_leight = 127

	for (let j = 0; j < local.length; j += max_leight) {
		const chunk = local.slice(j, j + max_leight)
		local_res += String.fromCharCode(chunk.length) + chunk
	}

	return local_res
}

// Доп. функция для кодирования повторяющ
function repeating(count, simbol) {
	let res = ''
	let max_leight = 129

	while (count > max_leight) {
		res += String.fromCharCode(max_leight + 126) + simbol
		count -= max_leight
	}

	if (count === 1) {
		return [res, simbol]
	} else if (count > 1) {
		res += String.fromCharCode(count + 126) + simbol
		return [res, '']
	}
}

function writeToFile(stringToWrite) {
	let filePath = args[2]

	fs.writeFile(filePath, stringToWrite, error => {
		if (error) {
			console.error('Ошибка при записи файла:', error)
		} else {
			console.log('Строка успешно записана в файл!')
		}
	})
}

function main(str) {
	if (args[0] == 'encode') {
		writeToFile(rleEncode(str))
	} else if (args[0] === 'decode') {
		writeToFile(rleDecode(str))
	}
}

// Example
main(inputString)

// // Tests
// function test(inp) {
//     s1 = rleEncode(inp)
//     s2 = rleDecode(s1)

//     if (inp === s2) {
//         console.log(`Test ok`)
//     } else {
//         console.log(`Test error | ${inp} ${s2}`)
//     }
// }

// test('A')                      // одиночная буква
// test('AA')                     // два одинаковых символа
// test('AB')                     // два разных символа
// test('AAA')                    // три одинаковых
// test('AAB')                    // два одинаковых, потом другой
// test('ABB')                    // один, потом два одинаковых
// test('ABCD')                   // все разные
// test('AABBCC')                 // пары одинаковых символов
// test('AAABBBCCC')              // трижды повторяющиеся группы
// test('AABBAACC')               // чередование одинаковых
// test('ABCDEFFFG')              // повтор в конце
// test('GGGABCDE')               // повтор в начале
// test('AABCDDEE')               // комбинированный случай
// test('AAAAAAAAAAAA')           // длинная серия повторений
// test('ABABABAB')               // чередующиеся символы
// test('A')                      // один символ (ещё раз, граничный случай)
// test('')                       // пустая строка
// test('XYZXYZXYZXYZ')           // повторяющиеся подстроки без повторяющихся символов
// test('ZZZZZZZZZZZZZZZZZZZZ')   // длинная последовательность одного символа
// test('AABBAABBAABB')           // структурированное повторение
// test('123987777')           // структурированное повторение чисел
