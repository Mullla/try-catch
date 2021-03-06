// создается функция фильтрации значений по типу значения
// вход: принимаются два аргумента - тип и массив значений
// выход: отфильтрованный массив значений, у которых тип равен входящему типу
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// функция, которая скрывает блоки с классом dialog__response-block
	hideAllResponseBlocks = () => {
		// собирается массив из коллекции всех div с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебор массива, каждому блоку в стилях прописывается display: none
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// функция, которая показывает блок
	// вход: селектор блока, текст сообщения, селектор
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// скрываются все блоки
		hideAllResponseBlocks();
		// показывается блок с заданным на входе селектором
		document.querySelector(blockSelector).style.display = 'block';
		// если в блоке есть span с заданным селектором, то в него записывается сообщение на входе
		if (spanSelector) {
			// поиск в документе элемента span с заданным селектором и запись в него сообщения со входа
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// функция, которая показывает ошибку
	// вход: текст сообщения
	// выход: возвращает функцию, которая показывает блок с ошибкой, в span записывается сообщение об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// функция, которая показывает успешный результат
	// вход: текст сообщения
	// выход: возвращает функцию, которая показывает блок с успешным результатом, в span записывается сообщение, что все ok
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// функция, которая показывает, что результат не найден
	// выход: возвращает функцию, которая показывает блок, что результаты не найдены
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// конструкция try,catch
	// вход: тип, значения
	tryFilterByType = (type, values) => {
		// блок кода, который нужно выполнить
		try {
			// создается массив со значениями
			// eval выполняет строку как блок кода
			// в результате выполняется функция фильтрации значений по типу значения
			// все элементы массива с помощью join соединяются в строку и перечисляются через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// сообщение, которое выводится в зависимости от того, есть ли массив значений или нет
			const alertMsg = (valuesArray.length) ?
				// если массив не пустой, показывается тип данных и значения
				`Данные с типом ${type}: ${valuesArray}` :
				//если массив пустой, то сообщение, что данные заданного типа отсутствуют
				`Отсутствуют данные типа ${type}`;
			// функция, которая показывает результат обработки
			showResults(alertMsg);
		// обработка ошибок
		// вход: ошибка
		} catch (e) {
			// в результате ошибки выполняется функция, которая показвается ошибку 
			showError(`Ошибка: ${e}`);
		}
	};
// получаем со страницы кнопку фильтрации
const filterButton = document.querySelector('#filter-btn');

// добавляем слушатель на событие клика
// функция принимает событие
filterButton.addEventListener('click', e => {
	// получаем инпут, куда записывается тип значения
	const typeInput = document.querySelector('#type');
	// получаем инпут, куда записываются значения, которые нужно обработать
	const dataInput = document.querySelector('#data');

	// если значения не записаны, то возникает предупреждение, что поле не должно быть пустым
	if (dataInput.value === '') {
		// метод setCustomValidity(принадлежит HTML-элементу) устанавливает пользовательское сообщение об ошибке
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызывается функция, которая показывает, что нет результатов
		showNoResults();
	} else {
		// показывает, что ошибки нет
		dataInput.setCustomValidity('');
		// отменяет стандартное поведение
		e.preventDefault();
		// запускает функцию фильтрации значений по типу, у каждого значения инпута обрезаются по бокам пробелы
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

