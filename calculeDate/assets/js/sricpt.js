const btnC = document.getElementById('calcule');
const test = document.getElementById('passTime');
const insertDate = document.getElementById('date');
const insertHeure = document.getElementById('heure');
const screenAge = document.querySelector('.affichageAge');
const astro = document.getElementById('signe');

// Calule pour l'age
function calMois(date1,date2)
{
    let mois = (date1.getFullYear() - date2.getFullYear()) * 12
             + date1.getMonth() - date2.getMonth();

    if (date1.getDate() < date2.getDate()) {
        mois--;
    }

    return mois;
}
// verif signe
function signe (jour, mois,tabD,tabF,name)
{
    if(jour>=tabD[0] && mois === tabD[1] || jour<=tabF[0] && mois === tabF[1])
    {
        return name;
    }
    else
    {
        return "faux";
    }
}
// Event au click bouton + calcule age
btnC.addEventListener('click', ()=>{
    const inputDate = document.getElementById('dateNaissance');
    const inputHeure =document.getElementById('heureNaissance');
    const dateNaissance = new Date(inputDate.value+"T"+inputHeure.value);
    const anneeN = new Date();
    if(dateNaissance<=anneeN)
    {
        const mois = dateNaissance.getMonth()+1;
        const jour = dateNaissance.getDate();
        let age = parseInt(calMois(anneeN, dateNaissance) /12);

        insertDate.textContent=dateNaissance.toLocaleDateString("fr-FR");
        insertHeure.textContent=inputHeure.value;
        test.textContent = "Il s'est écoulé "+`${age}`+" années depuis votre naissance.";
        screenAge.style.display='block';
        for (const element of tab) {
            if(element.calcul(jour,mois)!="faux")
            {
                astro.textContent= element.calcul(jour,mois);
                break;
            }
        }
    }
    else
    {
        console.log("non");
    }
});
// tableau des signe
const tab = [{
        name : "Verseau",
        dateD : [20, 1],
        dateF : [18, 2],
        calcul : function(jour,mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        },
    },
    {
        name : "Poissons",
        dateD : [19,2],
        dateF : [20,3],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Bélier",
        dateD :[21,3],
        dateF :[19,4],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }

    },
    {
        name : "Taureau",
        dateD :[20,4],
        dateF :[20,5],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }    
    },
    {
        name : "Gémeaux",
        dateD :[21,5],
        dateF :[20,6],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Cancer",
        dateD :[21,6],
        dateF :[22,7],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Lion",
        dateD :[23,7],
        dateF :[22,8],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Vierge",
        dateD :[23,8],
        dateF :[22,9],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Balance",
        dateD :[23,9],
        dateF :[22,10],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Scorpion",
        dateD :[23,10],
        dateF :[21,11],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Sagittaire",
        dateD :[22,11],
        dateF :[21,12],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    },
    {
        name : "Capricorne",
        dateD :[22,12],
        dateF :[19,1],
        calcul : function(jour, mois){
            return signe(jour,mois,this.dateD,this.dateF,this.name);
        }
    }];