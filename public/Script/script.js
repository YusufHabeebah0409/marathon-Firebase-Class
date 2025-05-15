// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { firebaseConfig } from "./config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const toast = (text, background, color) => {
    Toastify({
        text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background,
            color,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

const btnSignUp = () => {
    const nameUser = document.getElementById("userNameSignUp").value.trim();
    const email = document.getElementById("userEmailSignUp").value.trim();
    const password = document.getElementById("userPasswordSignUp").value.trim();
    if (nameUser === "" || email === "" || password === "") {
        toast("Please fill in all fields", "Red", "white");
    } else {
        let userObj = { nameUser, email, password };
        console.log(userObj);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode === "auth/password-does-not-meet-requirements") {
                    toast("Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.", "Red", "white");
                }
                if (errorCode === "auth/email-already-in-use") {
                    toast("Email is already in use.", "orange", "white");
                }
                if (errorCode === "auth/invalid-email") {
                    toast("Invalid email address.", "red", "white");
                }
                if (errorCode === "auth/operation-not-allowed") {
                    toast("Sign up is currently disabled.", "gray", "white");
                }
                if (errorCode === "auth/network-request-failed") {
                    toast("Network error. Please try again.", "purple", "white");
                }
                if (errorCode === "auth/user-disabled") {
                    toast("This user account has been disabled.", "gray", "white");
                }
                if (
                    errorCode !== "auth/password-does-not-meet-requirements" &&
                    errorCode !== "auth/email-already-in-use" &&
                    errorCode !== "auth/invalid-email" &&
                    errorCode !== "auth/operation-not-allowed" &&
                    errorCode !== "auth/network-request-failed" &&
                    errorCode !== "auth/user-disabled"
                ) {
                    toast("An error occurred: " + error.message, "red", "white");
                }

            });

    }
}
window.btnSignUp = btnSignUp;