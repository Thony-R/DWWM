import { createInterface } from "node:readline/promises";
import { stdin as input,stdout as output } from "node:process";

const rl = new createInterface({input,output});

function interetS(capital,taux,nbAnnee)
{
    taux = taux * 0.01;
    let cF= capital*(1+(taux*nbAnnee));
    return cF.toFixed(2) +' valeur acquise : '+(cF-capital).toFixed(2);
}
function interetC(capital,taux,nbAnnee)
{
    taux = taux * 0.01;
    let cF=capital*Math.pow(1+taux,nbAnnee);
    return cF.toFixed(2) +' valeur acquise : '+(cF-capital).toFixed(2);
}
async function main() 
{
    let capital;
    let tInteretA;
    let nbAnnee;

    capital = parseFloat(await rl.question('Quel est votre capitale de départ ?\n> '));
    tInteretA = parseFloat(await rl.question('Quel est votre taux d\'intéret annuel en % ?\n> '));
    nbAnnee = parseInt(await rl.question('Nombre d\'année placé :\n> '));

    console.log(interetC(capital,tInteretA,nbAnnee));
    console.log(interetS(capital,tInteretA,nbAnnee));
    rl.close();
}

main();