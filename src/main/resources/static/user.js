async function printPrincipal() {
    let response = await fetch('/root/user');
    let principal = await response.json();

    let navbar = document.querySelector("#navbar");
    let roles = '';
    for (let key in principal.roles) {
        roles += `${principal.roles[key].role} `
    }
    navbar.innerHTML += `
    <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="/user"><strong>${principal.name}</strong></a>
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <span class="navbar-text" style="color: white">
            with roles: ${roles}
            </span>
        </li>
    </ul>
    <span class="navbar-text"><a href="/logout" style="color: #808080; text-decoration: none">Logout</a></span>
    </nav>
    `
}

async function printPrincipalInfo() {
    let response = await fetch('/root/user');
    let principal = await response.json();

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
}

printPrincipal();
printPrincipalInfo();