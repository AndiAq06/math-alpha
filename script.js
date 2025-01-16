document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const closeBtn = document.querySelector(".close-btn");
  const sidebar = document.querySelector(".sidebar");

  if (hamburgerMenu && closeBtn && sidebar) {
    // Open Sidebar
    hamburgerMenu.addEventListener("click", () => {
      sidebar.classList.add("show");
    });

    // Close Sidebar
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  } else {
    console.error("One or more elements (.hamburger-menu, .close-btn, .sidebar) are missing in the DOM.");
  }
});
