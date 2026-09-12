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
