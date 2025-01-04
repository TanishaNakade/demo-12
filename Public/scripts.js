document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Check if username and password are provided
            if (username && password) {
                // Send the login details to the server
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.login === 'success') {
                        // Hide the login section and show the main section
                        document.getElementById('loginContainer').style.display = 'none';
                        document.getElementById('mainContainer').style.display = 'block';
                    } else {
                        // Show an error message
                        document.getElementById('loginError').style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while trying to log in.');
                });
            } else {
                alert('Please enter both username and password.');
            }
        });
    }

    const projectImage = document.getElementById('projectImage');
    let currentZoom = 1; // Initial zoom level
    let timer; // To store the timer interval
    let countdownTime; // To store the countdown time

    // Function to start the countdown timer
    function startTimer() {
        const now = new Date().getTime(); // Current time
        countdownTime = now + 7 * 24 * 60 * 60 * 1000; // Set the timer for 7 days ahead

        // Update the countdown every second
        timer = setInterval(function() {
            const currentTime = new Date().getTime();
            const timeLeft = countdownTime - currentTime;

            if (timeLeft <= 0) {
                clearInterval(timer); // Stop the timer when it reaches 0
                alert("Your 7-day timer has expired!");
                return;
            }

            // Calculate days, hours, minutes, seconds left
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Display the time left
            document.getElementById("timer").innerHTML = `Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    document.getElementById("zoomInBtn").addEventListener("click", function() {
        currentZoom += 0.1; // Increment zoom level
        projectImage.style.transform = `scale(${currentZoom})`;
    });

    document.getElementById("zoomOutBtn").addEventListener("click", function() {
        if (currentZoom > 0.5) { // Prevent zooming out too much
            currentZoom -= 0.1; // Decrement zoom level
            projectImage.style.transform = `scale(${currentZoom})`;
        }
    });

    document.getElementById("submitExcelBtn").addEventListener("click", function() {
        alert("Data from the Excel sheet has been submitted!");
    });

    // Navigate to Projects or Earnings section
    document.getElementById("myProjectBtn").addEventListener("click", function() {
        document.getElementById("mainContainer").style.display = "none";
        document.getElementById("iframeContainer").style.display = "block";
        startTimer(); // Start the 7-day countdown when projects are viewed
    });

    document.getElementById("backBtnIframe").addEventListener("click", function() {
        document.getElementById("iframeContainer").style.display = "none";
        document.getElementById("mainContainer").style.display = "block";
        clearInterval(timer); // Stop the countdown when navigating away
    });
});
const PORT =process_params.env.PORT ||3000;
server.listen(PORT,()=>console.log("Server is running on port 3000"));
