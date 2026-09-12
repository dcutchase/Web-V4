const film = document.querySelector("#film");
const reel = document.querySelector("#reel");
const cats = window.DCUT.categories;

function emptyFrame(){
  const row=document.createElement("div"); row.className="frame-row";
  const f=document.createElement("div"); f.className="frame empty"; row.appendChild(f);
  return row;
}
function categoryFrame(cat,index){
  const row=document.createElement("div"); row.className="frame-row category-row";
  const f=document.createElement("div"); f.className="frame category";
  if(cat.image){
    const t=document.createElement("div"); t.className="thumb"; t.style.backgroundImage=`url("${cat.image}")`; f.appendChild(t);
  } else {
    const t=document.createElement("div"); t.className="thumb-placeholder"; t.textContent="DROP MEDIA HERE"; f.appendChild(t);
  }
  const l=document.createElement("div"); l.className=`label ${index%2===0?"left":"right"}`;
  const h=document.createElement("h2"); h.textContent=cat.name;
  const line=document.createElement("span"); line.className="line";
  const p=document.createElement("p"); p.innerHTML=cat.detail.replaceAll("\n","<br>");
  l.append(h,line,p); row.append(f,l); return row;
}
cats.forEach((cat,i)=>{
  film.append(emptyFrame(),emptyFrame(),categoryFrame(cat,i));
});
film.append(emptyFrame(),emptyFrame());

const labels=[...document.querySelectorAll(".label")];
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>e.target.querySelector(".label")?.classList.toggle("visible",e.isIntersecting));
},{threshold:.55});
document.querySelectorAll(".category-row").forEach(el=>obs.observe(el));

let ticking=false;
addEventListener("scroll",()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      reel.style.transform=`rotate(${scrollY*.12}deg)`;
      ticking=false;
    });
    ticking=true;
  }
},{passive:true});
