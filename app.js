const film = document.querySelector("#film");
const filmReveal = document.querySelector("#filmReveal");
const scrollTrack = document.querySelector("#scrollTrack");

function blankFrame(){
  const row=document.createElement("div");
  row.className="frame-row";
  const frame=document.createElement("div");
  frame.className="frame blank";
  row.appendChild(frame);
  return row;
}

function categoryFrame(cat,index){
  const row=document.createElement("div");
  row.className="frame-row category-row";

  const isLinkedCategory = cat.id === "film" || cat.id === "archive";
  const frame=document.createElement(isLinkedCategory ? "a" : "div");
  frame.className="frame category";

  if (cat.id === "film") {
    frame.href = "/film/";
    frame.setAttribute("aria-label", "Open Film category");
  }

  if (cat.id === "archive") {
    frame.href = "/archive";
    frame.setAttribute("aria-label", "Open Archive category");
  }

  const media=document.createElement("div");
  media.className="media";
  if(cat.image){
    media.style.backgroundImage=`url("${cat.image}")`;
  }else{
    media.classList.add("placeholder");
  }
  frame.appendChild(media);

  const label=document.createElement("div");
  label.className=`label ${index%2===0?"left":"right"}`;

  const h=document.createElement("h2");
  h.textContent=cat.title;

  const connector=document.createElement("span");
  connector.className="connector";

  const p=document.createElement("p");
  p.innerHTML=cat.lines.join("<br>");

  label.append(h,connector,p);
  row.append(frame,label);
  return row;
}

// The concept: a category thumbnail every third film frame.
film.append(blankFrame(),blankFrame());
window.DCUT.categories.forEach((cat,index)=>{
  film.append(categoryFrame(cat,index));
  if(index<window.DCUT.categories.length-1){
    film.append(blankFrame(),blankFrame());
  }
});
film.append(blankFrame(),blankFrame());

const categoryRows=[...document.querySelectorAll(".category-row")];

function layout(){
  const filmHeight=film.scrollHeight;
  // enough document height to unspool the full strip
  scrollTrack.style.height=`${filmHeight + window.innerHeight*.72}px`;
}

function update(){
  const filmTop =
    filmReveal.getBoundingClientRect().top + window.scrollY;

  // Start only once the viewport has passed the reel.
  // This gives the feeling that the strip is physically coming out.
  const revealHead = window.scrollY + window.innerHeight * .64;
  const reveal = Math.max(
    0,
    Math.min(film.scrollHeight, revealHead - filmTop)
  );

  filmReveal.style.height = `${reveal}px`;

  // Subtle reel movement tied directly to released film.

  // Only show label once that category frame has actually emerged.
  categoryRows.forEach(row=>{
    const rowBottom=row.offsetTop + row.offsetHeight*.78;
    const rect=row.getBoundingClientRect();
    const nearViewport=rect.top<window.innerHeight*.82 && rect.bottom>window.innerHeight*.16;
    row.querySelector(".label").classList.toggle(
      "visible",
      reveal>rowBottom && nearViewport
    );
  });
}

let raf=false;
function requestUpdate(){
  if(raf)return;
  raf=true;
  requestAnimationFrame(()=>{
    update();
    raf=false;
  });
}

window.addEventListener("scroll",requestUpdate,{passive:true});
window.addEventListener("resize",()=>{
  layout();
  update();
});

layout();
update();


/* =========================
   V6 INTERACTIONS
   ========================= */
const pixelCursor = document.querySelector("#pixelCursor");
const hoverFrames = [...document.querySelectorAll(".frame.category")];

const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)");

if (finePointer.matches && pixelCursor) {
  let mouseX = -100;
  let mouseY = -100;
  let cursorRAF = null;

  function drawCursor() {
    pixelCursor.style.transform =
      `translate(${mouseX - 9}px, ${mouseY - 9}px)`;
    cursorRAF = null;
  }

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    pixelCursor.classList.add("visible");

    if (!cursorRAF) {
      cursorRAF = requestAnimationFrame(drawCursor);
    }
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    pixelCursor.classList.remove("visible");
  });

  document.addEventListener("mouseenter", () => {
    pixelCursor.classList.add("visible");
  });

  hoverFrames.forEach((frame) => {
    const row = frame.closest(".category-row");

    frame.addEventListener("mouseenter", () => {
      pixelCursor.classList.add("hovering");
      frame.classList.add("is-hovered");
      row?.classList.add("hovered");
      document.body.classList.add("frame-hover");
    });

    frame.addEventListener("mouseleave", () => {
      pixelCursor.classList.remove("hovering");
      frame.classList.remove("is-hovered");
      row?.classList.remove("hovered");
      document.body.classList.remove("frame-hover");
    });
  });
}


/* =========================
   V7 SOCIAL HUB INTERACTION
   ========================= */
const socialCards = [...document.querySelectorAll(".social-card")];

if (typeof finePointer !== "undefined" && finePointer.matches && pixelCursor) {
  socialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      pixelCursor.classList.add("hovering");
    });

    card.addEventListener("mouseleave", () => {
      pixelCursor.classList.remove("hovering");
    });
  });
}


/* =========================
   V8 CONTACT FORM
   ========================= */
const contactForm = document.querySelector("#contactForm");
const contactSubmit = document.querySelector("#contactSubmit");
const contactState = document.querySelector("#contactState");
const contactStateText = contactState?.querySelector(".contact-state-text");
const contactControls = [
  ...document.querySelectorAll(".contact-submit")
];

if (typeof finePointer !== "undefined" && finePointer.matches && pixelCursor) {
  contactControls.forEach((control) => {
    control.addEventListener("mouseenter", () => {
      pixelCursor.classList.add("hovering");
    });
    control.addEventListener("mouseleave", () => {
      pixelCursor.classList.remove("hovering");
    });
  });
}

function setContactState(state, text) {
  contactForm?.classList.remove("is-sending", "is-success", "is-error");
  if (state) contactForm?.classList.add(`is-${state}`);
  if (contactStateText) contactStateText.textContent = text;
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    setContactState("sending", "TRANSMITTING");
    contactSubmit.disabled = true;

    const formData = new FormData(contactForm);
    formData.append("_url", window.location.href);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/chasefilms@icloud.com",
        {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === "false" || result.success === false) {
        throw new Error(result.message || "Submission failed");
      }

      contactForm.reset();
      setContactState("success", "MESSAGE SENT");
      contactForm.dispatchEvent(new CustomEvent("dcut:submission-success"));
    } catch (error) {
      console.error("Contact form error:", error);
      setContactState("error", "SEND FAILED — TRY AGAIN");
    } finally {
      contactSubmit.disabled = false;
    }
  });
}

/* If a normal FormSubmit fallback redirect ever returns with ?sent=1 */
const sentParams = new URLSearchParams(window.location.search);
if (sentParams.get("sent") === "1" && contactForm) {
  setContactState("success", "MESSAGE SENT");
}


/* =========================
   V9: 24-HOUR CLIENT-SIDE LOCKDOWN
   ========================= */

const CONTACT_LOCK_KEY = "dcut_contact_last_success_v1";
const CONTACT_LOCK_DURATION = 24 * 60 * 60 * 1000;

const contactLock = document.querySelector("#contactLock");
const contactShell = document.querySelector(".contact-shell");
const lockCountdown = document.querySelector("#lockCountdown");

let lockTimer = null;

function getLockTimestamp() {
  const raw = localStorage.getItem(CONTACT_LOCK_KEY);
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function getRemainingLockTime() {
  const lastSuccess = getLockTimestamp();
  if (!lastSuccess) return 0;

  return Math.max(
    0,
    CONTACT_LOCK_DURATION - (Date.now() - lastSuccess)
  );
}

function formatLockTime(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map(value => String(value).padStart(2, "0"))
    .join(":");
}

function showContactLock() {
  if (!contactForm || !contactLock) return;

  contactForm.hidden = true;
  contactLock.hidden = false;
  contactShell?.classList.add("is-locked");

  updateLockCountdown();

  clearInterval(lockTimer);
  lockTimer = setInterval(updateLockCountdown, 1000);
}

function hideContactLock() {
  if (!contactForm || !contactLock) return;

  contactForm.hidden = false;
  contactLock.hidden = true;
  contactShell?.classList.remove("is-locked");

  clearInterval(lockTimer);
  lockTimer = null;

  setContactState("", "LINE READY");
}

function updateLockCountdown() {
  const remaining = getRemainingLockTime();

  if (remaining <= 0) {
    localStorage.removeItem(CONTACT_LOCK_KEY);
    hideContactLock();
    return;
  }

  if (lockCountdown) {
    lockCountdown.textContent = formatLockTime(remaining);
  }
}

function startContactLockdown() {
  localStorage.setItem(CONTACT_LOCK_KEY, String(Date.now()));
  showContactLock();
}

// Apply persisted lock immediately on page load.
if (getRemainingLockTime() > 0) {
  showContactLock();
}

// Hook the successful V8 submission without changing FormSubmit itself.
if (contactForm) {
  contactForm.addEventListener("dcut:submission-success", startContactLockdown);
}


/* =========================
   V10: SUBTLE DUST FIELD
   ========================= */

const dustField = document.querySelector("#dustField");

// Keep the particle count intentionally low so the site stays readable.
if (dustField && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const dustCount = window.innerWidth < 720 ? 11 : 18;

  for (let i = 0; i < dustCount; i++) {
    const particle = document.createElement("i");
    particle.className = "dust-particle";

    if (i % 6 === 0) {
      particle.classList.add("big");
    }

    const size = i % 6 === 0 ? 2.5 : (1 + Math.random() * 1.2);
    const opacity = 0.08 + Math.random() * 0.12;
    const drift = -30 + Math.random() * 60;
    const duration = 14 + Math.random() * 16;
    const delay = -(Math.random() * duration);
    const left = 3 + Math.random() * 94;

    particle.style.left = `${left}%`;
    particle.style.setProperty("--dust-size", `${size}px`);
    particle.style.setProperty("--dust-opacity", opacity.toFixed(3));
    particle.style.setProperty("--dust-drift", `${drift.toFixed(1)}px`);
    particle.style.setProperty("--dust-duration", `${duration.toFixed(1)}s`);
    particle.style.setProperty("--dust-delay", `${delay.toFixed(1)}s`);

    dustField.appendChild(particle);
  }
}



/* =========================
   V16: CLEAN STATIC REEL
   =========================
   Reel is intentionally static. No reel transform logic.
*/
