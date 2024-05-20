document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // 로컬 저장소에서 투두 항목 불러오기
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todoText => addTodoItem(todoText));

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            addTodoItem(todoText);
            saveTodoItem(todoText);
            todoInput.value = '';
        }
    });

    function addTodoItem(todoText) {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const todoSpan = document.createElement('span');
        todoSpan.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
            removeTodoItem(todoText);
        });

        todoItem.appendChild(todoSpan);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    }

    function saveTodoItem(todoText) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoItem(todoText) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo !== todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
