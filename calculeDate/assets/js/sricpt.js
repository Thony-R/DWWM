const btnC = document.getElementById('calcule');
const test = document.getElementById('passTime');
const insertDate = document.getElementById('date');
const insertHeure = document.getElementById('heure');
const screenAge = document.querySelector('.affichageAge');

function calMois(date1,date2)
{
    let mois = (date1.getFullYear() - date2.getFullYear()) * 12
             + date1.getMonth() - date2.getMonth();

    if (date1.getDate() < date2.getDate()) {
        mois--;
    }

    return mois;
}
btnC.addEventListener('click', ()=>{
    const inputDate = document.getElementById('dateNaissance');
    const inputHeure =document.getElementById('heureNaissance');
    const dateNaissance = new Date(inputDate.value);
    const anneeN = new Date();
    let age = parseInt(calMois(anneeN, dateNaissance) /12);
    insertDate.textContent=dateNaissance.toLocaleDateString("fr-FR");
    insertHeure.textContent=inputHeure.value;
    test.textContent = "Il s'est écoulé "+`${age}`+" années depuis votre naissance.";
    screenAge.style.display='block';
})