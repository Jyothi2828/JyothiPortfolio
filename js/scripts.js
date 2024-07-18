document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Optional: Close the sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});


    // Initialize EmailJS with your public key (User ID)
    emailjs.init("M7YWJm7vYKbHThLzu"); // Replace with your EmailJS public key

    // Add event listener to the contact form
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name.length < 3) {
            showAlert('Name must be at least 3 characters long.');
            return;
        }
        if (email === '' || !validateEmail(email)) {
            showAlert('Please enter a valid email address.');
            return;
        }
        if (message.length < 5) {
            showAlert('Message must be at least 5 characters long.');
            return;
        } 

        // Send form data to EmailJS
        emailjs.sendForm('service_weom7pq', 'template_bbam5q5', form)
            .then(function(response) {
                // Show success alert
                showAlert("Connection sent successfully");
                // Reset the form after successful submission
                form.reset();
            }, function(error) {
                // Show failure alert
                showAlert("Failed to send message. Please try again later.");
            });
    });

    // Handle form navigation with Enter key
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.id === 'name') {
                document.getElementById('email').focus();
                event.preventDefault();
            } else if (activeElement.id === 'email') {
                document.getElementById('message').focus();
                event.preventDefault();
            } else if (activeElement.id === 'message') {
                // Check validation before submitting the form
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();

                if (name.length >= 3 && email !== '' && validateEmail(email) && message.length >= 5) {
                    showAlert("Connection sent succesfully")
                } else {
                    showAlert('Please complete all fields correctly.');
                }
                event.preventDefault();
            }
        }
    });


// Function to show the alert message
function showAlert(cusmessage) {
    document.getElementById('alert-message').textContent = cusmessage;
    document.getElementById('alert-overlay').style.display = 'flex';
}

// Function to hide the alert message
function hideAlert() {
    document.getElementById('alert-overlay').style.display = 'none';
}

// Function to validate email address format
function validateEmail(email) {
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
