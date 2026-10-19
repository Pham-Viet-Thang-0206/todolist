// const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
// const taskList = document.querySelector("#task-list");
// const form = document.querySelector("#todo-form");
// const input = document.querySelector("#todo-input");
// const button = document.querySelector("#submit");
// const isDuplicateTask = function (newTitle, excludeIndex = -1) {
//     const isDuplicate = tasks.some(
//         (task, index) =>
//             task.title.toLowerCase() === newTitle.toLowerCase() &&
//             excludeIndex !== index,
//     );
//     return isDuplicate;
// };
// const saveDatas = function () {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// };
// let editingTasks = new Set();
// const handleTasksAction = function (e) {
//     const taskItem = e.target.closest(".task-item");
//     if (!taskItem) return;
//     const taskTitle = e.target.closest(".task-title");
//     const taskIndex = +taskItem.dataset.index;
//     const task = tasks[taskIndex];
//     if (e.target.closest(".edit")) {
//         editingTasks.add(taskIndex);
//         renderTask();
//         const taskEdit = taskList.querySelector(`[data-index="${taskIndex}"]`);
//         const editInput = taskEdit.querySelector(".edit-input");
//         editInput.focus();
//         const length = editInput.value.length;
//         editInput.setSelectionRange(length, length);
//     } else if (e.target.closest(".update")) {
//         e.preventDefault();
//         const formInput = e.target.closest(".task-item");
//         const editingIndex = +formInput.dataset.index;
//         const editInput = formInput.querySelector(".edit-input");
//         const newTitle = editInput.value.trim();

//         if (isDuplicateTask(newTitle, taskIndex)) {
//             alert("Task with this title already exist!");
//             return;
//         }
//         if (!newTitle) {
//             alert("Please write down a task");
//             return;
//         }
//         tasks[editingIndex].title = newTitle;
//         editingTasks.delete(editingIndex);
//         renderTask();
//         saveDatas();
//     } else if (e.target.closest(".delete")) {
//         if (confirm("Are you sure you want to delete this task?")) {
//             tasks.splice(taskIndex, 1);
//             const newEditTasks = new Set();
//             editingTasks.forEach((index) => {
//                 if (index < taskIndex) {
//                     newEditTasks.add(index);
//                 } else if (index > taskIndex) {
//                     newEditTasks.add(index - 1);
//                 }
//             });
//             editingTasks = newEditTasks;
//             renderTask();
//             saveDatas();
//         }
//     } else if (taskTitle) {
//         task.completed = !task.completed;
//         renderTask();
//         saveDatas();
//     }
// };

// // thêm công việc mới
// function addTask(e) {
//     e.preventDefault();
//     const value = input.value.trim();
//     if (isDuplicateTask(value)) {
//         alert("Task with this title already exist!");
//         return;
//     }
//     if (!value) {
//         alert("Please write down a task");
//         return;
//     }
//     const task = {
//         title: value,
//         completed: false,
//     };
//     tasks.push(task);
//     renderTask();
//     saveDatas();
//     input.value = "";
// }

// // render

// function renderTask() {
//     if (!tasks.length) {
//         return (taskList.innerHTML = `<li class="text-center italic text-[#888]">No tasks available.</li>`);
//     }
//     const html = tasks
//         .map((task, index) => {
//             if (editingTasks.has(index)) {
//                 return `<form action="" autocomplete="off"  data-index="${index}" class="flex bg-[#8758FF] mb-8.25 w-full task-item">
//                                 <input type="text"
//                                     class="flex-1 bg-[#1A1A40] px-5 py-3 border border-[#8758FF] outline-none min-w-0 text-white placeholder:text-[#646681] edit-input"
//                                     placeholder="Update task" value="${task.title}" spellcheck="false" />
//                                 <button

//                                     class="flex justify-center items-center bg-[#8758FF] px-2.25 py-3 text-white cursor-pointer update"
//                                     onmousedown="event.preventDefault()">Update</button>
//                         </form>`;
//             }

//             return `<li  class="flex justify-between items-center bg-[#8758ff] px-4.5 py-3.75 rounded-md w-full cursor-pointer task-item" data-index="${index}">
//                     <span class="text-white text-xl task-title ${task.completed ? "line-through" : ""}">${task.title}</span>
//                     <div class="flex gap-3 task-action">
//                         <!-- edit icon -->
//                         <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square"
//                             class="w-4 h-4 text-white cursor-pointer edit" role="img" xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 512 512">

//                             <path fill="currentColor"
//                                 d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z">
//                             </path>
//                         </svg>
//                         <!-- delete icon -->
//                         <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
//                             class="w-4 h-4 text-white cursor-pointer delete" role="img" xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 448 512">
//                             <path fill="currentColor"
//                                 d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
//                             </path>
//                         </svg>
//                     </div>
//                 </li>`;
//         })
//         .join("");
//     taskList.innerHTML = html;
// }

// form.addEventListener("submit", addTask);
// taskList.addEventListener("click", handleTasksAction);
// renderTask();

// ------- Dom ------- //
const taskList = document.querySelector("#task-list");
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

// ------- Constants ------ //
const STORAGE_KEY = "tasks";

const ICONS = {
    edit: ` <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-action="edit" data-icon="pen-to-square"
                            class="w-4 h-4 text-white cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">

                            <path fill="currentColor"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z">
                            </path>
                        </svg>`,
    delete: `<svg  aria-hidden="true" focusable="false" data-prefix="fas" data-action="delete" data-icon="trash"
                            class="w-4 h-4 text-white cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path fill="currentColor"
                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                            </path>
                        </svg>`,
};

function escapeHTML(html) {
    const div = document.createElement("div");
    div.innerText = html;
    return div.innerHTML;
}
// ----- ID ------ //
const createId = () => Date.now().toString(36);

// ------ State and Storage ------ //
function loadTask() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    return data;
}

function saveTask() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

let tasks = loadTask();
const editingTask = new Set();
const findTask = (id) => tasks.find((task) => task.id === id);

function commit() {
    saveTask();
    render();
}

// -------- Validation ------- //
function validateTitle(title, excludeId = -1) {
    if (!title) return "Please write down a task";

    const isDuplicate = tasks.some((task) => {
        return (
            task.title.toLowerCase() === title.toLowerCase() &&
            task.id !== excludeId
        );
    });
    return isDuplicate ? "Task with this title already exists!" : null;
}

//  --------- Templates ------- //
function viewItemHtml(task) {
    return `
        <li class="flex justify-between items-center bg-[#8758ff] px-4.5 py-3.75 rounded-md w-full cursor-pointer task-item"
            data-id="${task.id}">
            <span data-action="completed"
                class="text-white text-xl ${task.completed ? "line-through" : ""}">${escapeHTML(task.title)}</span>
            <div class="flex gap-3">
                ${ICONS.edit}
                ${ICONS.delete}
            </div>
        </li>`;
}

function editItemHTML(task) {
    return `
        <form autocomplete="off" data-id="${task.id}"
            class="flex bg-[#8758FF] mb-8.25 w-full edit-form">
            <input type="text" spellcheck="false" placeholder="Update task"
                value="${escapeHTML(task.title)}"
                class="flex-1 bg-[#1A1A40] px-5 py-3 border border-[#8758FF] outline-none min-w-0 text-white placeholder:text-[#646681] edit-input" />
            <button class="flex justify-center items-center bg-[#8758FF] px-2.25 py-3 text-white cursor-pointer">
                Update
            </button>
        </form>`;
}

// ------- Render ------- //

function render() {
    if (!tasks.length) {
        return (taskList.innerHTML = `<li class="text-center italic text-[#888]">No tasks available.</li>`);
    }
    taskList.innerHTML = tasks
        .map((task) =>
            editingTask.has(task.id) ? editItemHTML(task) : viewItemHtml(task),
        )
        .join("");
}

// ----- Actions ------ //
function addTask(e) {
    e.preventDefault();
    const title = input.value.trim();
    const error = validateTitle(title);
    if (error) return alert(error);
    tasks.push({ id: createId(), title, completed: false });
    input.value = "";
    commit();
}

const taskActions = {
    completed(task) {
        task.completed = !task.completed;
        commit();
    },
    edit(task) {
        editingTask.add(task.id);
        render();
        const editInput = taskList.querySelector(
            `[data-id = "${task.id}"] .edit-input`,
        );
        editInput.focus();
        editInput.setSelectionRange(
            editInput.value.length,
            editInput.value.length,
        );
    },
    delete(task) {
        if (!confirm("Are you sure you want to delete this task?")) return;
        tasks = tasks.filter((t) => t.id !== task.id);
        editingTask.delete(task.id);
        commit();
    },
};

// -------- Event Handlers ------- //
function handleTaskClick(e) {
    const actionEl = e.target.closest("[data-action]");
    const taskItem = e.target.closest(".task-item");
    if (!actionEl || !taskItem) return;
    const task = findTask(taskItem.dataset.id);
    if (!task) return;
    const action = taskActions[actionEl.dataset.action];
    if (action) {
        action(task);
    }
}

// -------- Update --------- //
function handleUpdateSubmit(e) {
    e.preventDefault();
    const formEl = e.target.closest(".edit-form");
    const task = findTask(formEl.dataset.id);
    const title = formEl.querySelector(".edit-input").value.trim();
    const error = validateTitle(title, task.id);
    if (error) {
        alert(error);
        return;
    }
    task.title = title;
    editingTask.delete(task.id);
    commit();
}

// ------- Event & Render --------- //
form.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskClick);
taskList.addEventListener("submit", handleUpdateSubmit);
render();
