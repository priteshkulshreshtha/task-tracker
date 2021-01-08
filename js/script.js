console.log("Welcome to task tracker");

let newTaskBtn = document.getElementById("addTask");
let searchBarElm = document.getElementById("searchBar");



searchBarElm.addEventListener("input", () => {
    let tasks = Array.from(document.getElementsByClassName("task-card"));
    let searchTerm = searchBarElm.value;

    if (searchTerm == "") {
        showCompleteTasks();
        showInProgressTasks();
    }

    tasks.forEach((element) => {
        
        if(element.innerText.toLowerCase().includes(searchTerm)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }

    });
});

newTaskBtn.addEventListener("click", (obj) => {
    // reads the input fields into a object
    let newTaskObj = {
        title: capitalizeFirstLetter(document.getElementById("newTitle").value),
        desc: document.getElementById("newDesc").value,
        assign: document.getElementById("newAssign").value.toUpperCase(),
        deadline: document.getElementById("newDeadline").value
    }


    if (newTaskObj.title.length != 0) {
        let inProgressTasks = localStorage.getItem("inProgressTasks");

        if (inProgressTasks == null) {
            inProgressTasksObj = [];
        } else {
            inProgressTasksObj = JSON.parse(inProgressTasks);
        }


        inProgressTasksObj.push(newTaskObj);
        localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasksObj));

        // Setting all fields as null after button press
        document.getElementById("newTitle").value = "";
        document.getElementById("newDesc").value = "";
        document.getElementById("newAssign").value = "";
        document.getElementById("newDeadline").value = "";
    }

    showInProgressTasks();
    showCompleteTasks();
});

function showInProgressTasks() {
    let inProgressTasks = localStorage.getItem("inProgressTasks");

    (inProgressTasks == null) ? inProgressTasksObj = [] : inProgressTasksObj = JSON.parse(inProgressTasks);

    let html = "";

    let inProgressSecElm = document.getElementById("inProgress");

    if (inProgressTasks && inProgressTasksObj.length != 0) {
        inProgressTasksObj.forEach((element, index) => {
            html += `
            <div class="card m-2 mx-auto" style="width: 18rem;">
                <div class="card-body d-flex flex-column task-card">
    
                    <!-- Title of card -->
                    <h5 class="card-title">${element.title}</h5>
    
                    <!-- Name and Date -->
                    <h6 class="card-subtitle mb-2 text-muted">
                        <span slot="float: left;">${element.assign}</span><span
                            style="float: right;">${element.deadline}</span>
                    </h6>
    
                    <!-- Description -->
                    <p class="card-text">${element.desc}</p>
    
                    <!-- Buttons -->
                    <div class= "row mt-auto">
                        <button href="#" onclick="markComplete(${index})" class="btn btn-primary ">Mark Complete</button>
                        <button href="#" onclick="deleteInProgress(${index})" class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
            `
        });
        inProgressSecElm.innerHTML = html;
    }
    else {
        inProgressSecElm.innerHTML = `<div class=" m-2 mx-auto" >
        <h5 class="text-center text-muted">No tasks are currently assigned</h5>
    </div>`
    }
}

function showCompleteTasks() {
    let completedTasks = localStorage.getItem("completeTasks");
    let completeTasksObj = JSON.parse(completedTasks);
    let completeTasksElm = document.getElementById("completeTasks");

    let html = "";

    if (completedTasks && completeTasksObj.length != 0) {
        completeTasksObj.forEach((element, index) => {
            html += `
            <div class="card my-2 compCard mx-auto">
                <div class="card-body task-card">    
                    <!-- Title-->
                    <h5 class="card-title">${element.title}</h5>

                    <!-- Details -->
                    <h6><span slot="float: left;">${element.assign}</span><span style="float: right;">${element.deadline}</span>
                    </h6>

                    <!-- Button -->
                    <a href="#" onclick="deleteComplete(${index})" class="btn btn-primary">Delete</a>
                </div>
            </div>
            `;
            completeTasksElm.innerHTML = html;
        })
    }
    else {
        inProgressTasks = localStorage.getItem("inProgressTasks");
        inProgressTasksObj = JSON.parse(inProgressTasks);

        if (inProgressTasks && inProgressTasksObj.length != 0) {
            html = `
            <div class=" m-2 mx-auto" >
                <h5 class="text-center text-muted">No tasks are Completed</h5>
            </div>
            `;
        }
        else {
            html = `
            <div class=" m-2 mx-auto" >
                <h5 class="text-center text-muted">Please Add New Tasks</h5>
            </div>
            `;
        }
        completeTasksElm.innerHTML = html;
    }

}

function deleteComplete(index) {
    completeTasksObj = JSON.parse(localStorage.getItem("completeTasks"));
    completeTasksObj.splice(index, 1);

    console.log(completeTasksObj)
    localStorage.setItem("completeTasks", JSON.stringify(completeTasksObj));

    showCompleteTasks();
}

function deleteInProgress(index) {
    inProgressTasksObj = JSON.parse(localStorage.getItem("inProgressTasks"));
    inProgressTasksObj.splice(index, 1);

    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasksObj))

    showInProgressTasks();
    showCompleteTasks();
}

function markComplete(index) {
    inProgressTasks = localStorage.getItem("inProgressTasks");
    inProgressTasksObj = JSON.parse(inProgressTasks)
    completedTask = inProgressTasksObj[index];
    inProgressTasksObj.splice(index, 1);
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasksObj));
    showInProgressTasks();

    if (completeTasks = localStorage.getItem("completeTasks")) {
        completeTasksObj = JSON.parse(completeTasks);
    }
    else {
        completeTasksObj = [];
    }

    completeTasksObj.push(completedTask);
    localStorage.setItem("completeTasks", JSON.stringify(completeTasksObj));
    showCompleteTasks();
}



// Text formatting functions :-

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
