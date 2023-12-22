let todoInput = document.querySelector(".input");
let todoButton = document.querySelector(".button");
let showtodoList = document.querySelector(".todos-container");
let todo;
let todoList = [];

//creating a function to generate a unique id
function uuid() {
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx".replace(/[xy]/g, function (para) {
    let number = (Math.random() * 16) | 0;
    let randomNumber = para == "x" ? number : (number & 0x3) | 0x8;
    return randomNumber.toString(16);
  });
}

//creating an array saving the list of works added.
todoButton.addEventListener("click", (event) => {
  event.preventDefault();
  todo = todoInput.value;
  if (todo.length > 0) {
    todoList.push({ id: uuid(), task: todo, isCompleted: false });
  }

  rendertodoList(todoList);
  todoInput.value = "";

  //showing updated list after clicking on add button
});

//function for updating todoList

function rendertodoList(todoList) {
  console.log(todoList);
  showtodoList.innerHTML = todoList.map(
    ({ id, task, isCompleted }) => `
        <div>
            <input id="item-${id}" type="checkbox" data-key="${id}" ${
      isCompleted ? "checked" : ""
    }>
            <label for="item-${id}" class="todo todo-text t-pointer ${
      isCompleted ? "checked-todo" : ""
    }" data-key="${id}">
                ${task}
            </label>
            <button class=" cursor" data-todokey="${id}">
            <span class="material-symbols-outlined">
            delete
            </span>
            </button>
        </div>`
  );
}

// showtodoList.addEventListener("click",(e) => {
// let key =e.target.dataset.key;
// console.log(key);
// console.log(e.target);
// })

showtodoList.addEventListener("click", (e) => {
  let deleteKey = e.target.dataset.todokey;
  let key = e.target.dataset.key;
  todoList = todoList.map((todo) =>
    todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  todoList = todoList.filter((todo) => todo.id !== deleteKey);
  rendertodoList(todoList);
  console.log(todoList);
});

rendertodoList(todoList);
