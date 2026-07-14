const API_URL = "http://localhost:8080/employees";
let editing = false;

// Load employees when page opens
window.onload = function () {
    loadEmployees();
};

// Load all employees
function loadEmployees() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            let table = document.getElementById("employeeTable");

            table.innerHTML = "";

            data.forEach(employee => {

                table.innerHTML += `
                    <tr>

                        <td>${employee.id}</td>

                        <td>${employee.name}</td>

                        <td>${employee.department}</td>

                        <td>${employee.salary}</td>

                        <td>

                            <button
                                class="btn btn-warning btn-sm"
                                onclick="editEmployee(${employee.id})">
                                Edit
                            </button>

                            <button
                                class="btn btn-danger btn-sm"
                                onclick="deleteEmployee(${employee.id})">
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            });

        });

}

function saveEmployee() {

    const employee = {

        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value

    };

    const id = document.getElementById("employeeId").value;

    if(editing){

        fetch(API_URL + "/" + id,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(employee)

        })
        .then(response=>response.json())
        .then(data=>{

            alert("Employee Updated Successfully!");

            clearForm();

            loadEmployees();

        });

    }else{

        fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(employee)

        })
        .then(response=>response.json())
        .then(data=>{

            alert("Employee Added Successfully!");

            clearForm();

            loadEmployees();

        });

    }

}

// Delete Employee
function deleteEmployee(id) {

    if(confirm("Delete this employee?")){

        fetch(API_URL + "/" + id, {

            method: "DELETE"

        })

        .then(() => {

            clearForm();
            loadEmployees();

        });

    }

}

function editEmployee(id){

    fetch(API_URL + "/" + id)

    .then(response=>response.json())

    .then(employee=>{

        document.getElementById("employeeId").value = employee.id;

        document.getElementById("name").value = employee.name;

        document.getElementById("department").value = employee.department;

        document.getElementById("salary").value = employee.salary;

        editing = true;

        document.getElementById("saveButton").innerHTML = "Update Employee";

    });

}
function clearForm(){

    document.getElementById("employeeId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("department").value = "";

    document.getElementById("salary").value = "";

    editing = false;

    document.getElementById("saveButton").innerHTML = "Add Employee";

}