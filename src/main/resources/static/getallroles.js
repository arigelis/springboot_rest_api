function getAllRoles() {
    fetch('/api/v.1.0/roles')
        .then((response) => response.json())
        .then((roles) => {
            let output = '';

                output += `
                   <option selected="selected">${roles[0].name}</option>
                   <option>${roles[1].name}</option>`;
            document.querySelector("#exampleFormControlSelectEdit").innerHTML = output;

        })
}

getAllRoles()