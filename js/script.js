
const todoForm = document.querySelector("#todo-form"); 
const todoInput = document.querySelector("#new-task"); 
const todoList = document.querySelector("#todo-list"); 

const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

const loadTodosFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        saveTodo(todo);
    });
}

const saveTodo = (text) => {
    const todo = document.createElement("li");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h2");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    removeBtn.addEventListener("click", () => {
        removeTodo(text);
        todo.remove();
    });
    todo.appendChild(removeBtn);
    todoList.appendChild(todo);
    console.log(todo);
}

const removeTodo = (text) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodos = todos.filter(todo => todo !== text);
    saveTodosToLocalStorage(newTodos);
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue) {
        saveTodo(inputValue);
        
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push(inputValue);
        saveTodosToLocalStorage(todos);
        todoInput.value = ""; 
    }
});


document.addEventListener("DOMContentLoaded", loadTodosFromLocalStorage);