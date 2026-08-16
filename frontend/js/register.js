const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const terms =
        document.getElementById("terms").checked;

    const message =
        document.getElementById("registerMessage");


    if (fullName.length < 3) {

        message.textContent =
            "Please enter a valid full name.";

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        message.textContent =
            "Please enter a valid 10-digit phone number.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    if (!terms) {

        message.textContent =
            "Please accept the Terms & Conditions.";

        return;
    }


    const user = {

        fullName: fullName,
        email: email,
        phone: phone,
        password: password

    };


    localStorage.setItem(
        "registeredUser",
        JSON.stringify(user)
    );


    message.textContent =
        "Account created successfully!";


    setTimeout(function () {

        window.location.href = "login.html";

    }, 1000);

});