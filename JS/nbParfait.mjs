import { createInterface } from "node:readline/promises";
import {stdin as intput,stdout as output} from 'node:process';

const rl = new createInterface(intput,output);
function calcul(nb_entier)
{
    let essaie = parseInt(Math.sqrt(nb_entier));
    let diviseurs = [];
    for(let i=1;i<=essaie;i++)
    {
        if(nb_entier%i ==0)
        {
            diviseurs.push(i);
            if((nb_entier/i) !=i && i!=1)
            {
                diviseurs.push((nb_entier/i));
            }
        }
    }
    return diviseurs.sort((a, b) => a - b);
}
function calculP(nb_limite)
{
    let nbP=[];
    let x=2;
    while(nbP.length<nb_limite)
    {
        let tab = calcul(x);
        let somme = tab.reduce((acc, val)=> acc +val,0);
        if(somme==x)
        {
            nbP.push(x)
        }
        x++;
    }
    return nbP;
}
async function main()
{
    let nbL=parseInt(await rl.question('Définissez X pour X le(s) premier nombre parfait\n> '));
    console.log(calculP(nbL));
    rl.close();
}
main();