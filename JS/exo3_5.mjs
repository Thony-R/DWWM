import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

const rl = new createInterface(input,output);

async function recupMot()
{
    let word = await rl.question(chalk.cyan('Entrer un mot\n> '));
    rl.close();

    return word;
}
function check(word)
{
    let x = word.length-1;
    let score = 0;
    for(let i=0;i<word.length;i++)
    {
        if(word[i] == word[x-i])
        {
            score++;
        }
        else
        {
            break;
        }
    }
    if(score == word.length)
    {
        return chalk.green('c\'est un palindrome');
    }
    else
    {
        return chalk.red('non');
    }
}
async function main() 
{
    let mot = await recupMot();
    console.log(check(mot));    
}
main();