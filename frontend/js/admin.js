const adminLoginForm =
    document.getElementById("adminLoginForm");

const adminLoginMessage =
    document.getElementById("adminLoginMessage");


/* =========================
   ADMIN LOGIN
========================= */

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document.getElementById("adminEmail")
                .value
                .trim();

            const password =
                document.getElementById("adminPassword")
                .value;

            const correctEmail =
                "admin@eventbook.com";

            const correctPassword =
                "admin123";


            if (
                email === correctEmail &&
                password === correctPassword
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "adminEmail",
                    email
                );

                adminLoginMessage.textContent =
                    "Login successful!";

                adminLoginMessage.style.color =
                    "#16a34a";


                setTimeout(function() {

                    window.location.href =
                        "dashboard.html";

                }, 800);


            } else {

                adminLoginMessage.textContent =
                    "Invalid admin email or password.";

                adminLoginMessage.style.color =
                    "#dc2626";
            }

        }
    );
}


/* =========================
   DASHBOARD ACCESS
========================= */

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    const adminLoggedIn =
        localStorage.getItem("adminLoggedIn");


    if (adminLoggedIn !== "true") {

        window.location.href =
            "admin-login.html";

    }


    /* =========================
       LOGOUT
    ========================= */

    logoutButton.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "adminLoggedIn"
            );

            localStorage.removeItem(
                "adminEmail"
            );

            window.location.href =
                "admin-login.html";

        }
    );

}