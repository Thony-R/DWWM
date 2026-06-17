import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

const rl= new createInterface(input,output);
async function verif(nbRandom) 
{
    let min = 0;
    let max = 100;
    let boucle = true;
    let quest = 'Le nombre ce trouve entre '+min+' et '+max+'\n> ';
    let reponse = parseInt(await rl.question(chalk.cyan(quest)));
   
    while(boucle)
    {
        if(reponse<min ||reponse>max)
        {
            reponse = parseInt(await rl.question(chalk.red(quest)));
        }
        else if(reponse == nbRandom)
        {
            return chalk.green('Trouvé');
            boucle = false;
        }
        else if(reponse>nbRandom)
        {
            max = reponse;
            quest = 'Le nombre ce trouve entre '+min+' et '+max+'\n> '; 
            reponse = parseInt(await rl.question(chalk.cyan(quest)));
        }
        else
        {
            min = reponse;
            quest = 'Le nombre ce trouve entre '+min+' et '+max+'\n> ';
            reponse = parseInt(await rl.question(chalk.cyan(quest)));
        }
    }

}
async function main()
{
    let nbC = Math.floor(Math.random()*100)+1;
    console.log(await verif(nbC));
    
    rl.close();
}
main();