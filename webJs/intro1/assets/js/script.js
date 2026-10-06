const btn = document.getElementById("ajout");
const score = document.getElementById("score");
let nb = 0;
btn.addEventListener("click",()=>{
    nb++;
    score.textContent = nb;
})