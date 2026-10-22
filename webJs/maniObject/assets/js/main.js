const myEmployee = 
{
    lastname: "Doe", 
    firstname: "John", 
    birthday: "1981-11-12", 
    salary: 2150,
}
const body = document.querySelector("body");
const tab = ["Nom","Prénom","Date de naissance","Email","salaire"];
const tabHtml= document.getElementById("tabObject");
const champPrenom = document.getElementById("firstname");
const champNom = document.getElementById("lastname");
const champAnniv = document.getElementById("birthday");
const champSalaire =document.getElementById("salary");
const btn = document.getElementById("enregistrer");

function initTab()
{
    const row = tabHeadHtml.insertRow();
    for (const element of tab) 
    {
        const cell = document.createElement("th");
        cell.textContent = element;
        row.appendChild(cell);
    }
    tabHeadHtml.appendChild(row);
}
function remplissageTab(row)
{
    
    for (const key in myEmployee) 
    {
        if(key === "birthday")
        {
            const cellanniv = row.insertCell();
            cellanniv.textContent = myEmployee[key];
            const cellemail = row.insertCell();
            cellemail.textContent = mail(); 
        }
        else if(key === "salary")
        {
            const cell = row.insertCell()
            cell.textContent = myEmployee[key]+" €";
        }
        else
        {
            const cell = row.insertCell();
            cell.textContent = myEmployee[key];
        }   
    }
}
function mail()
{
    return myEmployee.firstname.toLowerCase()+"."+myEmployee.lastname.toLowerCase()+"@example.com";
}
function verifNomPrenom(chaine)
{

    let regex =/^[a-zA-Z]{2,}$/;
    return regex.test(chaine);

}

function form()
{
    for (const key in myEmployee) 
    {
        console.log(key);
        switch(key)
        {
            case "lastname":
                champNom.value = myEmployee[key];
                break;
            case "firstname":
                champPrenom.value = myEmployee[key];
                break;
            case "birthday":
                champAnniv.value = myEmployee[key];
                break;
            case "salary":
                champSalaire.value = myEmployee[key];
                break;
        }
    }
}
const titre = document.createElement("h1");
titre.textContent = `Profil de ${myEmployee.firstname} ${myEmployee.lastname}`;
tabHtml.before(titre);
const tabHeadHtml = tabHtml.createTHead();
const tabBodyHtml = tabHtml.createTBody();
const row = tabBodyHtml.insertRow();
initTab();
remplissageTab(row);
form();
btn.addEventListener("click",(event)=>{
    event.preventDefault();
    try {
        if(!verifNomPrenom(champNom.value)) throw new Error("nom");
        if(!verifNomPrenom(champPrenom.value)) throw new Error("Prenom");
        if(champSalaire.value<myEmployee.salary) throw new Error("Le salaire ne peut pas être inferieur au précédent");
        if(new Date(champAnniv.value)> new Date())throw new Error("date");
    } catch (error) {
        champNom.value = myEmployee.lastname;
        champAnniv.value = myEmployee.birthday;
        champPrenom.value = myEmployee.firstname;
        champSalaire.value = myEmployee.salary;
        alert(error.message);
        return;
    }
    row.replaceChildren();
    myEmployee.firstname = String(champPrenom.value[0]).toUpperCase()+String(champPrenom.value).slice(1);
    myEmployee.lastname = String(champNom.value[0]).toUpperCase()+String(champNom.value).slice(1);
    myEmployee.birthday = champAnniv.value;
    myEmployee.salary = champSalaire.value;
    remplissageTab(row);
})