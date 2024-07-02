const popWindow = document.getElementById('addWindow');
const nameInput = document.getElementById('nameInput');
const cursor = document.cursor;
const ul = document.getElementById('taskList');
let x = 0;
//opening the task window
function openPop(){
    popWindow.style.display = 'block';
}

//closing the task window
function closePop(){
    popWindow.style.display = 'none';
    nameInput.value = "";
}

//Creatign a task
function taskAdd(){
    if(nameInput.value != ''){
    const li = document.createElement('li');
    li.textContent = nameInput.value;
    const taskButton = taskButtons()
    li.appendChild(taskButton);
    ul.appendChild(li);
    x++;
    closePop();
    }
    
}


// making buttons on tasks
function taskButtons() {
    const taskButtonsContainer = document.createElement('div');
    const doneButton = document.createElement('button');
    const desButton = document.createElement('button');
    desButton.className = "desButton";
    doneButton.className = 'doneButton';  
    doneButton.textContent = 'done';
    desButton.textContent = "detail";
    taskButtonsContainer.className = 'li-buttons';
    taskButtonsContainer.appendChild(desButton);
    taskButtonsContainer.appendChild(doneButton);

    doneButton.addEventListener('click', function(){
        const listElement = doneButton.parentElement.parentElement;
        ul.removeChild(listElement);
    });

    return taskButtonsContainer;
}
