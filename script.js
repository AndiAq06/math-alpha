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
