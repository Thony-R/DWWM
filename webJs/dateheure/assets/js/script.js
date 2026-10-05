const btnDate = document.getElementById('btnDate');
const inputDate = document.getElementById('txtDate');

const btnHeure = document.getElementById('btnHeure');
const inputHeure = document.getElementById('txtHeure');



btnDate.addEventListener('click', ()=>{
    let now = new Date()
    let jours = now.getDate();
    let mois = (now.getMonth()+1<10)?"0"+(now.getMonth()+1):(now.getMonth()+1);
    let annee = now.getFullYear();
    if(jours < 10)
    {
        jours=`0${jours}`;
    }
    inputDate.value =`${annee}-${mois}-${jours}`;
})
btnHeure.addEventListener('click', ()=>{

    let now = new Date();
    let minutes = now.getMinutes();
    let heure = now.getHours();
    let seconde =now.getSeconds();
    inputHeure.value = (`${heure}:${minutes}:${seconde}`);

})