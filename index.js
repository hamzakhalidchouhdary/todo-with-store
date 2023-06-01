function addNewTodoItem(event) {
  const text = event.target.value;
  event.target.value = null;
  console.log(text);
}