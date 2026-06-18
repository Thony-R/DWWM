import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

const rl = new createInterface(input,output);
async function wordPlayer()
{
    let word ='';
    do 
    {
        word = await rl.question(chalk.cyan('Entrer un mot de minimum 5 caractères\n> '));
    } while (word.length<5);
    return word.toLowerCase();
}
async function check(word)
{
    let lettreT =[];
    let lettre ='';
    let search ='';
    let life = 6;
    while(search != word && life != 0)
    {
        search = printWord(word,lettreT);
        if(search == word)
        {
            console.log(search+chalk.green('\nTrouvé'));
        }
        else
        {
            console.log(search);
            lettre = await recupLettre();
            if(word.includes(lettre))
            {
                lettreT.push(lettre);
            }
            else
            {
                life--;
                console.log(chalk.red('Perdu '+life+' vie'));    
            }
        }
    }
}
function printWord(word,tabLettre)
{
    let search ='';

    for(let i=0;i<word.length;i++)
    {
        if(i == 0 || i == word.length-1 || tabLettre.includes(word[i]))
        {
            search += word[i];
        }
        else
        {
            search += ' _ ';
        }
    }
    return search;
}
async function recupLettre()
{
    let lettre='';
    do 
    {
        lettre = await rl.question(chalk.cyan('entrer une lettre\n> '));
        lettre = lettre.toLowerCase();
    } while (lettre.length != 1); 
    return lettre;   
}
async function main()
{
    let mystWord = await wordPlayer();
    await check(mystWord);
    rl.close();
}
main();
