(function(){
  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting) e.target.classList.add("show");
    }
  }, { threshold: 0.14 });
  revealEls.forEach(el => io.observe(el));

  // Float elements
  const floatEls = document.querySelectorAll("[data-float]");
  floatEls.forEach((el)=>{
    const amp = Number(el.getAttribute("data-float-amp") || 14);
    const dur = Number(el.getAttribute("data-float-dur") || 7200);
    const delay = Number(el.getAttribute("data-float-delay") || 0);

    el.animate(
      [{ transform:"translateY(0px)" },
       { transform:`translateY(-${amp}px)` },
       { transform:"translateY(0px)" }],
      { duration: dur, iterations: Infinity, easing:"ease-in-out", delay }
    );
  });

  // Soft internal page transitions
  document.addEventListener("click", (e)=>{
    const a = e.target.closest("a");
    if(!a) return;
    const href = a.getAttribute("href") || "";
    const internal = href.endsWith(".html") && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:");
    if(!internal) return;

    e.preventDefault();
    document.body.style.transition = "opacity .22s ease";
    document.body.style.opacity = "0";
    setTimeout(()=>{ window.location.href = href; }, 220);
  });

  window.addEventListener("pageshow", ()=>{
    document.body.style.opacity = "1";
  });
})();
