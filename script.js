document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector(".close-btn");
  const overlay = document.querySelector(".sidebar-overlay");

  function toggleSidebar() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  hamburger.addEventListener("click", toggleSidebar);
  closeBtn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
});

// Toggle pembahasan
document.querySelectorAll(".btn-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const pembahasan = button.nextElementSibling;
    if (pembahasan.style.display === "block") {
      pembahasan.style.display = "none";
      button.textContent = "Show Solution";
    } else {
      pembahasan.style.display = "block";
      button.textContent = "Hide Solution";
    }
  });
});

// Toggle sidebar
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
