/**
 * MathAlpha - Core Interactive JavaScript
 * Modernized for ultimate math learning comfort and visual excellence
 */

(function () {
  "use strict";

  // --- Theme Management (Dark / Light Mode) ---
  const THEME_STORAGE_KEY = "mathalpha_theme";

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle buttons to sleek pure icon
    const toggles = document.querySelectorAll(".theme-toggle-btn, .nav-theme-btn, #themeToggle, #navThemeToggle");
    toggles.forEach((btn) => {
      if (theme === "dark") {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.setAttribute("title", "Ganti ke Mode Terang");
        btn.setAttribute("aria-label", "Ganti ke Mode Terang");
      } else {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.setAttribute("title", "Ganti ke Mode Gelap");
        btn.setAttribute("aria-label", "Ganti ke Mode Gelap");
      }
    });
  }

  // Global delegation for instant theme toggling across any page
  document.addEventListener("click", function (e) {
    const toggleBtn = e.target.closest(".theme-toggle-btn, .nav-theme-btn, #themeToggle, #navThemeToggle");
    if (toggleBtn) {
      e.preventDefault();
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    }
  });

  // Apply immediately before DOMContentLoaded to avoid flash of wrong theme
  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    // Re-apply to ensure elements receive correct states
    applyTheme(getPreferredTheme());

    // --- Global Platform Modernization (Auto-Upgrade All Legacy Question Pages) ---
    ensureAdSenseScript();
    ensureModernNavbar();
    modernizeFooters();
    initQuestionViewer();
    handleLocalhostAdSenseNotice();

    // --- Dynamic UI Injection (Reading Bar) ---
    injectReadingProgressBar();

    // --- Navigation Controls ---
    initCleanNavbar();

    // --- Soal & Pembahasan (Solutions Toggle) ---
    initSolutionToggles();

    // --- Reading Progress & Scroll Effects ---
    initScrollFeatures();

    // --- Interactive Search & Math Filters ---
    initInteractiveSearch();
    initMathCategoryFilter();
    initCopyButtons();
  });

  // --- Sidebar Logic ---
  function ensureSidebarOverlay() {
    let overlay = document.querySelector(".sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);
    }
  }

  function initSidebar() {
    const hamburger = document.querySelector(".hamburger-menu");
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".close-btn");
    const overlay = document.querySelector(".sidebar-overlay");

    function openSidebar() {
      if (sidebar) sidebar.classList.add("active");
      if (overlay) overlay.classList.add("active");
      document.body.classList.add("sidebar-open");
    }

    function closeSidebar() {
      if (sidebar) sidebar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.classList.remove("sidebar-open");
    }

    function toggleSidebar() {
      if (sidebar && sidebar.classList.contains("active")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    if (hamburger) {
      hamburger.addEventListener("click", toggleSidebar);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeSidebar);
    }
    if (overlay) {
      overlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
        closeSidebar();
      }
    });

    // Mark current active menu link
    highlightCurrentMenu();
  }

  function highlightCurrentMenu() {
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const menuItems = document.querySelectorAll(".menu .menu-item");
    menuItems.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const cleanHref = href.replace(/\/$/, "");
      if (
        cleanHref === currentPath ||
        (currentPath.length > 1 && cleanHref !== "/index.html" && cleanHref !== "/" && currentPath.includes(cleanHref))
      ) {
        link.classList.add("active");
      }
    });
  }

  // --- Automatic Layout & Top Navbar Injection for All Question Pages ---
  function ensureModernNavbar() {
    if (document.querySelector(".site-header")) return;

    // Remove legacy sidebar, mobile hamburger and overlays
    const oldSidebar = document.querySelector(".sidebar");
    if (oldSidebar) oldSidebar.remove();
    const oldHamburger = document.querySelector(".hamburger-menu");
    if (oldHamburger) oldHamburger.remove();
    const oldOverlay = document.querySelector(".sidebar-overlay");
    if (oldOverlay) oldOverlay.remove();

    // Determine correct base path for localhost/domain
    const currentPath = window.location.pathname;
    const isMathAlpha = currentPath.includes("/math-alpha");
    const basePath = isMathAlpha ? "/math-alpha/" : "/";

    // Create top navbar (4 Menus Only: TIU, TWK, TKP, Matematika)
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="site-nav-container">
        <a href="${basePath}index.html" class="site-brand">
          <img src="${basePath}img/logo.png" alt="MathAlpha Logo" />
          <span>MathAlpha</span>
        </a>
        <nav>
          <ul class="site-nav-menu" id="siteNavMenu">
            <li class="site-nav-item">
              <a href="${basePath}tiu.html" class="site-nav-link ${currentPath.includes('/tiu') || currentPath.includes('/TIU') ? 'active' : ''}"><i class="fas fa-brain"></i> TIU</a>
            </li>
            <li class="site-nav-item">
              <a href="${basePath}twk.html" class="site-nav-link ${currentPath.includes('/twk') ? 'active' : ''}"><i class="fas fa-landmark"></i> TWK</a>
            </li>
            <li class="site-nav-item">
              <a href="${basePath}tkp.html" class="site-nav-link ${currentPath.includes('/tkp') ? 'active' : ''}"><i class="fas fa-user-check"></i> TKP</a>
            </li>
            <li class="site-nav-item nav-dropdown">
              <a href="${basePath}matematika.html" class="site-nav-link ${currentPath.includes('/matematika') || currentPath.includes('/kelas-7') || currentPath.includes('/stan') ? 'active' : ''}">
                <i class="fas fa-square-root-alt"></i> Matematika
                <i class="fas fa-chevron-down" style="font-size: 0.72rem; margin-left: 4px;"></i>
              </a>
              <div class="nav-dropdown-menu">
                <a href="${basePath}matematika-sd.html" class="nav-dropdown-item"><i class="fas fa-shapes"></i> Matematika SD</a>
                <a href="${basePath}matematika-smp.html" class="nav-dropdown-item"><i class="fas fa-calculator"></i> Matematika SMP</a>
                <a href="${basePath}matematika-sma.html" class="nav-dropdown-item"><i class="fas fa-square-root-alt"></i> Matematika SMA</a>
              </div>
            </li>
          </ul>
        </nav>
        <div class="site-nav-actions">
          <button class="nav-theme-btn theme-toggle-btn" id="navThemeToggle" type="button" aria-label="Ubah Tema" title="Ubah Tema">
            <i class="fas fa-moon"></i>
          </button>
          <button class="mobile-nav-toggle" id="mobileNavToggle" type="button" aria-label="Buka Menu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    `;

    document.body.prepend(header);

    // Inject breadcrumb inside .content if not present
    const content = document.querySelector(".content, main");
    if (content && !document.querySelector(".clean-breadcrumb")) {
      const pageHeading = content.querySelector("h1");
      const titleText = pageHeading ? pageHeading.textContent.trim() : "Latihan Soal";

      let categoryName = "TIU";
      let categoryLink = `${basePath}tiu.html`;
      if (currentPath.includes("/kelas-7") || currentPath.includes("smp")) {
        categoryName = "Matematika SMP";
        categoryLink = `${basePath}matematika-smp.html`;
      } else if (currentPath.includes("sd")) {
        categoryName = "Matematika SD";
        categoryLink = `${basePath}matematika-sd.html`;
      } else if (currentPath.includes("sma") || currentPath.includes("stan") || currentPath.includes("matematika")) {
        categoryName = "Matematika SMA";
        categoryLink = `${basePath}matematika-sma.html`;
      }

      const breadcrumb = document.createElement("nav");
      breadcrumb.className = "clean-breadcrumb";
      breadcrumb.setAttribute("aria-label", "Breadcrumb");
      breadcrumb.innerHTML = `
        <a href="${basePath}index.html"><i class="fas fa-home"></i></a>
        <span class="sep"><i class="fas fa-chevron-right"></i></span>
        <a href="${categoryLink}">${categoryName}</a>
        <span class="sep"><i class="fas fa-chevron-right"></i></span>
        <span class="current">${titleText}</span>
      `;
      content.prepend(breadcrumb);
    }
  }

  // --- Automatic Footer Modernization (Matches Home Footer Exactly + Donasi) ---
  function modernizeFooters() {
    const footers = document.querySelectorAll("main footer, .content footer, footer:not(.clean-site-footer)");
    const currentPath = window.location.pathname;
    const isMathAlpha = currentPath.includes("/math-alpha");
    const basePath = isMathAlpha ? "/math-alpha/" : "/";

    // Remove legacy footers
    footers.forEach((footer) => {
      if (!footer.classList.contains("clean-site-footer")) {
        footer.remove();
      }
    });

    // Ensure full-width clean-site-footer exists
    let cleanFooter = document.querySelector(".clean-site-footer");
    if (!cleanFooter) {
      cleanFooter = document.createElement("footer");
      cleanFooter.className = "clean-site-footer";
      document.body.appendChild(cleanFooter);
    }

    cleanFooter.innerHTML = `
      <div class="clean-footer-inner">
        <div class="clean-footer-brand">
          <img src="${basePath}img/logo.png" alt="MathAlpha Logo" />
          <span>MathAlpha</span>
        </div>
        <p class="clean-footer-desc">
          Platform belajar mandiri matematika dan persiapan ujian seleksi CPNS/Kedinasan dengan materi terstruktur dan latihan soal interaktif.
        </p>
        <div class="clean-footer-links">
          <a href="${basePath}index.html">Home</a>
          <a href="${basePath}tiu.html">TIU</a>
          <a href="${basePath}twk.html">TWK</a>
          <a href="${basePath}tkp.html">TKP</a>
          <a href="${basePath}matematika-sd.html">Matematika SD</a>
          <a href="${basePath}matematika-smp.html">Matematika SMP</a>
          <a href="${basePath}matematika-sma.html">Matematika SMA</a>
          <a href="${basePath}about.html">About</a>
        </div>
        <div class="footer-donation-box">
          <span style="font-weight: 600;"><i class="fas fa-heart" style="color: #ef4444; margin-right: 6px;"></i>Dukungan Donasi & Pengembangan MathAlpha:</span>
          <div class="donation-badges">
            <span class="donation-badge">DANA: <strong>081524190409</strong></span>
            <span class="donation-badge">ShopeePay: <strong>081524190409</strong></span>
          </div>
        </div>
        <p class="clean-footer-copy">&copy; 2026 MathAlpha. Semua Hak Dilindungi.</p>
      </div>
    `;
  }

  // --- Single Question Interactive Viewer (1 Soal per Halaman with Next/Prev) ---
  function initQuestionViewer() {
    if (document.querySelector(".quiz-wrapper")) return;
    const soalList = document.querySelectorAll(".soal");
    if (soalList.length <= 1) return; // Only apply pagination when multiple questions exist

    const totalQuestions = soalList.length;
    let currentQuestionIndex = 0;

    // Create wrapper for the quiz
    const firstSoal = soalList[0];
    const quizWrapper = document.createElement("div");
    quizWrapper.className = "quiz-wrapper";
    firstSoal.parentNode.insertBefore(quizWrapper, firstSoal);

    soalList.forEach((soal, idx) => {
      soal.classList.add("single-mode");
      soal.style.display = idx === 0 ? "block" : "none";
      quizWrapper.appendChild(soal);

      // Remove legacy <h3>Soal X:</h3> if exists
      const oldHeading = soal.querySelector("h3");
      if (oldHeading && oldHeading.textContent.toLowerCase().includes("soal")) {
        oldHeading.remove();
      }

      // Add top header meta inside question card like MisiPNS
      if (!soal.querySelector(".soal-header-meta")) {
        const headerMeta = document.createElement("div");
        headerMeta.className = "soal-header-meta";
        headerMeta.innerHTML = `
          <span class="soal-counter-title">Soal <strong>${idx + 1}</strong> dari ${totalQuestions}</span>
          <span class="soal-diff-badge">Latihan Soal</span>
        `;
        soal.prepend(headerMeta);
      }

      // Make options clickable to mark them, but user DOES NOT have to pick any option
      const choices = soal.querySelectorAll(".pilihan p");
      choices.forEach((choice) => {
        choice.addEventListener("click", function () {
          choices.forEach((c) => c.classList.remove("selected"));
          this.classList.add("selected");
        });
      });

      // Update button text to "Lihat Pembahasan"
      const toggleBtn = soal.querySelector(".btn-toggle");
      if (toggleBtn) {
        toggleBtn.innerHTML = `<i class="fas fa-lightbulb"></i> Lihat Pembahasan`;
      }
    });

    // Create Navigation Controller (Lanjut & Mundur)
    const navCtrl = document.createElement("div");
    navCtrl.className = "quiz-nav-controller";
    navCtrl.innerHTML = `
      <button class="btn-quiz-nav btn-quiz-prev" type="button" disabled>
        <i class="fas fa-chevron-left"></i> Soal Sebelumnya
      </button>
      <span class="quiz-nav-status">Soal <strong id="quizNavCurrent">1</strong> / ${totalQuestions}</span>
      <button class="btn-quiz-nav btn-quiz-next" type="button">
        Soal Selanjutnya <i class="fas fa-chevron-right"></i>
      </button>
    `;
    quizWrapper.after(navCtrl);

    const prevBtn = navCtrl.querySelector(".btn-quiz-prev");
    const nextBtn = navCtrl.querySelector(".btn-quiz-next");
    const navCurrent = navCtrl.querySelector("#quizNavCurrent");

    function updateQuestionView(newIndex) {
      soalList[currentQuestionIndex].style.display = "none";
      currentQuestionIndex = newIndex;
      soalList[currentQuestionIndex].style.display = "block";

      navCurrent.textContent = currentQuestionIndex + 1;
      prevBtn.disabled = currentQuestionIndex === 0;

      if (currentQuestionIndex === totalQuestions - 1) {
        nextBtn.innerHTML = `Selesai Latihan <i class="fas fa-check-circle"></i>`;
      } else {
        nextBtn.innerHTML = `Soal Selanjutnya <i class="fas fa-chevron-right"></i>`;
      }

      // Scroll smoothly to top of question card
      quizWrapper.scrollIntoView({ behavior: "smooth", block: "start" });

      // Trigger MathJax re-render if available
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([soalList[currentQuestionIndex]]).catch(() => {});
      }
    }

    prevBtn.addEventListener("click", function () {
      if (currentQuestionIndex > 0) {
        updateQuestionView(currentQuestionIndex - 1);
      }
    });

    nextBtn.addEventListener("click", function () {
      if (currentQuestionIndex < totalQuestions - 1) {
        updateQuestionView(currentQuestionIndex + 1);
      }
    });

    // Add Topik Lainnya Grid section below navigation
    injectRelatedTopics(navCtrl);

    // Inject high-yield AdSense spots across empty spaces
    injectQuestionAdSense(quizWrapper, navCtrl);
  }

  // --- Ensure AdSense Client Library Is Loaded in Head ---
  function ensureAdSenseScript() {
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1624084859744468";
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    }
  }

  // --- High-Yield AdSense Placements in Empty Spots on Question Pages ---
  function injectQuestionAdSense(quizWrapper, navCtrl) {
    if (!quizWrapper) return;
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    const localhostBadgeHtml = isLocalhost
      ? `
      <div class="adsense-localhost-badge">
        <i class="fas fa-bullhorn"></i>
        <strong>Slot Google AdSense (Slot ID: 2653926339)</strong>
        <code>ca-pub-1624084859744468</code>
        <p>Iklan resmi akan otomatis muncul dan proporsional mengisi kotak ini saat website diakses di domain publik resmi Anda.</p>
      </div>`
      : "";

    // Slot 1: Top banner above the question card
    if (!document.querySelector(".quiz-top-ad")) {
      const topAd = document.createElement("div");
      topAd.className = "clean-adsense-card quiz-top-ad";
      topAd.innerHTML = `
        <span class="adsense-label">Iklan Bersponsor</span>
        <ins class="adsbygoogle" style="display: block" data-ad-format="fluid" data-ad-layout-key="-gw-3+1f-3d+2z" data-ad-client="ca-pub-1624084859744468" data-ad-slot="2653926339"></ins>
        ${localhostBadgeHtml}
      `;
      quizWrapper.before(topAd);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }

    // Slot 2: Mid banner below navigation controls
    if (navCtrl && !document.querySelector(".quiz-mid-ad")) {
      const midAd = document.createElement("div");
      midAd.className = "clean-adsense-card quiz-mid-ad";
      midAd.innerHTML = `
        <span class="adsense-label">Iklan Bersponsor</span>
        <ins class="adsbygoogle" style="display: block" data-ad-format="fluid" data-ad-layout-key="-gw-3+1f-3d+2z" data-ad-client="ca-pub-1624084859744468" data-ad-slot="2653926339"></ins>
        ${localhostBadgeHtml}
      `;
      navCtrl.after(midAd);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }

    // Slot 3: Bottom banner below related topics
    const relatedSection = document.querySelector(".related-topics-section");
    if (relatedSection && !document.querySelector(".quiz-bottom-ad")) {
      const bottomAd = document.createElement("div");
      bottomAd.className = "clean-adsense-card quiz-bottom-ad";
      bottomAd.innerHTML = `
        <span class="adsense-label">Iklan Bersponsor</span>
        <ins class="adsbygoogle" style="display: block" data-ad-format="fluid" data-ad-layout-key="-gw-3+1f-3d+2z" data-ad-client="ca-pub-1624084859744468" data-ad-slot="2653926339"></ins>
        ${localhostBadgeHtml}
      `;
      relatedSection.after(bottomAd);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }

  // Helper for static AdSense cards on localhost
  function handleLocalhostAdSenseNotice() {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (!isLocalhost) return;

    document.body.classList.add("is-localhost");

    const renderBadges = () => {
      document.querySelectorAll(".clean-adsense-card").forEach((card) => {
        card.style.setProperty("display", "block", "important");
        if (!card.querySelector(".adsense-localhost-badge")) {
          const badge = document.createElement("div");
          badge.className = "adsense-localhost-badge";
          badge.innerHTML = `
            <i class="fas fa-bullhorn"></i>
            <strong>Slot Google AdSense Aktif (Slot: 2653926339)</strong>
            <code>ca-pub-1624084859744468</code>
            <p>Iklan resmi akan otomatis muncul dan proporsional mengisi kotak ini saat website diakses di domain publik resmi Anda.</p>
          `;
          card.appendChild(badge);
        }
      });
    };

    renderBadges();

    // Prevent Google AdSense script from hiding the preview box when returning unfilled on localhost
    const observer = new MutationObserver(() => {
      document.querySelectorAll(".clean-adsense-card").forEach((card) => {
        if (card.style.display === "none") {
          card.style.setProperty("display", "block", "important");
        }
      });
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["style", "data-ad-status"] });
  }

  // --- Related Topics Section (Topik Lainnya matching Gambar 1) ---
  function injectRelatedTopics(afterElement) {
    if (document.querySelector(".related-topics-section")) return;

    const currentPath = window.location.pathname;
    const isMathAlpha = currentPath.includes("/math-alpha");
    const basePath = isMathAlpha ? "/math-alpha/" : "/";

    const section = document.createElement("section");
    section.className = "related-topics-section";
    section.innerHTML = `
      <h3>Topik Lainnya</h3>
      <div class="related-topics-grid">
        <a href="${basePath}tiu/matematika-paket-2.html" class="related-topic-card">
          <h4>Numerik Berhitung Dasar</h4>
          <p>296 soal tersedia</p>
        </a>
        <a href="${basePath}tiu/matematika-paket-3.html" class="related-topic-card">
          <h4>Numerik Soal Cerita</h4>
          <p>245 soal tersedia</p>
        </a>
        <a href="${basePath}tiu/deret-angka-1.html" class="related-topic-card">
          <h4>Numerik Deret Angka</h4>
          <p>261 soal tersedia</p>
        </a>
        <a href="${basePath}tiu/silogisme-paket-1.html" class="related-topic-card">
          <h4>Verbal Silogisme</h4>
          <p>224 soal tersedia</p>
        </a>
        <a href="${basePath}tiu/sinonim-paket-1.html" class="related-topic-card">
          <h4>Verbal Analogi & Sinonim</h4>
          <p>195 soal tersedia</p>
        </a>
        <a href="${basePath}tiu.html" class="related-topic-card">
          <h4>Semua Paket Latihan TIU</h4>
          <p>1672 soal lengkap</p>
        </a>
      </div>
    `;
    afterElement.after(section);
  }

  // --- Clean Top Navbar Logic ---
  function initCleanNavbar() {
    const toggleBtn = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector(".site-nav-menu");
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener("click", function () {
        navMenu.classList.toggle("mobile-open");
      });
    }

    const navThemeBtn = document.querySelector(".nav-theme-btn");
    if (navThemeBtn) {
      navThemeBtn.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }

    // Highlight current active link in site-nav-menu
    const currentPath = window.location.pathname.replace(/\/$/, "");
    const navLinks = document.querySelectorAll(".site-nav-link");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const cleanHref = href.replace(/\/$/, "");
      if (
        cleanHref === currentPath ||
        (currentPath.length > 1 && cleanHref !== "/index.html" && cleanHref !== "/" && currentPath.endsWith(cleanHref))
      ) {
        link.classList.add("active");
      }
    });
  }

  // --- Reading Progress Bar ---
  function injectReadingProgressBar() {
    if (!document.getElementById("reading-progress")) {
      const progressBar = document.createElement("div");
      progressBar.id = "reading-progress";
      progressBar.setAttribute("role", "progressbar");
      progressBar.setAttribute("aria-valuemin", "0");
      progressBar.setAttribute("aria-valuemax", "100");
      progressBar.setAttribute("aria-valuenow", "0");
      document.body.appendChild(progressBar);
    }
  }

  // --- Floating Controls (Theme Toggle & Back to Top) ---
  function injectFloatingControls() {
    if (document.querySelector(".floating-controls")) return;

    const container = document.createElement("div");
    container.className = "floating-controls";

    // Theme Toggle Button
    const themeBtn = document.createElement("button");
    themeBtn.className = "floating-btn theme-toggle-btn";
    themeBtn.setAttribute("type", "button");
    themeBtn.setAttribute("title", "Toggle Dark/Light Mode");
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeBtn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });

    // Back to Top Button
    const topBtn = document.createElement("button");
    topBtn.className = "floating-btn back-to-top-btn";
    topBtn.setAttribute("type", "button");
    topBtn.setAttribute("title", "Kembali ke Atas");
    topBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    topBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    container.appendChild(themeBtn);
    container.appendChild(topBtn);
    document.body.appendChild(container);
  }

  // --- Scroll Events ---
  function initScrollFeatures() {
    const progressBar = document.getElementById("reading-progress");
    const topBtn = document.querySelector(".back-to-top-btn");

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = scrollPercent + "%";
        progressBar.setAttribute("aria-valuenow", Math.round(scrollPercent));
      }

      if (topBtn) {
        if (scrollTop > 350) {
          topBtn.classList.add("visible");
        } else {
          topBtn.classList.remove("visible");
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // --- Soal & Pembahasan Interactive Toggles ---
  function initSolutionToggles() {
    const buttons = document.querySelectorAll(".btn-toggle, .solution-btn");

    buttons.forEach((button) => {
      // Find the corresponding solution container
      let pembahasan = button.nextElementSibling;
      if (!pembahasan || (!pembahasan.classList.contains("pembahasan") && !pembahasan.classList.contains("solution"))) {
        // Fallback: search in parent
        const parent = button.closest(".soal, .exercise-box, .property-box") || button.parentElement;
        if (parent) {
          pembahasan = parent.querySelector(".pembahasan, .solution");
        }
      }

      if (!pembahasan) return;

      // Enhance initial button text & icon if simple
      const isCurrentlyVisible =
        window.getComputedStyle(pembahasan).display !== "none" && pembahasan.classList.contains("show");

      updateButtonState(button, isCurrentlyVisible);

      button.addEventListener("click", function (e) {
        e.preventDefault();
        const isHidden =
          window.getComputedStyle(pembahasan).display === "none" || !pembahasan.classList.contains("show");

        if (isHidden) {
          pembahasan.style.display = "block";
          // Trigger reflow for CSS transition
          void pembahasan.offsetHeight;
          pembahasan.classList.add("show");
          updateButtonState(button, true);
        } else {
          pembahasan.classList.remove("show");
          updateButtonState(button, false);
          setTimeout(() => {
            if (!pembahasan.classList.contains("show")) {
              pembahasan.style.display = "none";
            }
          }, 250);
        }
      });
    });
  }

  function updateButtonState(button, isShown) {
    if (isShown) {
      button.innerHTML = '<i class="fas fa-eye-slash"></i> <span>Tutup Pembahasan</span>';
      button.classList.add("active");
    } else {
      button.innerHTML = '<i class="fas fa-eye"></i> <span>Lihat Pembahasan</span>';
      button.classList.remove("active");
    }
  }

  // --- Interactive Live Search ---
  function initInteractiveSearch() {
    const searchInputs = document.querySelectorAll(".search-box input, #math-search-input, .math-search-input");
    if (!searchInputs.length) return;

    searchInputs.forEach((input) => {
      input.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();
        filterCards(query);
      });
    });
  }

  function filterCards(query) {
    // 1. Math hub cards
    const mathCards = document.querySelectorAll(".math-card, .category-card, .article-card, .update-card");
    let matchCount = 0;

    mathCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = "";
        card.classList.remove("search-hidden");
        matchCount++;
      } else {
        card.style.display = "none";
        card.classList.add("search-hidden");
      }
    });

    // 2. Also filter post list items (for pages with <ul><li><div class="post-details">)
    const postItems = document.querySelectorAll("main.content ul li, .post-item");
    postItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });

    // Show no-results notification if needed
    const noResults = document.getElementById("search-no-results");
    if (noResults) {
      if (query && matchCount === 0) {
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    }
  }

  // --- Math Category Pill Filters ---
  function initMathCategoryFilter() {
    const filterPills = document.querySelectorAll(".math-filter-pill");
    if (!filterPills.length) return;

    filterPills.forEach((pill) => {
      pill.addEventListener("click", function () {
        filterPills.forEach((p) => p.classList.remove("active"));
        this.classList.add("active");

        const category = this.getAttribute("data-category");
        const cards = document.querySelectorAll(".math-card[data-category]");

        cards.forEach((card) => {
          const cardCat = card.getAttribute("data-category");
          if (category === "all" || cardCat === category || cardCat.includes(category)) {
            card.style.display = "";
            card.classList.remove("cat-hidden");
          } else {
            card.style.display = "none";
            card.classList.add("cat-hidden");
          }
        });
      });
    });
  }

  // --- Quick Formula & Code Copy Buttons ---
  function initCopyButtons() {
    const codeBlocks = document.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      const pre = block.parentElement;
      if (pre.querySelector(".btn-copy-code")) return;

      const copyBtn = document.createElement("button");
      copyBtn.className = "btn-copy-code";
      copyBtn.innerHTML = '<i class="far fa-copy"></i> Salin';
      copyBtn.setAttribute("title", "Salin ke clipboard");

      copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(block.innerText).then(() => {
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Salin';
          }, 2000);
        });
      });

      pre.appendChild(copyBtn);
    });
  }
})();
