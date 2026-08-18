const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("loginMessage");


    if (email === "" || password === "") {

        message.textContent =
            "Please enter your email and password.";

        return;
    }


    const savedUser =
        localStorage.getItem("registeredUser");


    if (!savedUser) {

        message.textContent =
            "No account found. Please create an account first.";

        return;
    }


    const user =
        JSON.parse(savedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        message.textContent =
            "Login successful!";


        setTimeout(function () {

            window.location.href = "events.html";

        }, 1000);

    } else {

        message.textContent =
            "Invalid email or password.";

    }

});