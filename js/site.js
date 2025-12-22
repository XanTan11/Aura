// =====================
// LOGO
// =====================
window.addEventListener("load",()=>{
  const logo=document.getElementById("auraLogo");
  if(logo)logo.classList.add("is-on");
});

// =====================
// MODAL
// =====================
const modal=document.getElementById("modal");
const mTitle=document.getElementById("mTitle");
const mRole=document.getElementById("mRole");
const mMeta=document.getElementById("mMeta");
const mExtra=document.getElementById("mExtra");
const mImg=document.getElementById("mImg");
const mImgWrap=document.getElementById("mImgWrap");

document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("click",()=>{
    mTitle.textContent=card.dataset.title;
    mRole.textContent=card.dataset.role;
    mMeta.textContent=card.dataset.meta;
    mExtra.textContent=card.dataset.extra;
    mImg.src=card.dataset.img;
    modal.classList.add("is-open");
    document.body.style.overflow="hidden";
  });
});

modal.addEventListener("click",e=>{
  if(e.target.dataset.close){
    modal.classList.remove("is-open");
    document.body.style.overflow="";
  }
});

// =====================
// REVEAL ON SCROLL
// =====================
const revealEls=document.querySelectorAll(".section,.card,.match-card,.footer");
revealEls.forEach(el=>el.classList.add("reveal"));

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("on");
      io.unobserve(e.target);
    }
  });
},{threshold:.15});

revealEls.forEach(el=>io.observe(el));