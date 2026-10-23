const saisieID = document.getElementById("identifiant");
const saisieMDP = document.getElementById("mdp");
const btnConnect = document.getElementById("connect");
const titre1 = document.querySelector("h1");
const header = document.querySelector("header");
const formulaire = document.querySelector(".form");
const divConnect = document.createElement("div");
header.after(divConnect);
// divConnect.appendChild(btnDeco);
divConnect.style.display = "none";

const tabTh = ["Nom", "Prénom", "Date de Naissance", "email", "Salaire"];

btnConnect.addEventListener("click", async (event) => {
    event.preventDefault();
    let tabID = String(saisieID.value).split(".");
    const users = await tabjson();
    const result = chercheUser(tabID, users);

    if (result != null && verifMdp(result)) {
        formulaire.style.display = "none";
        divConnect.style.display = "block";
        saisieID.value = "";
        saisieMDP.value = "";
        pageConnect(result, users);
    }
    else {
        const non = document.createElement("p")
        non.textContent = "Identifiant ou mot de passe incorect";
        titre1.after(non);
        setTimeout(() => non.remove(), 5000);
        saisieID.value = "";
        saisieMDP.value = "";
    }


})
async function tabjson() {
    let reponse = await fetch('./assets/json/user.json').then((reponse) => reponse.json());
    return reponse;
}
function chercheUser(tabID, tabUser) {
    return tabUser.find(element =>
        element.firstname === (String(tabID[0])[0].toUpperCase() + String(tabID[0]).slice(1).toLowerCase())
        && element.lastname === (String(tabID[1])[0].toUpperCase() + String(tabID[1]).slice(1).toLowerCase())
    ) || null;
}
function pageConnect(user, users) {
    const span = document.createElement("span");
    span.textContent = `Bonjour ${user.firstname} ${user.lastname}`;
    span.style.marginRight = "1rem";
    const btnDeco = document.createElement("button");
    btnDeco.textContent = "Déconnexion";
    btnDeco.addEventListener("click",()=>{
        divConnect.replaceChildren();
        divConnect.style.display = "none";
        formulaire.style.display = "flex";
    })
    divConnect.appendChild(span);
    divConnect.appendChild(btnDeco);
    tab(users, user);
}
function tab(tabuser, user) {
    const table = document.createElement("table");
    const tabHead = table.createTHead();
    const tabBody = table.createTBody();
    const rowHead = tabHead.insertRow();
    for (const element of tabTh) {
        const cell = document.createElement("th");
        cell.textContent = element;
        rowHead.appendChild(cell)
    }
    tabuser.forEach(element => {
        if (element === user) {
            const row = tabBody.insertRow();
            row.style.backgroundColor = "green";
            for (let i = 0; i < tabTh.length; i++) {
                row.insertCell();
            }
            remplir(user, row);
        }
        else {
            const row = tabBody.insertRow();
            for (let i = 0; i < tabTh.length; i++) {
                row.insertCell();
            }
            remplir(element, row);
        }
    });
    divConnect.appendChild(table);
}
function remplir(user, ligne) {
    const cells = ligne.childNodes;
    cells[0].textContent = user.lastname;
    cells[1].textContent = user.firstname;
    cells[2].textContent = user.birthday;
    cells[3].textContent = mail(user);
    cells[4].textContent = `${user.salary} €`;
}
function mail(user) {
    return `${String(user.firstname).toLowerCase()}.${String(user.lastname).toLowerCase()}@example.com`;
}
function verifMdp(result) {

    return result.password === saisieMDP.value;
}