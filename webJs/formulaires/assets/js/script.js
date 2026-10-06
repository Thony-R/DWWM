const namep = document.getElementById("name");
const age = document.getElementById("age");
const ecran = document.querySelector('.info');
const txtname = document.getElementById("txtname");
const txtage = document.getElementById("txtage");
const tr = document.getElementById("tr");
const btn = document.getElementById("event");
const er = document.querySelector(".erreur");
const retraite = document.getElementById("retraite");

function verifAge(age)
{
    if(age<18) return "mineur";
    
    else
    {
        return "majeur";
    }
}
function calR(age)
{
    let annee = 0;
    if(age<64)
    {
        annee = 64 - age;
        return `Il vous reste ${annee}  année(s) avant la retraite`; 
    }
    if(age>64)
    {
        annee = age - 64;
        return `Vous êtes à la retraite depuis ${annee} année(s)`;
    }
}
btn.addEventListener("click",()=>{
    if(!namep.value.trim() || parseInt(age.value)<=0||isNaN(parseInt(age.value)))
    {
        ecran.style.display = "none";
        er.style.display = "flex";
    }
    else
    {
        tr.textContent = verifAge(parseInt(age.value));
        retraite.textContent = calR(parseInt(age.value));
        txtname.textContent = namep.value;
        txtage.textContent = parseInt(age.value);
        er.style.display = "none";
        ecran.style.display = "block";
    }
})