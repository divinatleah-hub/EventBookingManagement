const otpForm = document.getElementById("otpForm");

otpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const otp = document.getElementById("otp").value.trim();
    const message = document.getElementById("otpMessage");

    const email = localStorage.getItem("otpEmail");

    if (!email) {
        message.textContent = "Email not found. Please login again.";
        return;
    }

    if (otp === "") {
        message.textContent = "Please enter the OTP.";
        return;
    }

    if (otp.length !== 6) {
        message.textContent = "Please enter a 6-digit OTP.";
        return;
    }

    message.textContent = "Verifying OTP...";

    try {
        const response = await fetch(
            "http://localhost:8080/api/otp/verify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp
                })
            }
        );

        const result = await response.text();

        if (result === "Login successful") {

            localStorage.removeItem("otpEmail");

            message.textContent = "OTP verified successfully!";

            setTimeout(function () {
                window.location.href = "events.html";
            }, 1000);

            return;
        }

        message.textContent = result;

    } catch (error) {

        console.error("OTP verification error:", error);

        message.textContent =
            "Cannot connect to server. Please start the backend.";
    }
});