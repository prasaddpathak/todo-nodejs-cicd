/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to store all the functions required for the implementation
*/

// Wrapper method to add array of todo items from the .json file 
const addContent = (todo = []) => {
    const div = document.createElement('div');
    todo.forEach(item => addToDo(item,div));
    
    const para = document.getElementById('content');
    para.appendChild(div);
}

// Method to clear the todo items from the UI
const clearContent = () => {
    const para = document.getElementById('content');
    para.innerHTML = '';
}

// Method to add todo item to the list
const addToDo = (item,parent) => {

    const div = document.createElement('div');
    div.classList.add('todo-item');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.setAttribute('onclick','isCompleted(this)');

    // Add item details
    const item_details = document.createElement('div');
    item_details.classList.add('todo-details');
    item_details.classList.add('not-visible');
    const item_descrition = document.createElement('div');
    item_descrition.textContent = `Description: ${item.description}`;
    const item_duedate = document.createElement('div');
    item_duedate.textContent = `Due Date: ${item.due_date}`;
    const item_time = document.createElement('div');
    item_time.textContent = `Time: ${item.time}`;
    item_details.appendChild(item_descrition);
    item_details.appendChild(item_duedate);
    item_details.appendChild(item_time);

    const todoContent = document.createElement('span');
    todoContent.textContent = `${item.title}`;
    todoContent.classList.add('todo-item-title');

    div.appendChild(checkBox);
    div.appendChild(todoContent);
    div.appendChild(item_details);

    parent.appendChild(div);

}

// XHR request to fetch data from the todo.json file
const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(response) {
        if( this.status === 200){
            const data = this.responseText;
            const todo = JSON.parse(data);
            addContent(todo);
        }
        
    });
    xhr.open('GET', 'data/todo.json');
    xhr.send();
}

// Method to add a new ToDo item from UI to the existing list of ToDo items
const addToDoFromUI = () => {
    console.log("Pressed Add button");
    const isNull = (title.value === "" ||desc.value === "" ||date.value === "" ||time.value === "" );
    // Raise an alert if the values are null
    if (isNull) {
        alert("Required fields to add a ToDo item are empty!");
    }
    else {
        const item = {
            title : title.value,
            description : desc.value,
            due_date : date.value,
            time : time.value
        }
        console.log(item);
        const contentContainer = document.getElementById('content');
        addToDo(item,contentContainer);
        const todo = document.getElementById("add-todo");
        todo.classList.toggle("not-visible");

    }
}

// Method to toggle the completion of the ToDo
const isCompleted = (checkBox) => {
    const parent = checkBox.parentNode;
    parent.classList.toggle("strikethrough");
}

const enableTodoUI = () => {
    console.log('Clicked enable add!');
    const todo = document.getElementById("add-todo");
    todo.classList.toggle("not-visible");
}


// Click event listener to fetch data from the todo.json file
const showButton = document.getElementById('showButton');
showButton.addEventListener('click', fetchData);

// Click event listener to clear to the ToDo items from the screen
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearContent);

// Click event listener to add a new ToDo item from the UI
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addToDoFromUI);

// Click event listener to add a new ToDo item from the UI
const showAddButton = document.getElementById('showAddButton');
showAddButton.addEventListener('click', enableTodoUI);

// Function to toggle completion of the ToDo Item on checkbox click event
document.onclick = (item) => {
    // If clicked on todo div container toggle details
    if (item.target.classList.contains("todo-item")) {
        const details = item.target.querySelector('div');
        details.classList.toggle("not-visible");
        console.log('You have clicked a todo item!');
    }
    // If clicked on todo item title toggle details
    else if (item.target.classList.contains("todo-item-title")) {
        const parent = item.target.parentNode;
        const details = parent.querySelector('div');
        details.classList.toggle("not-visible");
        console.log('You have clicked a todo item!');
    }
}