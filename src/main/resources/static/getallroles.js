function getAllRoles() {
    fetch('/root/roles')
        .then((response) => response.json())
        .then((roles) => {
            let output = '';
                output += `
                   <option selected="selected">${roles[0].role}</option>
                   <option>${roles[1].role}</option>`;
            document.querySelector("#exampleFormControlSelectEdit").innerHTML = output;
        })
}

getAllRoles()