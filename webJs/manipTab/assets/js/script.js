

const people = ["Mike Dev", "John Makenzie", "Léa Grande"];
const table = document.getElementById("tab");
const tab = people.map((e)=>e.split(" "));
const infos = [];
const liste = document.querySelector(".liste");
let i = 0;
let x=1;

function initListe(people)
{
    people.forEach((e)=>{
        let li = document.createElement("li");
        li.textContent = e;
        li.classList.add(`ligne${x}`);
        liste.appendChild(li);
        x++;
    })
}
initListe(people);
// ajout  dans la liste
function ajoutListe(nom, prenom)
{
    
    let li = document.createElement("li")
    li.textContent = prenom + " " + nom;
    li.classList.add(`ligne${x}`);
    liste.appendChild(li);
}
//          Simon cool
// const arr = people.map((e)=>{
//     const p = e.split(" ")[0];
//     const n = e.split(" ")[1];
//     return [n, p, p+"."+n+"@example.com"];
// })

// console.table(arr);

//          ma version pour cree la tab infos
for(i = 0; i<tab.length;i++)
{
    let nomT=tab[i][1];
    let prenomT=tab[i][0];
    infos.push({nom : nomT,prenom : prenomT,email:prenomT+"."+nomT+"@example.com"});
}

// Remplissage entête tableaux
function fillTableHead()
{
    table.classList.add("tabstyle");
    const tabHead = document.getElementById("tabHead")

    for(const key in infos[0])
    {
        let th = document.createElement('th');
        th.scope ="col";
        th.textContent = key == 'prenom' ? 'prénom' : key;
        tabHead.appendChild(th);
    }
    let th =document.createElement('th');
    th.scope ="col";
    th.textContent = "supprimer";
    tabHead.appendChild(th);
}

// Remplissage valeur tableaux
function fillTableBody()
{
    const tabBody = document.getElementById("tabBody");

    i=1;
    for(const e of infos)
    { 
        let tr = document.createElement('tr');
        tr.id = `ligne${i}`;
        tabBody.appendChild(tr);

        for(const value in e )
        {
            let td = document.createElement('td');
            td.textContent = e[value];
            if(value == "email")
            {
                td.classList.add("email");
            }
            tr.appendChild(td);
        }
        let td = document.createElement('td');
        tr.appendChild(td);
        let btn = document.createElement('button');
        btn.id = `btnligne${i}`;
        btn.classList.add("btn");
        btn.textContent = "X";
        td.appendChild(btn);
        i++;
    }
}
fillTableHead();
fillTableBody();
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) =>{
    listenerBtn(btn);
})
// Supprimer une personne
function listenerBtn(btn)
{
    btn.addEventListener("click",()=>{
        document.getElementById(btn.id.slice(3)).remove();
        document.querySelector("."+btn.id.slice(3)).remove();

    });
}
function verifexist(nomA,prenomA)
{
    for (const element of infos) 
    {
        if(element.nom == nomA && element.prenom == prenomA)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}
const ajout = document.getElementById("ajout");


// ajout d'une personne
ajout.addEventListener("click",()=>{
    const nomN = document.getElementById("nom").value.trim();
    const prenomN = document.getElementById("prenom").value.trim();
    const prenom =  prenomN[0].toUpperCase() + prenomN.slice(1).toLowerCase();
    const nom = nomN[0].toUpperCase() + nomN.slice(1).toLowerCase();

    if(verifexist(nom,prenom))
    {
        let tr = document.createElement("tr");
        infos.push({nom : nom,prenom : prenom,email:prenom+"."+nom+"@example.com"});
        tr.id = `ligne${i}`
        tabBody.appendChild(tr);
        for(let x = 0; x<4;x++)
        {
            let td = document.createElement("td")
            switch(x)
            {
                case 0:
                    td.textContent=`${nom}`;
                    td.style.textTransform = "capitalize";
                    tr.appendChild(td);
                    break;
                case 1:
                    td.textContent=`${prenom}`;
                    td.style.textTransform = "capitalize";
                    tr.appendChild(td);
                    break;
                case 2:
                    td.textContent=`${prenom}.${nom}@example.com`;
                    td.classList.add("email");
                    tr.appendChild(td);
                    break;
                case 3:
                    tr.appendChild(td);
                    let btn = document.createElement("button");
                    btn.id = `btnligne${i}`;
                    btn.classList.add("btn");
                    btn.textContent = "X";
                    td.appendChild(btn);
                    listenerBtn(btn);
                    break;
            }

        }
        i++;
        ajoutListe(nom,prenom);
    }

})

