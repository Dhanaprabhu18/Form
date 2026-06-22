// let attempts = 0;

// window.onload = function () {
//     document.getElementById("userid").value = "";
//     document.getElementById("password").value = "";
// };

// async function login() {
//     const useridBox = document.getElementById("userid");
//     const passwordBox = document.getElementById("password");
//     const message = document.getElementById("message");

//     const userid = useridBox.value.trim();
//     const password = passwordBox.value.trim();

//     if (userid === "" || password === "") {
//         message.innerHTML = "Enter User ID and Password";
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:3000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 userid: userid,
//                 password: password
//             })
//         });

//         const data = await response.json();

//         if (data.success) {
//             attempts = 0;

//             alert("Login Success");

//             useridBox.value = "";
//             passwordBox.value = "";
//             message.innerHTML = "";

//             window.location.href = "petrol.html";

//         } else {
//             attempts++;

//             // 1st, 2nd, 3rd wrong
//             if (attempts <= 3) {
//                 alert("Wrong Password - Attempt " + attempts + " / 3");
//             }

//             // 4th wrong -> show closed page
//             if (attempts === 4) {
//                 document.body.innerHTML =
//                     "<h2 style='text-align:center;margin-top:100px;'>Application Closed</h2>";
//                 return;
//             }

//             useridBox.value = "";
//             passwordBox.value = "";
//         }

//     } catch (error) {
//         message.innerHTML = "Server Connection Error";
//     }
// }

// function clearForm() {
//     document.getElementById("userid").value = "";
//     document.getElementById("password").value = "";
//     document.getElementById("message").innerHTML = "";
// }





let attempts = 0;

window.onload = function () {
    document.getElementById("userid").value = "";
    document.getElementById("password").value = "";
};

async function login() {

    const useridBox = document.getElementById("userid");
    const passwordBox = document.getElementById("password");
    const message = document.getElementById("message");

    const userid = useridBox.value.trim();
    const password = passwordBox.value.trim();

    if (userid === "" || password === "") {
        message.innerHTML = "Enter User ID and Password";
        message.style.color = "black";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userid,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {

            attempts = 0;

            alert("Login Success");

            useridBox.value = "";
            passwordBox.value = "";
            message.innerHTML = "";

            window.location.href = "petrol.html";

        } else {

            attempts++;

            useridBox.value = "";
            passwordBox.value = "";

            if (attempts < 4) {
                message.innerHTML = `Attempt ${attempts}/3`;
                message.style.color = "black";
            }

            // 4th attempt → CLOSE APPLICATION
            else if (attempts >= 4) {
                document.body.innerHTML =
                    "<h2 style='text-align:center;margin-top:100px;color:red;'>APPLICATION CLOSED </h2>";
            }
        }

    } catch (error) {
        message.innerHTML = "Server Connection Error";
        message.style.color = "black";
    }
}

function clearForm() {
    document.getElementById("userid").value = "";
    document.getElementById("password").value = "";
    document.getElementById("message").innerHTML = "";
}