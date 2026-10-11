const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {
        message.textContent = "Please enter your email and password.";
        return;
    }

    message.textContent = "Checking login...";

    try {
        const response = await fetch(
            "http://localhost:8080/api/otp/send",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const result = await response.text();

        if (!response.ok) {
            message.textContent = "Login failed. Please try again.";
            return;
        }

        if (result === "Invalid email or password") {
            message.textContent = "Invalid email or password.";
            return;
        }

        if (result === "OTP sent successfully") {

            localStorage.setItem(
                "otpEmail",
                email
            );

            message.textContent =
                "OTP sent to your email.";

            setTimeout(function () {
                window.location.href =
                    "otp-verification.html";
            }, 1000);

            return;
        }

        message.textContent = result;

    } catch (error) {

        console.error("Login error:", error);

        message.textContent =
            "Cannot connect to server. Please start the backend.";
    }
});