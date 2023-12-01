// interactive design 

// DOM Elements
const tasksContainer = document.querySelector('#task-list');
const btnCreate = document.querySelector('#create');
const modal = document.querySelector('#modal');

const btnClose = document.querySelector('.btn-close');
const btnCancel = document.querySelector('.cancel-btn');
const btnAdd = document.querySelector('.add-btn');

const inputTask = document.querySelector('#input-task');
const inputDueDate = document.querySelector('#input-due-date');
const inputDescription = document.querySelector('#input-description');

const mgsOne = document.querySelector('.msg-1');
const mgsTwo = document.querySelector('.msg-2');
const btnUpdate = document.querySelector('.update-btn');

const form = document.querySelector('#form');

// adding event listener to HTML Element 
btnCreate.addEventListener('click', () => {
    btnUpdate.classList.add('hidden');
    modal.classList.add('active');
});

btnAdd.addEventListener('click', () => {
    formValidation();
});

btnClose.addEventListener('click', closeModel)
btnCancel.addEventListener('click', closeModel);

// local storage
const appStorage = JSON.parse(localStorage.getItem('to-do-app') || '[]');

// form validation
let formValidation = () => {
    if (inputTask.value==='' && inputDueDate.value === '' ) {
        mgsOne.innerHTML = 'Task cannot be blank';
        mgsTwo.innerHTML = 'Date cannot be blank';
        console.log("missing");
        form.style.height='auto';
    } 
    else if(inputTask.value!=='' && inputDueDate.value === ''){
        console.log("Date cannot be blank");
        mgsTwo.innerHTML = 'Date cannot be blank';
        mgsOne.innerHTML='';
        form.style.height='auto';
    }
    else if(inputTask.value==='' && inputDueDate.value !== ''){
        console.log("Task cannot be blank");
        mgsOne.innerHTML = 'Task cannot be blank';
        mgsTwo.innerHTML='';
        form.style.height='auto';
    }
    else if(inputTask.value!=='' && inputDueDate.value!==''){
        modal.classList.remove('active');
        console.log(inputTask.value);
        acceptData();
        resetForm();
    }
    else{
        console.log("error");
    }
};

// accept data and store local storage
let acceptData = () => {
    console.log(inputTask.value);
    const taskObj = {
        title: inputTask.value,
        dueDate: inputDueDate.value,
        description: inputDescription.value,
    };
    console.log(taskObj);

    appStorage.push(taskObj);
    localStorage.setItem('to-do-app', JSON.stringify(appStorage));

    console.log(appStorage);
    createTask();
    resetForm();
};

// create Dynamic DOM elements
let createTask = () => {
    tasksContainer.innerHTML = '';
    console.log(appStorage);

    appStorage.map((x, y, z) => {
        console.log(x, y, z);
        // console.log(tasksContainer.innerHTML);
        return (tasksContainer.innerHTML = tasksContainer.innerHTML + `
            <div class="task" id=${y}>
                <div class="task_title">
                    <h4>${x.title}</h4>
                </div>
                <div class="date">
                    <p>${x.dueDate}</p>
                </div>
                <div class="description">
                    <p>${x.description}</p>
                </div>
                <span class="options">
                    <i class="fa-solid fa-pen-to-square" class="btn-edit" onClick="editData(this)"></i>
                    <i class="fa-solid fa-trash-can" class="btn-delete" onClick="deleteData(this)"></i>
                </span>
            </div>`);
    });
    resetForm();
    console.log(appStorage);
};

// reset form function
let resetForm = () => {
    inputTask.value = '';
    inputDueDate.value = '';
    inputDescription.value = '';
    mgsOne.innerHTML='';
    mgsTwo.innerHTML='';
}
createTask();

// delete data function
let deleteData = (element) => {
    console.log(element.parentElement.parentElement);
    let deleteTask = element.parentElement.parentElement;
    tasksContainer.removeChild(deleteTask);

    appStorage.splice(deleteTask.id, 1);
    localStorage.setItem('to-do-app', JSON.stringify(appStorage));
};

// edit data function
let editData = (element) => {
    btnUpdate.classList.remove('hidden');
    btnAdd.classList.add('hidden');

    modal.classList.add('active');
    let editTask = element.parentElement.parentElement;
    inputTask.value = editTask.children[0].children[0].innerHTML;
    inputDueDate.value = editTask.children[1].children[0].innerHTML;
    inputDescription.value = editTask.children[2].children[0].innerHTML;

    btnUpdate.addEventListener("click", () => {
        tasksContainer.removeChild(editTask);
        appStorage.splice(editTask.id, 1);
        localStorage.setItem('to-do-app', JSON.stringify(appStorage));
        formValidation();
        btnAdd.classList.remove('hidden');
        resetForm();
    });
};

// close tab function
function closeModel() {
    resetForm();
    modal.classList.remove('active');
    btnAdd.classList.remove('hidden');
};
