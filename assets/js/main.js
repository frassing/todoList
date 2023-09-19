const listToDo = document.getElementById('listToDo');
const lis = listToDo.querySelectorAll('li');
const inputToDo = document.getElementById('inputToDo');
const btnNewToDo = document.getElementById('btn_new');
const btnResetList = document.getElementById('btn_reset');


// Adicionar uma nova tarefa ao clicar no botão "Nova tarefa" ou ao pressionar a tecla "Enter"
btnNewToDo.addEventListener('click', addTask);
inputToDo.addEventListener('keyup', (e) => {
	if (e.key == 'Enter') {
		addTask();
	}
})

function addTask() {
	let li = document.createElement('li');
	let	task = document.createTextNode(inputToDo.value); 

	// Verifica se há texto no input para não criar uma tarefa vazia
	if (inputToDo.value == '') {
		alert('Não é possível adicionar uma tarefa em branco!');

	} else {
		// Adiciona o texto da task numa li e adiciona essa li na lista ul
		li.appendChild(task);
		listToDo.appendChild(li);
		// Adiciona botão de remover a task
		createRemoveBtn(li);
	}
	inputToDo.value = '';
	inputToDo.focus();
}

// Acrescenta event listener na ul, verifica o click nas li e passa a li clicada para a função toggleDone
listToDo.addEventListener('click', (e) => {
	if (e.target.nodeName == 'LI') {
		toggleDone(e.target) 
	}
})
// Adiciona ou remove a classe done
function toggleDone(li) {
	li.classList.toggle('done');
}

// Adicionar uma span que vai inserir um símbolo de 'x'
function createRemoveBtn(li) {
	let span = document.createElement('span');
	let remove = document.createTextNode("\u00D7");

	span.classList.add('removeBtn');
	span.appendChild(remove);
	li.appendChild(span);
}

// Adiciona um event listener na lista para verificar o click no span de uma li, passa essa li para a função removeTask
listToDo.addEventListener('click', (e) => {
	if (e.target.nodeName == 'SPAN') {
		removeTask(e.target.parentNode) 
	}
})

// Exibe uma mensagem de confirmação para o usuário e, se confirmado, remove a li selecionada
function removeTask(li) {
	let text = li.textContent;
	// Remove o 'x' do textContent
	text = text.slice(0, (text.length - 1));

	if (confirm('Excluir tarefa: ' + text + '?')) {
		li.parentNode.removeChild(li);
	}
	inputToDo.focus();
}

// Apagar a lista inteira ao clicar e confirmar
btnResetList.addEventListener('click', clearList);

function clearList() {
	if (confirm('Deseja apagar a lista de tarefas?')) {
		listToDo.innerHTML = '';
	}
	inputToDo.focus();
}