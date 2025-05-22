import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { firebaseConfig } from "./config.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";



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

const logIn = () => {
  const email = document.getElementById("userEmailSignUp").value.trim();
  const password = document.getElementById("userPasswordSignUp").value.trim();
  if (email === "" || password === "") {
    toast("Please fill in all fields", "Red", "white");
  } else {
    let userObj = { nameUser, email, password };
    console.log(userObj);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        toast("User logged in successfully", "green", "white");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/wrong-password") {
          toast("Wrong password", "Red", "white");
        }
        if (errorCode === "auth/user-not-found") {
          toast("User not found", "orange", "white");
        }
        if (errorCode === "auth/invalid-email") {
          toast("Invalid email", "orange", "white");
        }
        
      });

  }
}
window.logIn = logIn;