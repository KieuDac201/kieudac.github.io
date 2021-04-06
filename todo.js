let todoArray = [];

const mainContainer = document.querySelector(".inputContainer");
const inputBar = document.querySelector("#inputBar");
const todoContent = document.querySelector("#todoContent");
const addToDo = document.querySelector("#addButton");
const deleteBtn = document.querySelector(".deleteButton");

let tableParent, tableRaw, noteCounter, toDoHeadContainer, toDoContentContainer, deleteButton;

// Creating table parent when window loaded
window.onload =  function(){
    tableParent = document.createElement("ul");
    tableParent.classList.add("tableContainer");
    mainContainer.appendChild(tableParent);
    tableParent.style.display = 'none';
};

function reset () {
    inputBar.value = "";
    todoContent.value = "";
}

// Creaing Table Data
function createTableData () {
    tableRaw = document.createElement("li");
    noteCounter = document.createElement("span");
    toDoHeadContainer = document.createElement("span");
    toDoContentContainer = document.createElement("span");
    deleteButton = document.createElement("span");

    // Adding Cleass to the nodes
    tableRaw.classList.add("tableRaw");
    noteCounter.classList.add("toDoNumber");
    toDoHeadContainer.classList.add("toDoHeading");
    toDoContentContainer.classList.add("toDoContentContainer");

    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
}

function printArray () {
    tableParent.innerHTML = "";
    
    function removeElement(i) {
        todoArray = todoArray.filter( ( _, z ) => z != i );
        printArray();
    }
    
    todoArray.map((value, i) => {
    
        createTableData ();                
    
        noteCounter.textContent = i + 1;
        toDoHeadContainer.innerText = value.heading;
        toDoContentContainer.innerText = value.content;                
        tableRaw.appendChild(noteCounter);
        tableRaw.appendChild(toDoHeadContainer);
        tableRaw.appendChild(toDoContentContainer);
        tableRaw.appendChild(deleteButton);                
        
        deleteButton.addEventListener("click", () => removeElement(i));

        tableParent.appendChild(tableRaw);
    });
}
// Creating ToDo Table/Content based on inputs
addToDo.addEventListener("click", function () {
    if (inputBar.value !== "" && todoContent.value !== "") {
        let tempObj = {};                
        tempObj.heading = inputBar.value;
        tempObj.content = todoContent.value;
        
        todoArray = [...todoArray, tempObj ];
        printArray();
        tableParent.style.display = "block";

    } else { 
        alert("Please, Enter your toDo Heading and Content"); 
    }

    reset();
});
