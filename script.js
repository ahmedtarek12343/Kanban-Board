let cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addTask = document.querySelector("#addTask");
const form = document.querySelector(".task__form");
const overlay = document.querySelector(".overlay");
const closeForm = document.querySelector("#closeForm");
const addToBoard = document.querySelector("#addToBoard");
const taskName = document.querySelector("#task__name");
const taskProgress = document.querySelector("#task_progress");

let nextID = 1;

for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag Ended");
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
}

addTask.addEventListener("click", () => {
  form.classList.add("show");
  overlay.classList.add("shown");
});

overlay.addEventListener("click", () => {
  form.classList.remove("show");
  overlay.classList.remove("shown");
});

closeForm.addEventListener("click", () => {
  form.classList.remove("show");
  overlay.classList.remove("shown");
});

addToBoard.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskName.value === "") {
    alert("Please enter a valid value");
    return;
  }
  const id = `card${nextID++}`;
  const html = `<div class="card" draggable="true" id="${id}"><i class="removeCard ri-close-line"></i>${taskName.value}</div>`;
  const parent = document.querySelector(`[data-${taskProgress.value}]`);
  parent.insertAdjacentHTML("beforeend", html);

  // ✅ Add event listeners to the newly created card
  const newCard = document.getElementById(id);
  newCard.addEventListener("dragstart", dragStart);
  newCard.addEventListener("dragend", dragEnd);
  form.classList.remove("show");
  overlay.classList.remove("shown");
  taskName.value = "";
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("removeCard")) {
    const card = e.target.closest(".card");
    card.remove();
  }
});
