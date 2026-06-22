import {createInterface} from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

const rl = new createInterface({input,output});
function calcul(nb_entier)
{
    let essaie = parseInt(Math.sqrt(nb_entier));
    let diviseurs = [];
    for(let i=1;i<=essaie;i++)
    {
        if(nb_entier%i ==0 && i!=1)
        {
            diviseurs.push(i);
            if((nb_entier/i) !=i)
            {
                diviseurs.push((nb_entier/i));
            }
        }
    }
    return diviseurs.sort((a, b) => a - b);
}
async function main()
{
    let nbU;
    nbU =parseInt(await rl.question('Entrer un nombre entier \n> '));
    console.log(calcul(nbU))

    rl.close();
}

main();