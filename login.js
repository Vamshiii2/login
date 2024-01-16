const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());



async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
        
            // Redirect to the welcome page or perform any other desired actions
            window.location.href = "/welcome.html";
        } else {
            alert(data.error || "Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error && error.message);
        alert("An error occurred during login. Please try again later.");
    }
}
