import {createInterface} from 'node:readline/promises';
import  {stdin as input, stdout as output} from 'node:process';
import chalk from 'chalk';

const rl = new createInterface(input,output);

async function chaineUserV(question)
{
    let reponse = '';
    let boucle = true;
    while(boucle)
    {
        reponse = await rl.question(chalk.cyan(question));
        reponse = reponse.toLowerCase();
        reponse = reponse.replaceAll(' ','');
        if(reponse.length<=1)
        {
            console.log(chalk.cyan('La phrase est vide'));
        }
        else if(reponse.charAt(reponse.length-1) != '.')
        {
            console.log(chalk.cyan(`Le dernier caractère n'est pas un "."`));
        }
        else
        {
            boucle = false;
        }
    }
    return reponse;
}
function occurence(chaine,lettre)
{
    let count =0;
    for(let i=0;i<chaine.length-2;i++)
    {
        if(chaine.charAt(i) == lettre)
        {
            count++;
        }
    }
    return count;
}
async function main()
{
    
    let chaine = await chaineUserV('Saisissez une chaine de caractère qui ce termine par un "."\n> ');
    console.log(chaine);

    let search = await rl.question(chalk.cyan('Saisi une lettre\n> '));
    search = search.toLowerCase();
    console.log(occurence(chaine,search));

    rl.close();
}
main();