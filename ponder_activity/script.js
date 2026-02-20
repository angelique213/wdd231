// Runs when form is submitted
function submitForm(event) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
  
    let error = "";
  
    // Check if name is empty
    if (nameInput.value === "") {
      error += "Name is required.\n";
    }
  
    // Check if email is empty or invalid
    if (emailInput.value === "") {
      error += "Email is required.\n";
    } else if (!validateEmail(emailInput.value)) {
      error += "Please enter a valid email address.\n";
    }
  
    // Stop form and show error if needed
    if (error) {
      event.preventDefault();
      document.getElementById("form-error").textContent = error;
    }
  }
  
  // Checks email format
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Attach submit event to form
  document
    .getElementById("contact-form")
    .addEventListener("submit", submitForm);