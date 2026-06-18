import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

const rl = new createInterface(input,output);

async function main() 
{
    let word = await rl.question(chalk.cyan('Entrer un mot\n> '));
    rl.close();
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
        console.log('c\'est un palindrome');
    }
    else
    {
        console.log('non');
    }
    
}
main();