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

  return true; // Submit the form if all validations pass
}

document.getElementById("contactForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  if (!validateForm()) {
    return; // If validation fails, do not proceed
  }

  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(event.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formDataObj).toString(),
    });

    if (response.ok) {
      document.getElementById("contactForm").reset();
      window.location.href = "./pages/success.html"; // Redirect to success page
    } else {
      alert("There was an error sending your message. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error sending your message. Please try again later.");
  }
});
