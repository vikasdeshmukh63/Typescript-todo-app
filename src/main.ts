import './style.css'

// declaring the datatype for one todo item 
interface Todo {
    title: string;
    isCompleted: boolean;
    readonly id: string;
}

// initializing an empty array to store the todo items 
const todos: Todo[] = []

// selecting the elements 
const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement
const myForm = document.getElementById("myForm") as HTMLFormElement;


// ! setting on submit function 
myForm.onsubmit = (e) => {
    // to avoid reloading of page after submit 
    e.preventDefault();

    // creating todo item object 
    const todo: Todo = {
        title: todoInput.value,
        isCompleted: false,
        id: String(Math.random() * 100)
    }

    // pushing the object to todos array 
    todos.push(todo);

    // reset the input 
    todoInput.value = "";

    // calling function to render the todo item on the page 
    renderTodo(todos);
}

// ! function to generate todo item 
function generateTodoItem(item: Todo) {
    // creating new div element 
    const todo = document.createElement("div") as HTMLDivElement
    // adding todo clas to the todo element 
    todo.className = "todo";

    // creating new checkbox element 
    const checkbox = document.createElement("input") as HTMLInputElement
    // making input type as checkbox 
    checkbox.setAttribute("type", "checkbox");
    // adding classname to checkbox element 
    checkbox.className = "isCompleted"
    // to make checkbox check or uncheck 
    checkbox.checked = item.isCompleted;
    // to make the title strikethrough when checkbox is checked
    checkbox.onchange = () => {
        todos.find((obj) => {
            if (obj.id === item.id) {
                item.isCompleted = checkbox.checked;
                // change text style
                updateTextStyling();
            }
        })
    }

    // creating new paragraph element for title
    const paragraph = document.createElement("p") as HTMLParagraphElement
    // paragraph text 
    paragraph.innerText = item.title;

    //! Function to update the text styling based on the checkbox state
    const updateTextStyling = () => {
        paragraph.className = checkbox.checked ? "textCut" : "";
    };

    // Set the initial styling
    updateTextStyling();

    // creating button for delete functionality
    const btn = document.createElement("button") as HTMLButtonElement
    // button text
    btn.innerText = "X";
    // adding classname to button 
    btn.className = "deleteBtn"
    // removing the todo item from the list
    btn.onclick = () => {
        deleteTodoItem(item.id)
    }

    // appending all element to todo element 
    todo.append(checkbox, paragraph, btn);

    // appending todo item to todo container 
    todosContainer.append(todo);

    // add an event listener to the checkbox for styling updates
    checkbox.onchange = () => {
        todos.find((obj) => {
            if (obj.id === item.id) {
                obj.isCompleted = checkbox.checked;
                // change text style
                updateTextStyling();
            }
        });
    };

}

// ! function to handle rendering of todo item on page 
function renderTodo(todos: Todo[]) {
    // to avoid rendering same item again and again
    todosContainer.innerText = ""
    if (todos.length === 0) {
        // If the todos array is empty, display a message
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "The todo list is empty.";
        todosContainer.appendChild(emptyMessage);
    } else {
        // If there are items in the todos array, render them
        todos.forEach((item) => {
            // Calling function to generate todo item
            generateTodoItem(item);
        });
    }
}

// ! function to delete todo item 
function deleteTodoItem(id: string) {
    // finding the clicked item index 
    const idx = todos.findIndex((item) => item.id === id);

    // removing the element of specific id from todosArray
    todos.splice(idx, 1)

    // to show latest call render function again
    renderTodo(todos);
}