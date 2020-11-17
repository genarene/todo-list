// dom manupilation
const todoTaskInput = document.querySelector("#task-Input");
const dateInput = document.querySelector("#date-Input");
const timeInput = document.querySelector("#time-Input");
const notesInput = document.querySelector("#notes-Input");
const todoBtn= document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo")

// logic


// functions
const addTodo = () => {
    // prevent form from submitting
    event.preventDefault();

    // create objects
    const todObj = {
        day: dateInput.value,
        time: timeInput.value,
        task: todoTaskInput.value,
        notes:notesInput.value
    }

    // local storage
    saveLocalTodos(todObj);

    // create a todo div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoList.appendChild(todoDiv);

    // create li
    const newTodo = document.createElement('li');
    newTodo.classList.add('newTodo')
    // date input
    const date= document.createElement('h1');
    date.innerText = dateInput.value;
    newTodo.appendChild(date);
    
    // time input
    const time= document.createElement('h2');
    time.innerText = timeInput.value;
    newTodo.appendChild(time);

    // task input
    const task = document.createElement('h3');
    task.innerText = todoTaskInput.value;
    newTodo.appendChild(task);

    // notes input
    const notes = document.createElement('h5');
    notes.innerText = notesInput.value;
    newTodo.appendChild(notes);
    // newTodo.innerText =  todoTaskInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

      // check trash button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

   

    // clear todo input value
    todoTaskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    notesInput.value = "";


    window.location.reload();

}

const deleteCheck = (e) => {
    const item = e.target;
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall')
        removeTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })

        window.location.reload();
       
    }

    // check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');  
        
    }
}

const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
    console.log(todos);

        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
// event listeners

todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// local storage
const saveLocalTodos = (todo) => {
    // check if there is anything stored
    let todos = [];
    // if there isnt that item create an empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// API 
const getTodos = () => {
    let todos = [];

    // if there isnt that item create an empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    filterTask(todos);

    todos.forEach( (todo)=> {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoList.appendChild(todoDiv);
    
        // create li
        const newTodo = document.createElement('li');
        newTodo.classList.add('newTodo')
        // date input
        const date= document.createElement('h1');
        date.innerText = todo.day;
        newTodo.appendChild(date);
        
        // time input
        const time= document.createElement('h2');
        time.innerText = todo.time;
        newTodo.appendChild(time);
    
        // task input
        const task = document.createElement('h3');
        task.innerText = todo.task;
        newTodo.appendChild(task);
    
        // notes input
        const notes = document.createElement('h4');
        notes.innerText = todo.notes;
        newTodo.appendChild(notes);
        // newTodo.innerText =  todoTaskInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // check mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
    
          // check trash button
          const trashButton = document.createElement('button');
          trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    });



}
document.addEventListener("DOMContentLoaded", getTodos);

//  remove local todos
const removeTodos = (todo) => {

    let todos = [];
       // if there isnt that item create an empty array
      if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const filterTask = (todos) => {
    const filterTodos = document.querySelector(".select");
    if (todos.length > 0) {
        filterTodos.style.display = "flex";     
    }
    else {
        filterTodos.style.display = "none";   
    }
}
 
 