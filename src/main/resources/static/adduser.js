async function printFormAddUser() {
    let response = await fetch('/root/roles');
    let roles = await response.json();


    let add_user = document.querySelector("#new-user")
    add_user.innerHTML += `
    <form name="addForm" id="addForm">
        <div class="form-group">
            <label><strong>First name</strong></label>
            <input type="text" class="form-control" placeholder="Name" name="name">
        </div>
        <div class="form-group">
            <label><strong>Password</strong></label>
            <input type="password" class="form-control" placeholder="Password" name="password">
        </div>
        <div class="form-group">
            <label for="exampleFormControlSelect"><strong>Role</strong></label>
            <select multiple class="form-control" id="exampleFormControlSelect" size="2"
                id="rols" name="userRoles">
                <option selected="selected">${roles[0].role}</option>
                <option>${roles[1].role}</option>
            </select>
        </div>
        <button type="submit" class="btn btn-success" id="buttonAdd">New user</button>
    </form>`





function getAllOptions(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i=0, iLen = options.length; i < iLen; i++) {
        opt = options[i];
        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}
function translate(array) {
    let result = [];
    if (array.indexOf("user") >= 0 ) {
        result.push({"id": 1, "role": "user"});
    }
    if (array.indexOf("admin") >= 0 ) {
        result.push({"id": 2, "role" : "admin"});
    }
    return result;
}

function addNewUser(e) {
    e.preventDefault();
    let user = {
        firstName: document.addForm.firstName.value,
        lastName: document.addForm.lastName.value,
        age: document.addForm.age.value,
        username: document.addForm.username.value,
        password: document.addForm.password.value,
        roles: translate(getAllOptions(document.addForm.userRoles))
    }

    fetch('http://localhost:8182/root/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(function(response) {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.statusText + ')'
            ));
        }
        return response.json();
    }).finally(() => {
        getAllUsers();
        document.querySelector("#addForm").reset();
    });

}

document.querySelector("#buttonAdd").onclick = addNewUser;
}

printFormAddUser();





