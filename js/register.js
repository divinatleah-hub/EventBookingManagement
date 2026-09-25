const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

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


    const strongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


    if (!strongPassword.test(password)) {
        message.textContent =
            "Password must contain 8 characters, uppercase, lowercase, number and special character.";
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
        name: fullName,
        email: email,
        phone: phone,
        password: password,
        role: "CUSTOMER"
    };


    message.textContent =
        "Creating account...";


    try {

        const response = await fetch(
            "http://localhost:8080/api/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );


        const result =
            await response.text();


        if (response.ok) {

            message.textContent =
                "Account created successfully!";

            setTimeout(function () {
                window.location.href =
                    "login.html";
            }, 1000);

            return;
        }


        if (
            result.includes("Duplicate entry") ||
            result.includes("already exists")
        ) {

            message.textContent =
                "Email already exists. Please use another email.";

            return;
        }


        if (
            result.includes("Password must contain")
        ) {

            message.textContent =
                "Password must contain 8 characters, uppercase, lowercase, number and special character.";

            return;
        }


        message.textContent =
            "Registration failed. Please try again.";

        console.error(
            "Registration error:",
            result
        );


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        message.textContent =
            "Cannot connect to server. Please start the backend.";
    }

});