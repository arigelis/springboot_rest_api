function printPrincipal() {
    fetch('/root/user')
        .then(response => response.json())
        .then(principal => {
            let navbar = document.querySelector("#navbar");
            let roles = '';
            for (let key in principal.roles) {
                roles += `${principal.roles[key].role} `
            }
            navbar.innerHTML += `
                <nav class="navbar navbar-dark bg-dark">
                <strong><a class="navbar-brand" href="/users" data-btn="home">${principal.name}</a></strong>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <span class="navbar-text" style="color: white">
                        with roles: ${roles}
                        </span>
                    </li>
                </ul>
                <span class="navbar-text"><a href="/logout" style="color: #808080; text-decoration: none" data-btn="logout">Logout</a></span>
                </nav>
                `
        });
}
function printPrincipalInfo() {
    fetch('/root/user')
        .then(response => response.json())
        .then(principal => {
            let principal_info = document.querySelector("#principal-info");
            let roles = '';
            for (let key in principal.roles) {
                roles += `${principal.roles[key].role} `
            }
            principal_info.innerHTML += `
        <tbody>
            <tr>
            <th scope="row">${principal.id}</th>
            <td>${principal.name}</td>
            <td>${roles}</td>
            </td>
            </tr>
        </tbody>
        `
        });
}

function translate(array) {
    let result = [];
    if (array.indexOf("user") >= 0 ) {
        result.push({"id": 1, "name": "user"});
    }
    if (array.indexOf("admin") >= 0 ) {
        result.push({"id": 2, "name" : "admin"});
    }
    return result;
}
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
function getAllUsers() {
    fetch('/root/roles')
        .then(response => response.json())
        .then(allRoles => {
            fetch('/root/users')
                .then(response => response.json())
                .then(printUsers => {
                    let output = '';
                    printUsers.forEach(function (user) {
                        let roles = '';
                        for (let key in user.roles) {
                            roles += `${user.roles[key].role} `
                        }
                        output += `
                <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${roles}</td>                           
                <td>
                    <form id="editForm">
                        <button type="button" class="btn btn-info" data-toggle="modal" 
                                data-target="#staticBackdropEdit" 
                                data-btn="edit" data-id="${user.id}">EDIT</button>
                    </form>
                </td>
                <td>
                    <form>
                        <button type="button" class="btn btn-danger" data-toggle="modal" 
                                data-target="#staticBackdropDelete" 
                                data-btn="delete" data-id="${user.id}">DELETE</button>
                    </form>  
                </td>
                </tr>`;
                    });

                    document.querySelector('#all-users').innerHTML = output;

                })
        })

}

document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;

    if (btnType === 'edit') {
        const id = event.target.dataset.id;
        const url = '/root/users/'+ id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector("#disabledTextInput").value = data.id;
                document.querySelector("#editName").value = data.name;
                document.querySelector("#editPassword").value = ""});
    }
    if (btnType === 'submitEdit') {
        let url = 'http://localhost:8080/root/users';
        let user = {
            id: document.querySelector("#disabledTextInput").value,
            name: document.querySelector("#editName").value,
            password: document.querySelector("#editPassword").value,
            roles: translate(getAllOptions(document.querySelector("#exampleFormControlSelectEdit")))
        }
        console.log(user);
        fetch(url, {
            method: 'PUT',
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
            $('.modal').modal('hide');
        });
    }
    if (btnType === 'delete') {
        const id = event.target.dataset.id;
        const url = '/root/users/'+ id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector("#disabledTextInputDelete").value = data.id;
                document.querySelector("#deleteFirstName").value = data.name;
                let block = '';
                if (data.roles.length > 1) {
                    block += `
                    <option>${data.roles[0].role}</option>
                    <option>${data.roles[1].role}</option>`
                    document.querySelector("#exampleFormControlSelectDelete").innerHTML = block;
                } else {
                    block += `<option>${data.roles[0].role}</option>`
                }
                document.querySelector("#exampleFormControlSelectDelete").innerHTML = block;
                });
    }
    if (btnType === 'submitDelete') {
        let id = document.querySelector("#disabledTextInputDelete").value;
        let url = 'http://localhost:8080/root/users/'+id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(function(response) {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }
            return response.json();
        }).finally(() => {
            getAllUsers();
            $('.modal').modal('hide');
        });

    }
    if (btnType === 'logout') {
        document.location.href = "/logout"
    }
    if (btnType === 'home') {
        document.location.href = "/users"
    }
})

getAllUsers();


printPrincipal();
printPrincipalInfo();

