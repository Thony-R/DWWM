import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

function factorielle(nb)
{
    
    if(nb>0)
    {
        return nb * factorielle((nb-1));
    }
    else
    {
        return 1;
    }
}
async function main() 
{
    const rl = new createInterface(input,output);

    let nbCheveaux = parseInt(await rl.question(chalk.cyan('nombre de chevaux partants ?\n> ')));
    let nbCJouer = parseInt(await rl.question(chalk.cyan('nombre de chevaux joués \n> ')));
    console.log(factorielle(nbCheveaux));
    // console.log('Cheveaux partants : '+nbCheveaux+'\n'+'Cheveaux joués : '+nbCJouer);
    rl.close();
}
main();