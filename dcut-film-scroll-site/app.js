const film = document.querySelector("#film");
const filmMask = document.querySelector("#filmMask");
const reel = document.querySelector("#reel");
const reelZone = document.querySelector(".reel-zone");
const categories = window.DCUT.categories;

function blankRow() {
  const row = document.createElement("div");
  row.className = "frame-row";
  const frame = document.createElement("div");
  frame.className = "frame empty";
  row.appendChild(frame);
  return row;
}

function categoryRow(category, index) {
  const row = document.createElement("div");
  row.className = "frame-row category-row";
  row.dataset.category = category.id;

  const frame = document.createElement("button");
  frame.className = "frame category";
  frame.type = "button";
  frame.setAttribute("aria-label", category.title);

  const media = document.createElement("div");
  media.className = "media";

  if (category.image) {
    media.style.backgroundImage = `url("${category.image}")`;
  } else {
    media.classList.add("placeholder");
  }

  frame.appendChild(media);

  const label = document.createElement("div");
  label.className = `label ${index % 2 === 0 ? "left" : "right"}`;

  const heading = document.createElement("h2");
  heading.textContent = category.title;

  const connector = document.createElement("span");
  connector.className = "connector";

  const detail = document.createElement("p");
  detail.innerHTML = category.lines.join("<br>");

  label.append(heading, connector, detail);
  row.append(frame, label);

  return row;
}

// Two blank frames + one category frame = a thumbnail every third frame.
film.append(blankRow(), blankRow());
categories.forEach((category, index) => {
  film.append(categoryRow(category, index));
  if (index < categories.length - 1) {
    film.append(blankRow(), blankRow());
  }
});
film.append(blankRow(), blankRow());

const rows = [...document.querySelectorAll(".category-row")];
const labels = [...document.querySelectorAll(".label")];

function setFilmGeometry() {
  const height = film.scrollHeight;
  document.documentElement.style.setProperty("--film-height", `${height}px`);

  // Give the page real scroll distance. The film itself is revealed by a mask,
  // so the hidden part still needs layout space to scroll through.
  reelZone.style.height = `${height + Math.max(360, window.innerHeight * 0.45)}px`;
  filmMask.style.height = `${height + 20}px`;
}

function updateScene() {
  const zoneRect = reelZone.getBoundingClientRect();
  const filmTopInDocument =
    window.scrollY + zoneRect.top + parseFloat(getComputedStyle(filmMask).top);

  // Reveal begins only once the viewport reaches the reel.
  // The visible end of the strip follows the scroll downward.
  const viewportHead = window.scrollY + window.innerHeight * 0.70;
  const reveal = Math.max(
    0,
    Math.min(film.scrollHeight + 10, viewportHead - filmTopInDocument)
  );

  filmMask.style.setProperty("--reveal", `${reveal}px`);

  // Reel rotates while it naturally scrolls with the page.
  // It is NOT fixed/stuck to the top anymore.
  const progress = Math.max(0, reveal);
  reel.style.transform = `rotate(${progress * 0.19}deg)`;

  // Labels appear only after their frame has actually been "developed"
  // out of the reel and is near the middle of the viewport.
  rows.forEach((row) => {
    const rect = row.getBoundingClientRect();
    const label = row.querySelector(".label");
    const rowCenter = rect.top + rect.height / 2;
    const active =
      rect.top < window.innerHeight * 0.78 &&
      rect.bottom > window.innerHeight * 0.22 &&
      rowCenter < filmTopInDocument - window.scrollY + reveal + 12;

    label.classList.toggle("visible", active);
  });
}

let ticking = false;
function onMove() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateScene();
    ticking = false;
  });
}

window.addEventListener("scroll", onMove, { passive: true });
window.addEventListener("resize", () => {
  setFilmGeometry();
  updateScene();
});

setFilmGeometry();
updateScene();
