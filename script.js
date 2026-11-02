/* CONTACT SETTINGS: replace placeholders. Use an international WhatsApp
   number with digits only, e.g. country code + number, without "+" or spaces.
   Social URLs stay null until you add your own profiles. */
const contact = {
  email: "[your Gmail]", phone: "[number]", whatsapp: "",
  location: "[city, Nigeria]",
  socials: { Instagram: null, Behance: null, LinkedIn: null }
};
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
document.documentElement.classList.add("js");
const esc = value => String(value).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const emailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
const phoneDigits = contact.phone.replace(/\D/g, "");
const contactLinks = () => `
  ${emailReady ? `<a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>` : "<span>[your Gmail] — add your email</span>"}
  ${phoneDigits ? `<a href="tel:+${phoneDigits}">${esc(contact.phone)}</a>` : "<span>[number] — add your phone</span>"}
  ${/^\d{8,15}$/.test(contact.whatsapp) ? `<a href="https://wa.me/${contact.whatsapp}">Chat on WhatsApp ↗</a>` : "<span>[WhatsApp number] — add your number</span>"}
  <span>${esc(contact.location)}</span>
  ${Object.entries(contact.socials).map(([name, url]) =>
    url && /^https:\/\//.test(url) ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name} ↗</a>` : `<span>${name} [add profile URL]</span>`).join("")}`;

/* Shared header. Navigation works normally with device/browser Back. */
const navItems = [["index.html","Home"],["about.html","About"],["portfolio.html","Portfolio"],["contact.html","Contact"]];
const current = location.pathname.split("/").pop() || "index.html";
document.getElementById("site-header").innerHTML = `
  <div class="container header-inner">
    <!-- Replace text with your logo image here. -->
    <a class="logo" href="index.html" aria-label="DECENTRIX home">DECENTRIX<span>®</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu ☰</button>
    <nav class="nav" id="main-nav" aria-label="Main navigation">
      ${navItems.map(([url,label]) => `<a href="${url}"${current === url || (current === "project.html" && url === "portfolio.html") ? ' aria-current="' + (current === "project.html" ? "location" : "page") + '"' : ""}>${label}</a>`).join("")}
    </nav>
  </div>`;
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
function closeMenu(){nav.classList.remove("is-open");menuButton.setAttribute("aria-expanded","false");}
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", event => {
  if(event.key === "Escape" && nav.classList.contains("is-open")){closeMenu();menuButton.focus();}
});
document.addEventListener("click", event => {if(!event.target.closest(".site-header")) closeMenu();});

/* ===== PLACEHOLDER TESTIMONIALS: REPLACE OR DELETE THIS ARRAY =====
   These are demonstration quotes, not verified customer endorsements.
   Delete all entries to remove the testimonial section entirely.
   Edit name, role and quote together when adding approved real feedback. */
const testimonials = [
  {name:"[Client name 01]",role:"[Role / Company]",quote:"[Placeholder] Add an approved client quote about the clarity of their brand identity."},
  {name:"[Client name 02]",role:"[Role / Company]",quote:"[Placeholder] Add an approved client quote about your design process and collaboration."},
  {name:"[Client name 03]",role:"[Role / Company]",quote:"[Placeholder] Add an approved client quote about the completed project and its impact."}
];
/* ===== END PLACEHOLDER TESTIMONIALS ===== */
document.getElementById("site-footer").innerHTML = `
  ${testimonials.length ? `<section class="testimonials" aria-label="Client testimonials">
    <div class="container" id="testimonial-slider">
      <div class="testimonial-top"><div><p class="eyebrow">Client perspectives</p><h2>A few words from the other side.</h2></div><p class="image-note">Placeholder testimonials</p></div>
      <div class="slider-window"><div class="slider-track">
        ${[...testimonials, testimonials[0]].map((t,i) => `<figure class="testimonial" aria-hidden="${i !== 0}"><blockquote>${esc(t.quote)}</blockquote><figcaption>${esc(t.name)} · ${esc(t.role)}</figcaption></figure>`).join("")}
      </div></div>
      <div class="slider-controls">
        ${testimonials.map((_,i) => `<button class="dot" type="button" aria-label="Show testimonial ${i+1}" aria-pressed="${i === 0}" data-slide="${i}"></button>`).join("")}
        <button type="button" class="pause">Pause autoplay</button>
      </div>
    </div></section>` : ""}
  <footer><div class="container"><div class="footer-grid">
    <div><a class="logo" href="index.html">DECENTRIX<span>®</span></a><p class="footer-note">Clear ideas. Confident identities.<br>Brand & graphic design, Nigeria.</p></div>
    <div><h3>Start a conversation</h3><div class="contact-links">${contactLinks()}</div></div>
    <div><h3>Explore</h3><ul>${navItems.map(([url,label]) => `<li><a href="${url}">${label}</a></li>`).join("")}</ul></div>
  </div><div class="footer-bottom">© 2026 DECENTRIX. All rights reserved.</div></div></footer>`;
document.querySelectorAll("[data-contact-links]").forEach(el => el.innerHTML = contactLinks());

function card(project) {
  return `<a class="project-card" data-project-card href="project.html?id=${encodeURIComponent(project.id)}">
    <div class="project-media"><img src="${esc(project.mainImage)}" alt="${esc(project.mainAlt)}" width="1600" height="1100" loading="lazy" decoding="async"></div>
    <h3>${esc(project.name)}</h3><p>${esc(project.category)} <span aria-hidden="true">↗</span></p></a>`;
}
document.querySelectorAll("[data-project-grid]").forEach(grid => {
  const count = Number(grid.dataset.projectGrid) || projects.length;
  grid.innerHTML = projects.slice(0,count).map(card).join("");
});
const projectRoot = document.getElementById("project-content");
if(projectRoot){
  const id = new URLSearchParams(location.search).get("id");
  const index = projects.findIndex(project => project.id === id);
  if(index < 0){
    document.title = "Project not found | DECENTRIX";
    projectRoot.innerHTML = '<p class="eyebrow">Project unavailable</p><h1>Let’s get you back to the work.</h1><p>This project link is missing or no longer available.</p><a class="button" href="portfolio.html">Back to Portfolio</a>';
  } else {
    const project = projects[index];
    document.title = project.name + " | DECENTRIX";
    document.querySelector('meta[name="description"]').content = project.name + " — " + project.category + " project by DECENTRIX.";
    const previous = projects[(index-1+projects.length)%projects.length];
    const next = projects[(index+1)%projects.length];
    projectRoot.innerHTML = `
      <a href="portfolio.html">← All projects</a>
      <p class="eyebrow" style="margin-top:32px">${esc(project.category)} / ${esc(project.year)}</p>
      <h1>${esc(project.name)}</h1>
      <img class="project-main" src="${esc(project.mainImage)}" alt="${esc(project.mainAlt)}" width="1600" height="1100" fetchpriority="high">
      <div class="project-details">
        <div><h2>Behind the design.</h2><dl class="project-meta">${[["Project",project.name],["Client",project.client],["Category",project.category],["Year",project.year]].map(([label,value]) => `<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl></div>
        <div>${Object.entries(project.description).map(([label,value]) => `<h3>${label[0].toUpperCase()+label.slice(1)}</h3><p>${esc(value)}</p>`).join("")}</div>
      </div>
      <div class="gallery" aria-label="Project gallery">${project.galleryImages.map((image,i) => `<button type="button" data-gallery-index="${i}" aria-label="Enlarge: ${esc(image.alt)}"><img src="${esc(image.src)}" alt="${esc(image.alt)}" width="1600" height="1100" loading="lazy"></button>`).join("")}</div>
      <nav class="project-nav" aria-label="Project navigation"><a class="button secondary" href="project.html?id=${encodeURIComponent(previous.id)}">← Previous project</a><a class="button" href="portfolio.html">Back to Portfolio</a><a class="button secondary" href="project.html?id=${encodeURIComponent(next.id)}">Next project →</a></nav>`;
    const dialog = document.getElementById("lightbox");
    let opener;
    projectRoot.querySelectorAll("[data-gallery-index]").forEach(button => button.addEventListener("click", () => {
      const image = project.galleryImages[Number(button.dataset.galleryIndex)];
      opener = button;
      dialog.querySelector("img").src = image.src;
      dialog.querySelector("img").alt = image.alt;
      dialog.querySelector(".lightbox-caption").textContent = image.alt;
      dialog.showModal();
    }));
    dialog.querySelector(".lightbox-close").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",event=>{if(event.target === dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener("close",()=>opener?.focus());
  }
}
/* Preserve modifier-clicks, new-tab behavior and normal browser history. */
document.addEventListener("click", event => {
  const link = event.target.closest("[data-project-card]");
  if(!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || reducedMotion.matches) return;
  event.preventDefault();link.classList.add("leaving");
  setTimeout(()=>location.assign(link.href),180);
});
window.addEventListener("pageshow",()=>document.querySelectorAll(".leaving").forEach(el=>el.classList.remove("leaving")));

/* Continuous side-sliding loop: a cloned first slide avoids a reverse jump. */
if(testimonials.length){
  const slider = document.getElementById("testimonial-slider");
  const track = slider.querySelector(".slider-track");
  const slides = [...track.children];
  const dots = [...slider.querySelectorAll(".dot")];
  const pause = slider.querySelector(".pause");
  let index=0, timer, userPaused=false, hovered=false, focused=false;
  function update(){
    track.style.transform=`translateX(-${index*100}%)`;
    const active=index%testimonials.length;
    slides.forEach((slide,i)=>slide.setAttribute("aria-hidden",String(i!==index)));
    dots.forEach((dot,i)=>dot.setAttribute("aria-pressed",String(i===active)));
  }
  function schedule(){
    clearInterval(timer);
    if(!userPaused && !hovered && !focused && !document.hidden && !reducedMotion.matches && testimonials.length>1){
      timer=setInterval(()=>{index++;update();},5000);
    }
    pause.textContent=userPaused || reducedMotion.matches ? "Play autoplay" : "Pause autoplay";
    pause.disabled=reducedMotion.matches;
  }
  track.addEventListener("transitionend",event=>{
    if(event.propertyName==="transform" && index===testimonials.length){
      track.style.transition="none";index=0;update();
      void track.offsetWidth;track.style.transition="";
    }
  });
  dots.forEach((dot,i)=>dot.addEventListener("click",()=>{index=i;update();schedule();}));
  pause.addEventListener("click",()=>{userPaused=!userPaused;schedule();});
  slider.addEventListener("mouseenter",()=>{hovered=true;schedule();});
  slider.addEventListener("mouseleave",()=>{hovered=false;schedule();});
  slider.addEventListener("focusin",()=>{focused=true;schedule();});
  slider.addEventListener("focusout",()=>setTimeout(()=>{focused=slider.contains(document.activeElement);schedule();},0));
  document.addEventListener("visibilitychange",schedule);
  reducedMotion.addEventListener("change",()=>{index%=testimonials.length;update();schedule();});
  schedule();
}

/* Reveal only when supported; content remains visible without JS. */
if("IntersectionObserver" in window && !reducedMotion.matches){
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));
}

/* Formspree: native HTML validation + AJAX success/error handling.
   A successful message appears ONLY after Formspree accepts the request. */
const form = document.getElementById("contact-form");
if(form){
  const status=document.getElementById("form-status");
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    if(form.elements._gotcha.value)return;
    if(form.getAttribute("action").includes("[MY_FORM_ID]")){
      status.textContent="This form is not connected yet. Please add your Formspree form ID before sending.";
      return;
    }
    const button=form.querySelector('button[type="submit"]');
    button.disabled=true;button.textContent="Sending…";
    status.textContent="";
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"},signal:controller.signal});
      if(!response.ok)throw new Error("Send failed");
      form.reset();
      status.textContent="Thank you! Your message has been sent. DECENTRIX will get back to you soon.";
    }catch(error){
      status.textContent="Your message could not be confirmed. Please try again or contact us directly using the details beside this form.";
    }finally{
      clearTimeout(timeout);button.disabled=false;button.textContent="Send message ↗";
    }
  });
}
