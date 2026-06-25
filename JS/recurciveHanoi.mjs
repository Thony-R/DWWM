import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

var tabT =[];
var p =2;
var conteur=0;
function move(pos,posvoulu,tableau)
{

    if(tableau[pos[0]][pos[1]+1]!=undefined)
    {
        let position = [pos[0],pos[1]+1];
        move(position,3-posvoulu-pos[0],tableau);
    }
    console.table(tableau);
    let x = tableau[pos[0]][pos[1]];
    tableau[posvoulu].push(x);
    tableau[pos[0]].pop();

    if(x >1)
    {
        let copain = parseInt(x)-1;
        let posCopain = tesOu(copain,tableau);
        move(posCopain,posvoulu,tableau);
    }
}

function tesOu(value,tab)
{
    for(let i=0;i<tab.length;i++)
    {
        for(let j=0;j<tab[i].length;j++)
        {
            if(tab[i][j]==value)
            {
                return [i,j];
            }
        }
    }
}
async function main()
{
    const rl = new createInterface(input,output);
    let nbDisque = parseInt(await rl.question(chalk.cyan('Entrer un nombre de dique de la tour d\'hanoï\n> ')));
    let tabF = [];
    for (let i = nbDisque;i>0;i--)
    {
        tabT.push(i);
    }
    tabF.push(tabT);
    tabF.push([]);
    tabF.push([]);
    console.table(tabF);
    tabT=[];
    tabT.push(0,0);
    move(tabT,p,tabF);
    console.table(tabF);
    rl.close();
}
main();