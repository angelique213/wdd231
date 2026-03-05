// modals.js

// Get elements from the page
const modalEl = document.querySelector("#modal");
const openButton = document.querySelector("#open-modal");
const closeButton = document.querySelector(".close-button");

// Function to open modal
function openModal() {
  modalEl.classList.add("open"); // Show modal
  modalEl.setAttribute("aria-hidden", "false"); // Make accessible to screen readers
}

// Function to close modal
function closeModal() {
  modalEl.classList.remove("open"); // Hide modal
  modalEl.setAttribute("aria-hidden", "true"); // Hide from screen readers
}

// When "Click Me!" is clicked
openButton.addEventListener("click", openModal);

// When X is clicked
closeButton.addEventListener("click", closeModal);

// Close modal when clicking outside the white box
window.addEventListener("click", function (event) {
  if (event.target === modalEl) {
    closeModal();
  }
});

// Close modal when Escape key is pressed
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});