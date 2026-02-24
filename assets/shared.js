(function(){
  // === ASPI contact details ===
  const phonePrimary = "+922134610777";
  const phoneSecondary = "+922134611572";
  const email = "alsyedpsychiatricinstitute@gmail.com";
  const maps = "https://maps.app.goo.gl/wdHY91nQdXnPWGKY6?g_st=ic";

  const nav = [
    { href:"index.html", key:"navHome", default:"Home" },
    { href:"services.html", key:"navServices", default:"Services" },
    { href:"conditions.html", key:"navConditions", default:"Conditions" },
    { href:"specialists.html", key:"navSpecialists", default:"Specialists" },
    { href:"facilities.html", key:"navFacilities", default:"Facilities" },
    { href:"about.html", key:"navAbout", default:"About" },
    { href:"contact.html", key:"navContact", default:"Contact" }
  ];

  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const topbarHTML = `
    <div class="topbar">
      <div class="container inner">
        <div class="pill"><span class="dot"></span><span data-i18n="topbar">Premium private mental health center • Karachi</span></div>
        <div class="pill">
          <span data-i18n="phoneLabel">Phone booking:</span>
          <strong style="color:rgba(23,53,51,.92)">${phonePrimary}</strong>
          <span style="opacity:.5">•</span>
          <strong style="color:rgba(23,53,51,.92)">${phoneSecondary}</strong>
        </div>
        <div class="lang" aria-label="Language toggle">
          <button id="langEN" class="active" type="button">English</button>
          <button id="langUR" type="button">اردو</button>
        </div>
      </div>
    </div>
  `;

  const headerHTML = `
    <header>
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="ASPI Home">
          <img src="./assets/icon_color.png" alt="ASPI logo"
            onerror="this.src='./assets/icon_white.png'; this.style.background='#0099AF';" />
          <div class="name">
            <strong data-i18n="brandName">Al-Syed Psychiatric Institute</strong>
            <span data-i18n="brandTag">Your mind matters.</span>
          </div>
        </a>

        <nav class="links" aria-label="Primary navigation">
          ${nav.map(n => `<a href="${n.href}" data-nav="${n.href}" data-i18n="${n.key}">${n.default}</a>`).join("")}
        </nav>

        <div class="actions">
          <a class="btn" href="tel:${phonePrimary}" data-i18n="callNow">Call Now</a>
          <a class="btn primary" href="contact.html" data-i18n="bookAppt">Book Appointment</a>
        </div>
      </div>
    </header>
  `;

  const footerHTML = `
    <footer>
      <div class="container footer">
        <div style="display:flex; gap:12px; align-items:center;">
          <img src="./assets/icon_color.png" alt="ASPI logo"
               style="width:34px;height:34px;border-radius:14px;border:1px solid rgba(0,153,175,.18);padding:6px;background:#fff"
               onerror="this.src='./assets/icon_white.png'; this.style.background='#0099AF';" />
          <div>
            <div><strong style="color:rgba(23,53,51,.92); font-weight:1000">Al-Syed Psychiatric Institute (ASPI)</strong></div>
            <div data-i18n="footLine">Gulshan-e-Iqbal, Karachi • Confidential mental health care</div>
            <div style="margin-top:6px;">
              <a href="tel:${phonePrimary}">${phonePrimary}</a> •
              <a href="tel:${phoneSecondary}">${phoneSecondary}</a>
            </div>
          </div>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a class="btn" data-i18n="maps" href="${maps}" target="_blank" rel="noopener">Maps</a>
          <a class="btn" href="mailto:${email}">${email}</a>
          <a class="btn" href="services.html" data-i18n="navServices">Services</a>
          <a class="btn" href="contact.html" data-i18n="navContact">Contact</a>
        </div>
      </div>

      <div class="container" style="margin-top:16px;">
        © <span id="yr"></span> <span data-i18n="rights">ASPI. All rights reserved.</span>
      </div>
    </footer>
  `;

  // Inject shared sections
  const rootTop = document.getElementById("site-topbar");
  const rootHeader = document.getElementById("site-header");
  const rootFooter = document.getElementById("site-footer");
  if(rootTop) rootTop.innerHTML = topbarHTML;
  if(rootHeader) rootHeader.innerHTML = headerHTML;
  if(rootFooter) rootFooter.innerHTML = footerHTML;

  // Active nav link
  document.querySelectorAll(`[data-nav="${current}"]`).forEach(a => a.classList.add("active"));

  // Year
  const yr = document.getElementById("yr");
  if(yr) yr.textContent = new Date().getFullYear();
})();
