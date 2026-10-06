const btns = document.querySelectorAll(".btn");
const int = document.getElementById("int");
const txt = document.getElementById("txt");
let valeur = parseInt(int.value);

btns.forEach((btn)=> {
    btn.addEventListener("click",()=>{
        if(btn.id === "more")
        {
            if(valeur<48)
            {
                valeur++;
                int.value = valeur;
                txt.style.fontSize = valeur+"px";
            }
            else
            {
                valeur = 16;
                int.value = valeur;
                txt.style.fontSize = valeur+"px";
            }
        }
        else
        {
            if(valeur>8)
            {
                valeur--;
                int.value = valeur;
                txt.style.fontSize = valeur+"px";
            }
            else
            {
                valeur = 16;
                int.value = valeur;
                txt.style.fontSize = valeur+"px";
            }
        }
    })
})

int.addEventListener("blur",()=>{
    valeur = parseInt(int.value);
    if (isNaN(valeur)) valeur = 16;
    if (valeur < 8)  valeur = 16;
    if (valeur > 48) valeur = 16;
    int.value = valeur;
    txt.style.fontSize = valeur+"px";
})
