(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setActiveLinks(){
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const match = (href) => {
      const h = (href||"").toLowerCase();
      if (!h) return false;
      if ((path===""||path==="index.html") && (h==="index.html"||h==="./index.html"||h==="/")) return true;
      return h===path || h===`./${path}`;
    };
    [...$$(".nav-links a"), ...$$(".mobile-links a")].forEach(a=>{
      a.classList.toggle("is-active", match(a.getAttribute("href")));
    });
  }

  function initMobileMenu(){
    const btn=$("#menuBtn"), menu=$("#mobileMenu"), overlay=$("#menuOverlay");
    if(!btn||!menu) return;
    let scrollY=0;

    const lock=()=>{
      scrollY=window.scrollY||0;
      document.body.classList.add("menu-open");
      document.body.style.position="fixed";
      document.body.style.top=`-${scrollY}px`;
      document.body.style.left="0"; document.body.style.right="0";
    };
    const unlock=()=>{
      document.body.classList.remove("menu-open");
      document.body.style.position="";
      document.body.style.top=""; document.body.style.left=""; document.body.style.right="";
      window.scrollTo(0, scrollY);
    };
    const open=()=>{
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded","true");
      menu.setAttribute("aria-hidden","false");
      if(overlay){ overlay.classList.add("is-on"); overlay.setAttribute("aria-hidden","false"); }
      lock();
    };
    const close=()=>{
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded","false");
      menu.setAttribute("aria-hidden","true");
      if(overlay){ overlay.classList.remove("is-on"); overlay.setAttribute("aria-hidden","true"); }
      unlock();
    };
    btn.addEventListener("click", ()=> menu.classList.contains("is-open")?close():open());
    if(overlay) overlay.addEventListener("click", close);
    $$(".mobile-links a").forEach(a=>a.addEventListener("click", close));
    document.addEventListener("keydown", e=>{ if(e.key==="Escape") close(); });
    window.addEventListener("resize", ()=>{ if(!window.matchMedia("(max-width: 900px)").matches) close(); });
  }

  const I18N = {"en": {"topbar": "Premium private mental health center • Karachi", "phoneLabel": "Phone booking:", "brandName": "Al-Syed Psychiatric Institute", "navHome": "Home", "navConsultation": "Consultation", "navServices": "Services", "navConditions": "Conditions", "navSpecialists": "Specialists", "navFacilities": "Facilities", "navInpatient": "Inpatient Care", "navAddiction": "Addiction Treatment", "navAbout": "About", "navContact": "Contact", "ctaConsult": "Request a Confidential Consultation", "ctaSpeak": "Speak With a Specialist", "homeKicker": "Confidential • Evidence-based • Discreet", "homeH1": "Your Mind Matters.", "homeLead": "Confidential, evidence-based psychiatric and psychological care delivered within a structured clinical environment.", "homeTrustH2": "A Clinically Grounded Psychiatric Institute", "homeTrust1": "Consultant Psychiatrists", "homeTrust2": "Clinical Psychologists", "homeTrust3": "Evidence-Based Treatment", "homeTrust4": "Confidential & Discreet Care", "homeTrust5": "Structured Clinical Assessments", "homeTrust6": "Inpatient & Outpatient Services", "homeStartH2": "Start with a private consultation", "homeStartP": "A consultation allows a qualified clinician to assess your concerns and recommend an appropriate clinical pathway — without pressure or obligation.", "homeSvcH2": "Comprehensive Mental Healthcare Services", "homeSvc1T": "Clinical Psychiatry", "homeSvc1P": "Assessment, diagnosis, medication management, and structured follow-up care.", "homeSvc2T": "Psychological Therapy", "homeSvc2P": "Evidence-based therapeutic interventions for emotional and behavioral concerns.", "homeSvc3T": "Addiction Treatment", "homeSvc3P": "Psychiatric-led clinical treatment for substance use disorders.", "homeSvc4T": "Inpatient & Outpatient Care", "homeSvc4P": "Structured care environments aligned with varying levels of psychiatric need.", "consultH1": "Private, Confidential Consultation", "consultLead": "A calm, clinically guided first step — designed to reduce uncertainty and help you understand the right pathway for care.", "consultHowH2": "What to expect", "consultHow1": "A private discussion with a clinician", "consultHow2": "Clinical assessment of concerns or symptoms", "consultHow3": "Clear guidance on next steps", "consultHow4": "No pressure, no obligation", "consultCTA": "Request Consultation", "servicesH1": "Mental Healthcare Services", "servicesLead": "Every service at ASPI is delivered with clinical accuracy, professional confidentiality, and patient dignity.", "servicesCard1T": "Clinical Psychiatry", "servicesCard1P": "Diagnostic assessment, medication management, and structured follow-ups.", "servicesCard2T": "Therapy & Counseling", "servicesCard2P": "Evidence-based therapy for emotional and behavioral concerns.", "servicesCard3T": "Addiction Treatment", "servicesCard3P": "Psychiatric-led clinical care for substance use disorders.", "servicesCard4T": "Inpatient & Outpatient Care", "servicesCard4P": "Clinical supervision aligned with varying levels of need.", "conditionsH1": "Clinical Conditions Evaluated & Treated", "conditionsLead": "ASPI provides structured psychiatric and psychological care for a wide spectrum of clinically recognized mental health conditions.", "conditionsNote": "If you are unsure about symptoms, begin with a confidential consultation for professional guidance.", "specialistsH1": "Our Clinical Specialists", "specialistsLead": "A multidisciplinary team providing integrated psychiatric and psychological care within a framework of confidentiality and clinical precision.", "specialistsPsyT": "Consultant Psychiatrists", "specialistsPsyP": "Psychiatric assessment, diagnosis, medication management, and clinical supervision.", "specialistsPsycT": "Clinical Psychologists", "specialistsPsycP": "Psychological assessment and evidence-based therapy.", "specialistsTherT": "Therapists & Counselors", "specialistsTherP": "Structured therapeutic support and coping strategies.", "facilitiesH1": "Clinical Care Environment", "facilitiesLead": "Inpatient and outpatient psychiatric care delivered within a confidentiality-focused clinical setting.", "facilitiesOutT": "Outpatient Services", "facilitiesOutP": "Consultations, therapy sessions, and structured follow-ups.", "facilitiesInT": "Confidential Inpatient Care", "facilitiesInP": "Designed for clinical stabilization, psychiatric monitoring, and structured supervision.", "facilitiesPrivT": "Privacy & Discretion", "facilitiesPrivP": "Confidential admissions, discreet clinical processes, and professional ethical standards.", "inpatientH1": "Confidential Inpatient Psychiatric Care", "inpatientLead": "For individuals requiring structured supervision and stabilization, ASPI offers private inpatient psychiatric care in a controlled clinical environment.", "inpatientBul1": "Clinical stabilization and monitoring", "inpatientBul2": "Structured routine and supervision", "inpatientBul3": "Integrated psychiatric and psychological support", "inpatientBul4": "Dignity-centered, discreet care", "addictionH1": "Psychiatric Care for Addiction & Substance Use Disorders", "addictionLead": "Addiction is a medically recognized condition requiring structured clinical evaluation and supervised treatment — handled with strict confidentiality.", "addictionH2": "Psychiatric-led treatment approach", "addictionBul1": "Clinical evaluation and treatment planning", "addictionBul2": "Stabilization strategies (when required)", "addictionBul3": "Psychological therapy and behavioral interventions", "addictionBul4": "Relapse prevention protocols", "addictionPriv": "All care is delivered with professional discretion and ethical confidentiality.", "aboutH1": "About ASPI", "aboutLead": "Al-Syed Psychiatric Institute is a premium private mental health center providing psychiatric, psychological, inpatient, and addiction services for men and women.", "aboutP1": "Our approach is clinically grounded, evidence-based, and centered on dignity, privacy, and patient safety.", "aboutP2": "We prioritize trust, discretion, and structured treatment planning — beginning with a confidential consultation.", "contactH1": "Contact ASPI", "contactLead": "Appointments are currently scheduled via phone. All communications are handled with professional confidentiality.", "contactPhone": "Phone", "contactEmail": "Email", "contactAddress": "Address", "contactMap": "Open location on Google Maps", "footerNote": "© ASPI • Confidential, clinically grounded mental healthcare."}, "ur": {"topbar": "پریمیئم نجی ذہنی صحت مرکز • کراچی", "phoneLabel": "فون کے ذریعے اپائنٹمنٹ:", "brandName": "ال سید سائیکیٹرک انسٹیٹیوٹ", "navHome": "ہوم", "navConsultation": "مشاورت", "navServices": "خدمات", "navConditions": "مسائل", "navSpecialists": "ماہرین", "navFacilities": "سہولیات", "navInpatient": "ان پیشنٹ کیئر", "navAddiction": "لت/نشے کا علاج", "navAbout": "ہمارے بارے میں", "navContact": "رابطہ", "ctaConsult": "رازدارانہ مشاورت کی درخواست کریں", "ctaSpeak": "ماہر سے بات کریں", "homeKicker": "رازدارانہ • شواہد پر مبنی • باوقار", "homeH1": "آپ کا ذہن اہم ہے۔", "homeLead": "نفسیاتی و نفسیاتی علاج کی رازداری کے ساتھ، ایک منظم کلینیکل ماحول میں۔", "homeTrustH2": "ایک بااعتبار نفسیاتی ادارہ", "homeTrust1": "کنسلٹنٹ سائیکاٹرسٹ", "homeTrust2": "کلینیکل سائیکالوجسٹ", "homeTrust3": "شواہد پر مبنی علاج", "homeTrust4": "مکمل رازداری", "homeTrust5": "منظم کلینیکل تشخیص", "homeTrust6": "ان/آؤٹ پیشنٹ سہولیات", "homeStartH2": "نجی مشاورت سے آغاز کریں", "homeStartP": "مشاورت میں ماہر آپ کی کیفیت کا جائزہ لیتا ہے اور مناسب کلینیکل راستہ تجویز کرتا ہے — بغیر دباؤ اور بغیر پابندی کے۔", "homeSvcH2": "جامع ذہنی صحت کی خدمات", "homeSvc1T": "کلینیکل سائیکاٹری", "homeSvc1P": "تشخیص، ادویات، اور فالو اَپ کے ساتھ منظم علاج۔", "homeSvc2T": "تھراپی", "homeSvc2P": "جذباتی و رویّوں کے مسائل کیلئے شواہد پر مبنی تھراپی۔", "homeSvc3T": "لت/نشے کا علاج", "homeSvc3P": "نفسیاتی نگرانی میں کلینیکل علاج۔", "homeSvc4T": "ان/آؤٹ پیشنٹ کیئر", "homeSvc4P": "ضرورت کے مطابق منظم کلینیکل نگہداشت۔", "consultH1": "نجی اور رازدارانہ مشاورت", "consultLead": "ایک پُرسکون، کلینیکل رہنمائی پر مبنی پہلا قدم — تاکہ الجھن کم ہو اور درست راستہ واضح ہو۔", "consultHowH2": "مشاورت میں کیا ہوگا", "consultHow1": "ماہر کے ساتھ نجی گفتگو", "consultHow2": "کلینیکل جائزہ اور تشخیص", "consultHow3": "اگلے اقدامات کی واضح رہنمائی", "consultHow4": "بغیر دباؤ، بغیر پابندی", "consultCTA": "مشاورت کی درخواست", "servicesH1": "ذہنی صحت کی خدمات", "servicesLead": "ASPI میں ہر خدمت کلینیکل معیار، مکمل رازداری اور احترام کے ساتھ فراہم کی جاتی ہے۔", "servicesCard1T": "کلینیکل سائیکاٹری", "servicesCard1P": "تشخیص، ادویات اور منظم فالو اَپ۔", "servicesCard2T": "تھراپی و کاؤنسلنگ", "servicesCard2P": "شواہد پر مبنی تھراپی اور معاونت۔", "servicesCard3T": "لت/نشے کا علاج", "servicesCard3P": "نفسیاتی نگرانی میں کلینیکل علاج۔", "servicesCard4T": "ان/آؤٹ پیشنٹ کیئر", "servicesCard4P": "ضرورت کے مطابق کلینیکل نگرانی۔", "conditionsH1": "کلینیکل مسائل جن کا علاج کیا جاتا ہے", "conditionsLead": "ASPI میں مختلف ذہنی صحت کے کلینیکل مسائل کیلئے منظم نفسیاتی و نفسیاتی علاج فراہم کیا جاتا ہے۔", "conditionsNote": "اگر علامات واضح نہیں تو رازدارانہ مشاورت سے آغاز کریں۔", "specialistsH1": "ہمارے ماہرین", "specialistsLead": "ایک ملٹی ڈسپلنری ٹیم جو رازداری اور کلینیکل معیار کے ساتھ علاج فراہم کرتی ہے۔", "specialistsPsyT": "کنسلٹنٹ سائیکاٹرسٹ", "specialistsPsyP": "تشخیص، ادویات اور کلینیکل نگرانی۔", "specialistsPsycT": "کلینیکل سائیکالوجسٹ", "specialistsPsycP": "نفسیاتی تشخیص اور شواہد پر مبنی تھراپی۔", "specialistsTherT": "تھراپسٹ و کاؤنسلرز", "specialistsTherP": "منظم معاونت اور coping حکمتِ عملیاں۔", "facilitiesH1": "کلینیکل ماحول اور سہولیات", "facilitiesLead": "ان/آؤٹ پیشنٹ نفسیاتی علاج ایک رازدارانہ کلینیکل ماحول میں فراہم کیا جاتا ہے۔", "facilitiesOutT": "آؤٹ پیشنٹ خدمات", "facilitiesOutP": "مشاورت، تھراپی، اور فالو اَپ۔", "facilitiesInT": "رازدارانہ ان پیشنٹ کیئر", "facilitiesInP": "کلینیکل اسٹیبلائزیشن، مانیٹرنگ اور نگرانی کیلئے۔", "facilitiesPrivT": "رازداری اور احترام", "facilitiesPrivP": "خفیہ داخلہ، discreet پروسیس، اور اخلاقی معیار۔", "inpatientH1": "رازدارانہ ان پیشنٹ نفسیاتی کیئر", "inpatientLead": "جن افراد کو ساختہ نگرانی اور اسٹیبلائزیشن کی ضرورت ہو، ان کیلئے نجی ان پیشنٹ کلینیکل ماحول دستیاب ہے۔", "inpatientBul1": "کلینیکل اسٹیبلائزیشن اور مانیٹرنگ", "inpatientBul2": "منظم روٹین اور نگرانی", "inpatientBul3": "نفسیاتی و نفسیاتی معاونت", "inpatientBul4": "احترام کے ساتھ، discreet کیئر", "addictionH1": "لت/نشے کیلئے نفسیاتی کلینیکل علاج", "addictionLead": "لت ایک طبی/کلینیکل کیفیت ہے جس کیلئے منظم تشخیص اور نگرانی میں علاج کی ضرورت ہوتی ہے — مکمل رازداری کے ساتھ۔", "addictionH2": "نفسیاتی نگرانی میں علاج", "addictionBul1": "کلینیکل جائزہ اور پلان", "addictionBul2": "ضرورت ہو تو اسٹیبلائزیشن", "addictionBul3": "تھراپی اور رویّوں کی مداخلت", "addictionBul4": "ریلیپس پریوینشن پروٹوکولز", "addictionPriv": "تمام مراحل میں رازداری اور اخلاقی معیار کا خیال رکھا جاتا ہے۔", "aboutH1": "ASPI کے بارے میں", "aboutLead": "ال سید سائیکیٹرک انسٹیٹیوٹ ایک پریمیئم نجی ذہنی صحت مرکز ہے جہاں مرد و خواتین کیلئے نفسیاتی، نفسیاتی، ان پیشنٹ اور لت کے علاج کی خدمات موجود ہیں۔", "aboutP1": "ہمارا طریقۂ علاج کلینیکل بنیادوں اور شواہد پر مبنی ہے، جس میں احترام، رازداری اور مریض کی حفاظت کو اولین ترجیح دی جاتی ہے۔", "aboutP2": "ہم اعتماد، discreet کیئر اور منظم پلاننگ کے ذریعے علاج کا آغاز نجی مشاورت سے کرتے ہیں۔", "contactH1": "رابطہ", "contactLead": "اپائنٹمنٹ فی الحال فون کے ذریعے کی جاتی ہے۔ تمام رابطہ مکمل رازداری کے ساتھ۔", "contactPhone": "فون", "contactEmail": "ای میل", "contactAddress": "پتہ", "contactMap": "گوگل میپس پر لوکیشن", "footerNote": "© ASPI • رازدارانہ، کلینیکل معیار پر مبنی ذہنی صحت کیئر۔"}};

  function applyI18n(lang){
    const dict = I18N[lang] || I18N.en;
    $$("[data-i18n]").forEach(el=>{
      const key=el.getAttribute("data-i18n");
      if(key && dict[key]) el.textContent = dict[key];
    });
  }

  function setLang(lang){
    const chosen = (lang==="ur")?"ur":"en";
    localStorage.setItem("aspi_lang", chosen);
    document.body.classList.toggle("ur", chosen==="ur");
    document.documentElement.setAttribute("lang", chosen);
    document.documentElement.setAttribute("dir", chosen==="ur"?"rtl":"ltr");
    const en=$("#langEN"), ur=$("#langUR");
    if(en&&ur){
      en.classList.toggle("is-active", chosen==="en");
      ur.classList.toggle("is-active", chosen==="ur");
    }
    applyI18n(chosen);
  }

  function initLang(){
    const saved = localStorage.getItem("aspi_lang") || "en";
    setLang(saved);
    const en=$("#langEN"), ur=$("#langUR");
    if(en) en.addEventListener("click", ()=>setLang("en"));
    if(ur) ur.addEventListener("click", ()=>setLang("ur"));
  }

  function initReveal(){
    const els=$$(".reveal");
    if(!els.length) return;
    if(reduced() || !("IntersectionObserver" in window)){
      els.forEach(el=>el.classList.add("is-in")); return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, {threshold:0.12});
    els.forEach(el=>io.observe(el));
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    setActiveLinks();
    initMobileMenu();
    initLang();
    initReveal();
  });

  window.ASPI = window.ASPI || {};
  window.ASPI.setLang = setLang;
})();