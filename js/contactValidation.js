function validateForm() {
  const name = document.getElementById("name").value.trim(); // Trim whitespace
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Name validation
  if (name.length === 0) {
    alert("Please enter your name.");
    return false;
  }

  // Email validation
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Message validation
  if (message.length === 0) {
    alert("Please enter your message.");
    return false;
  }

  // Custom validation example: Ensure message is at least 10 characters
  //   if (message.length < 10) {
  //     alert("Message must be at least 10 characters long.");
  //     return false;
  //   }

  // Additional validation logic can be added as needed

  return true; // Submit the form if all validations pass
}
