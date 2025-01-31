const popWindow = document.getElementById('addWindow');
const nameInput = document.getElementById('nameInput');
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
    scrollBar();
    closePop();
    }
    
}

// making buttons on tasks
function taskButtons() {
    const taskButtonsContainer = document.createElement('div');
    const doneButton = document.createElement('button');
    doneButton.className = 'doneButton';  
    doneButton.textContent = 'done';
    taskButtonsContainer.className = 'li-buttons';
    taskButtonsContainer.appendChild(doneButton);
    doneButton.addEventListener('click', function(){
        const listElement = doneButton.parentElement.parentElement;
        ul.removeChild(listElement);
        x--;
    });

    return taskButtonsContainer;
}
function scrollBar(){
    if(x > 5){
        ul.style.overflowY = 'scroll';
    }
    else{
        ul.style.overflowY = 'hidden';
    }
}