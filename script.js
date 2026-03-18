let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* SAVE TASKS */
function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ADD TASK */
function addTask(){

let name = document.getElementById("taskInput").value;
let date = document.getElementById("dueDate").value;
let time = document.getElementById("reminderTime").value;

if(name===""){
alert("Please enter task");
return;
}

let task = {
name:name,
date:date,
time:time,
completed:false
};

tasks.push(task);

saveTasks();
renderTasks();

document.getElementById("taskInput").value="";
}

/* DISPLAY TASKS */
function renderTasks(){

let pending = document.getElementById("pendingList");
let completed = document.getElementById("completedList");

pending.innerHTML="";
completed.innerHTML="";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

let check = document.createElement("input");
check.type="checkbox";
check.checked = task.completed;

check.onchange=function(){
task.completed = check.checked;
saveTasks();
renderTasks();
};

let text = document.createElement("span");
text.innerHTML = task.name + " (Due: "+task.date+")";

let del = document.createElement("button");
del.innerText="Delete";

del.onclick=function(){
tasks.splice(index,1);
saveTasks();
renderTasks();
};

li.appendChild(check);
li.appendChild(text);
li.appendChild(del);

if(task.completed){
completed.appendChild(li);
}else{
pending.appendChild(li);
}

});

}

/* SETTINGS PANEL */
function toggleSettings(){

let panel = document.getElementById("settingsPanel");

panel.style.display = panel.style.display==="block" ? "none":"block";

}

/* THEME CHANGE */
function changeTheme(theme){

document.body.className = theme;

localStorage.setItem("theme", theme);

}

/* BACKGROUND FROM URL */
function setBgFromUrl(){

let url = document.getElementById("bgUrl").value;

document.body.style.backgroundImage = "url('"+url+"')";

localStorage.setItem("bgImage", url);

}

/* BACKGROUND FROM FILE */
document.getElementById("bgUpload").addEventListener("change",function(){

let file = this.files[0];

let reader = new FileReader();

reader.onload=function(){

document.body.style.backgroundImage="url('"+reader.result+"')";

localStorage.setItem("bgImage", reader.result);

};

reader.readAsDataURL(file);

});

/* LOAD SAVED SETTINGS */
window.onload=function(){

let savedTheme = localStorage.getItem("theme");
let savedBg = localStorage.getItem("bgImage");

if(savedTheme){
document.body.className = savedTheme;
}

if(savedBg){
document.body.style.backgroundImage = "url('"+savedBg+"')";
}

renderTasks();

};