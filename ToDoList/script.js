let list = [];
const popWindow = document.getElementById('addWindow');
const nameInput = document.getElementById('nameInput');
const taskDes = document.getElementById('desInput');
const ul = document.getElementById('taskList');
//opening the task window
function openPop(){
    popWindow.style.display = 'block';
}

//closing the task window
function closePop(){
    popWindow.style.display = 'none';
    nameInput.value = "";
    taskDes.value = "";
}

//Creatign a task
function taskAdd(){
    console.log('called');
    if(nameInput.value != "" ){
        list.unshift(new task(nameInput, taskDes));
        showList();
    }
    closePop();
}
//task constructor
function task(nameInput, description){
    this.description=description.value;
    this.taskName=nameInput.value;
    this.done = false;
    this.editDescription = function(newDescription){
        this.description=newDescription;
    }
    this.editName = function (newName){
        this.taskName = newName;
    }
}


//showing list of tasks
function showList(){
    ul.innerHTML = "";
    for(let i=0; i<list.length; i++){
        const li = document.createElement('li');
        const taskButton = taskButtons();
        li.textContent = list[i].taskName;
        ul.appendChild(li);
        li.appendChild(taskButton);
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
    
    return taskButtonsContainer;
}