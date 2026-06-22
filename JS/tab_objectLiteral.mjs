import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

const rl = new createInterface(input,output);

function tabObject()
{
    let az =[... 'abcdefghijklmnopqrstuvwxyz'];
    let occurencetab={};
    for(let i =0;i<az.length;i++)
    {
        occurencetab[az[i]] =0;
    }
    return occurencetab;
}
async function main()
{
    let occurence = tabObject();
    let phraseUser ='';
    do
    {
        phraseUser = await rl.question(chalk.cyan('Entrer une phrase de minimum 120 caractère\n> '));
    }while(phraseUser.length <120)

    phraseUser = phraseUser.toLocaleLowerCase();
    for(let i=0;i<phraseUser.length;i++)
    {
        if(phraseUser[i] in occurence)
        {
            occurence[phraseUser[i]]++;
        }
    }
    console.log(occurence);
    rl.close();
}
main();