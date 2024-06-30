let list = [];
const popWindow = document.getElementById('addWindow');
const taskName = document.getElementById('nameInput');
const taskDes = document.getElementById('desInput');
const ul = document.getElementById('taskList');
//opening the task window
function openPop(){
    popWindow.style.display = 'block';
}

//closing the task window
function closePop(){
    popWindow.style.display = 'none';
    taskName.value = "";
    taskDes.value = "";
}

//Creatign a task
function taskAdd(){
    console.log('called');
    list.unshift(new task(taskName, taskDes));
    closePop();
}
function task(taskName, description){
    this.description=description;
    this.taskName=taskName;
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
    list.forEach(item =>{
        const li = document.createElement('li');
        li.textContent = '{item.taskName}';
        ul.appendChild('li');
        console.log('owejf');
    });
}

