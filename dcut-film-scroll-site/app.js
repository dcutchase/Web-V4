const film = document.querySelector("#film");
const filmReveal = document.querySelector("#filmReveal");
const reelSprite = document.querySelector("#reelSprite");
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

  const frame=document.createElement("div");
  frame.className="frame category";

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
  reelSprite.style.transform =
    `translateY(${Math.min(5,reveal*.002)}px) rotate(${reveal*.045}deg)`;

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
