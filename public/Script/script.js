// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import{firebaseConfig } from "./config.js";
  
 

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const btnSignUp = () => {
    alert("Hiiiiiiii")
  }

  window.btnSignUp = btnSignUp;