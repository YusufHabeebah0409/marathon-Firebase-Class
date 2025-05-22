// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { firebaseConfig } from "./config.js";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();



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
                toast("User created successfully", "green", "white");
                setTimeout(() => {
                    window.location.href = "signIn.html";
                }, 2000);
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

const signUpGit = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            const user = result.user;
            window.location.href = "dashboard.html";

            console.log(user);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            console.log(errorCode);

            if (errorCode === "auth/account-exists-with-different-credential") {
                toast("Another sign up provider has been used for this mail", "orange", "white");
            }
            if (errorCode === "auth/popup-closed-by-user") {
                toast("The sign-in popup was closed before completing the sign in.", "red", "white");
            }
            if (errorCode === "auth/cancelled-popup-request") {
                toast("Popup sign in was canceled because another popup was opened.", "gray", "white");
            }
            if (errorCode === "auth/popup-blocked") {
                toast("The browser blocked the sign-in popup. Please allow popups and try again.", "black", "white");
            }
            if (errorCode === "auth/operation-not-allowed") {
                toast("GitHub sign-in is not enabled in your Firebase project.", "purple", "white");
            }
            if (errorCode === "auth/unauthorized-domain") {
                toast("This domain is not authorized for OAuth operations.", "#b00020", "white"); // strong red for serious errors
            }
            if (errorCode === "auth/network-request-failed") {
                toast("Network error. Please check your connection and try again.", "#ff5722", "white"); // deep orange
            }
            if (errorCode === "auth/invalid-credential") {
                toast("The credential received is malformed or has expired.", "#ff9800", "white"); // orange
            }
        });
}

const signUpGoogle = () => {
    // alert("Hiiiiiiiiiiiiiiii")
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.href = "dashboard.html";

        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === "auth/account-exists-with-different-credential") {
                toast("Another sign up provider has been used for this email.", "orange", "white");
            }
            if (errorCode === "auth/popup-closed-by-user") {
                toast("The sign-in popup was closed before completing the sign in.", "red", "white");
            }
            if (errorCode === "auth/cancelled-popup-request") {
                toast("Popup sign in was canceled because another popup was opened.", "gray", "white");
            }
            if (errorCode === "auth/popup-blocked") {
                toast("The browser blocked the sign-in popup. Please allow popups and try again.", "black", "white");
            }
            if (errorCode === "auth/unauthorized-domain") {
                toast("This domain is not authorized for OAuth operations.", "#b00020", "white");
            }
            if (errorCode === "auth/network-request-failed") {
                toast("Network error. Please check your connection and try again.", "#ff5722", "white");
            }
            if (errorCode === "auth/invalid-credential") {
                toast("The credential received is malformed or has expired.", "#ff9800", "white");
            }
            if (errorCode === "auth/user-disabled") {
                toast("This user account has been disabled.", "gray", "white");
            }
            if (errorCode === "auth/too-many-requests") {
                toast("Too many requests. Please try again later.", "orange", "white");
            }
            if (errorCode === "auth/invalid-user-token") {
                toast("The user's credential is no longer valid. Please sign in again.", "red", "white");
            }
            if (errorCode === "auth/internal-error") {
                toast("An internal error occurred. Please try again.", "red", "white");
            }
            // Fallback for any other error
            if (
                errorCode !== "auth/account-exists-with-different-credential" &&
                errorCode !== "auth/popup-closed-by-user" &&
                errorCode !== "auth/cancelled-popup-request" &&
                errorCode !== "auth/popup-blocked" &&
                errorCode !== "auth/unauthorized-domain" &&
                errorCode !== "auth/network-request-failed" &&
                errorCode !== "auth/invalid-credential" &&
                errorCode !== "auth/user-disabled" &&
                errorCode !== "auth/too-many-requests" &&
                errorCode !== "auth/invalid-user-token" &&
                errorCode !== "auth/internal-error"
            ) {
                toast("An error occurred: " + error.message, "red", "white");
            }
        });
}

window.btnSignUp = btnSignUp;
window.signUpGit = signUpGit;
window.signUpGoogle = signUpGoogle;