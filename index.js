let fname = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");

let userEntries = JSON.parse(localStorage.getItem("userEntries"));

fname.addEventListener("input", () => validateName(fname));

email.addEventListener("input", () => validateEmail(email));

password.addEventListener("input", () => validatePassword(password));

function validateName(element) {
    if (element.value.length < 2) {
        element.setCustomValidity("Name must be of atleast 2 characters");
        element.reportValidity();
        return false;
    }
    else if (element.value.length > 100) {
        element.setCustomValidity("Name must be of atmost 100 characters");
        element.reportValidity();
        return false;
    }
    else {
        element.setCustomValidity("");
        return true;
    }
}

function validateEmail(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity("Entered email is invalid!");
        element.reportValidity();
        return false;
    }
    else {
        element.setCustomValidity("");
        return true;
    }
}

function validatePassword(element) {
    if (element.value.length < 6) {
        element.setCustomValidity("Password length should be atleast of 6 characters");
        element.reportValidity();
        return false;
    }
    else {
        element.setCustomValidity("");
        return true;
    }
}

function handleFormSubmit(event) {
    // form submit logic
    event.preventDefault();

    if (validateName(fname) && validateEmail(email) && validatePassword(password)) {
        let formData = new FormData(event.target);
        let name = formData.get("name");
        let email = formData.get("email");
        let password = formData.get("password");
        let dob = formData.get("dob");
        let terms = formData.get("terms");

        const user = {
            name,
            email,
            password,
            dob,
            terms,
        };

        userEntries.push(user);

        localStorage.setItem("userEntries", JSON.stringify(userEntries));

        populateUserEntriesTable();
    }
}

function populateUserEntriesTable() {
    let userEntries = JSON.parse(localStorage.getItem("userEntries"));
    let tableBody = document.getElementById("table-body");
    userEntries = userEntries.map((userData) => {
        const user = userData;
        console.log(user);
        console.log(user.name);
        console.log(typeof(user.name));
        const tableRow = `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
        </tr>
        `;
        return tableRow;
    });
    tableBody.innerHTML = userEntries.join("\n");
}

populateUserEntriesTable();
