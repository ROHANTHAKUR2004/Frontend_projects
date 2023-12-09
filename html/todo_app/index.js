console.log("hey TODO")

let todos = [];
let tododatalist = document.getElementById("todo-data-list");
let savebutton = document.getElementById("save-todo");
let inputbar = document.getElementById("todo-inputbar");
let pendingtodos = document.getElementById("get-todo");


pendingtodos.addEventListener("click" , ()=> {
    todos = todos.filter((todo) => todo.status != "Finished");
    rerender();
})

inputbar.addEventListener("keyup", function toggle(){
    let todotext = inputbar.value;
    if(todotext.length == 0){
        if(savebutton.classList.contains("disabled"))return;
        savebutton.classList.add("disabled");
    }
    else if(savebutton.classList.contains("disabled")){
        savebutton.classList.remove("disabled");
    }
});





savebutton.addEventListener("click", function gettext(){
    let todotext = inputbar.value;
    if(todotext.length == 0) return;
    let todo = {text : todotext, status: 'in progress' , finishbtntext: 'Finished'};
    todos.push(todo) ;
    addtodo(todo , todos.length);
    inputbar.value = "";
});

function rerender(){
    tododatalist.innerHTML = '';
    todos.forEach((element, idx) => {
    addtodo(element, idx+1);
    });
}

function removetodo(event){
//    console.log("deleting todo");
     let deletebtnpressed = event.target;
     let idxtoberemoved = Number(deletebtnpressed.getAttribute("todo-idx"));
     todos.splice(idxtoberemoved, 1);
    rerender();
}

function finishtodo(event){
    let finishbtnpressed = event.target;
    let idxtobeupdate = Number(finishbtnpressed.getAttribute("todo-idx"));
    if(todos[idxtobeupdate].status == "Finished"){
        todos[idxtobeupdate].status = "in progress";
        todos[idxtobeupdate].finishbtntext = "Finished";
    }
    else{ 
    todos[idxtobeupdate].status = "Finished";
    todos[idxtobeupdate].finishbtntext = "Undo";
    }

    todos.sort((a,b) =>{
       if(a.status == "Finished") return 1 ;
       return -1;
    });
    rerender();
}

function edittodo(event){
    let editbtnpressed = event.target;
    let idxtobeedited = Number(editbtnpressed.getAttribute("todo-idx"));
    let detaildiv = document.querySelector(`div[todo-idx="${idxtobeedited}"]`);
    let input = document.querySelector(`input[todo-idx="${idxtobeedited}"]`);
    detaildiv.style.display=`none`; 
    input.type = `text`;
    input.value = detaildiv.textContent;
}

function saveeditedtodo(event){
    let input = event.target;
    let idxtobeedited = Number(input.getAttribute("todo-idx"));
    let detaildiv = document.querySelector(`div[todo-idx="${idxtobeedited}"]`);
   
    if(event.keyCode == 13){
        detaildiv.textContent = input.value;
        detaildiv.style.display ="block";
        input.value = '';
        input.type = "hidden";
    }
}


function addtodo(todo , tonum) {

    let todorow = document.createElement("div");
    let todoitem = document.createElement("div");
    let todono = document.createElement("div");
    let tododetails = document.createElement("div");
    let todostatus = document.createElement("div");
    let todoaction = document.createElement("div");
    let deletebtn = document.createElement("button");
    let finishbtn = document.createElement("button");
    let editbtn = document.createElement("button");
    let hiddeninput = document.createElement("input");
    let hr = document.createElement("hr");


    // adding classes
    todorow.classList.add("row");
    todoitem.classList.add("todo-item","d-flex","flex-row","justify-content-between","align-items-center",);
    todono.classList.add("todo-no");
    tododetails.classList.add("todo-details");
    todostatus.classList.add("todo-status","d-flex","justify-content-start");
    todoaction.classList.add("todo-ation","d-flex","justify-content-start","gap-2");
    deletebtn.classList.add("btn","btn-danger","delete-todo");
    finishbtn.classList.add("btn","btn-success","finish-todo");
    editbtn.classList.add("btn","btn-warning");
    hiddeninput.classList.add("form-control", "todo-details");
// 

// adding attritubute

deletebtn.setAttribute("todo-idx", tonum-1);
finishbtn.setAttribute("todo-idx", tonum-1);
editbtn.setAttribute("todo-idx", tonum-1);
tododetails.setAttribute("todo-idx", tonum-1);
hiddeninput.setAttribute("todo-idx", tonum-1);
hiddeninput.type = "hidden";
hiddeninput.addEventListener("keypress", saveeditedtodo);

// 

// adding click listerners


deletebtn.onclick = removetodo;
finishbtn.onclick = finishtodo;
editbtn.onclick = edittodo;

// 

    todono.textContent = `${tonum}`;
    tododetails.textContent = todo.text; // setting input given by user 
    todostatus.textContent =  todo.status;
    deletebtn.textContent = "Delete";
    finishbtn.textContent = todo.finishbtntext;
    editbtn.textContent = "Edit";

    todoaction.appendChild(deletebtn);
    todoaction.appendChild(finishbtn);
    todoaction.appendChild(editbtn);

    todoitem.appendChild(todono);
    todoitem.appendChild(hiddeninput);
    todoitem.appendChild(tododetails);
    todoitem.appendChild(todostatus);
    todoitem.appendChild(todoaction);

    todorow.appendChild(todoitem);
    todorow.appendChild(hr);


    tododatalist.appendChild(todorow);


}