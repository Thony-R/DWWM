import {Article} from './arctile.js';

const nameArticle = document.querySelector("#nom");
const priceHT = document.querySelector("#prix");
const tva = document.querySelector("#tva");
const btnAjoutArticle = document.querySelector("#valider");
const liste = document.querySelector("#articles");

btnAjoutArticle.addEventListener("click",(event)=>{
    event.preventDefault();
    const article1= new Article(nameArticle,priceHT,tva);
    let ml= document.createElement("li");
    ml.textContent=article1.nom+" : "+article1.calculPrixTTC()+"€"
    liste.appendChild(ml);
})

