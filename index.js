const todoContainer = document.querySelector("#todo-container");

var store = [];

function createTodoElement({ text, id }) {
  if (!text) return;
  const todoItemWrapper = document.createElement("li");
  const todoRemoveBtn = document.createElement("button");
  const todoTextEle = document.createElement("p");
  todoRemoveBtn.innerText = "X";
  todoRemoveBtn.addEventListener("click", () => removeItem(id));
  todoRemoveBtn.classList.add("btn", "btn-outline-danger", "btn-md", "col-1");
  todoItemWrapper.classList.add(
    "row",
    "py-3",
    "border-top",
    "border-bottom",
    "border-light-subtle"
  );
  todoTextEle.classList.add("col-11", "m-0");
  todoTextEle.innerText = text;
  todoItemWrapper.appendChild(todoTextEle);
  todoItemWrapper.appendChild(todoRemoveBtn);
  return todoItemWrapper;
}

function renderItems() {
  todoContainer.innerHTML = "";
  store.forEach((item) => {
    const newItem = createTodoElement(item);
    todoContainer.append(newItem);
  });
}

function addNewItem(text) {
  store.push({
    id: Date.now(),
    text,
  });
  storeState();
}

function storeState() {
  localStorage.setItem("todoWithStore", JSON.stringify(store));
  renderItems();
}

function restoreState() {
  store = JSON.parse(localStorage.getItem("todoWithStore")) || [];
  renderItems();
}

function removeItem(itemId) {
  store = store.filter(({ id }) => id !== itemId);
  storeState();
}

function addNewTodoItem(event) {
  const text = event.target.value;
  event.target.value = null;
  addNewItem(text);
  renderItems();
}

restoreState();
