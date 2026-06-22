import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';
import { generateKey } from 'node:crypto';

const rl = new createInterface(input,output);

function generateTab()
{
    let tab = [];
    for(let i=0;i<20;i++)
    {
        tab[i]= Math.floor(Math.random()*80)+1;
    }
    return tab;
}
function sortAge(tableau)
{
    let countA =0;
    let countM =0;
    let countT =0;
    tableau.forEach(Element =>
    {

        if(Element<20)
        {
            countM++;
        }
        else if(Element > 20)
        {
            countA++;
        }
        else
        {
            countT++;
        }
    });
    if(countA === 20)
    {
        return 'Toutes les personnes ont plus de  20 ans';
    }
    else if(countM === 20)
    {
        return 'Toutes les personnes ont moins de 20 ans';
    }
    else if(countT === 20)
    {
        return 'Toutes les personnes ont 20 ans';
    }
    else
    {
        return countA+' '+countM+' '+countT;
    }
}
async function main() 
{
    let ageTab = [];
    let reponse ='';
    do{
        reponse = await rl.question(chalk.cyan('Voulez vous saisir 20 valeurs d\'age ? (oui / non)\n> '));

    }while(reponse.toLowerCase() != 'oui'&& reponse.toLowerCase() != 'non');
    if(reponse.toLowerCase()== 'oui')
    {
        for(let i=1;i<21;i++)
        {
            ageTab[i-1] = parseInt(await rl.question(chalk.cyan('valeur '+i+' :\n>')));
        }
    }
    else
    {
        ageTab = generateTab();
    }
    console.log(ageTab);
    console.log(sortAge(ageTab));

    rl.close();
}
main();