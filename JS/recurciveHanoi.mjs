import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';



function move(pos,posvoulu,tableau)
{
    // depacement avec les regles d'hanoï
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
    // recherche de la position d'un element du tableau
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
function init(nb)
{
    // rempli le tableau de depart avec les valeur souhaiter et à la position voulu de depart
    let tabF = [];
    let tabT =[];
    for (let i = nb;i>0;i--)
    {
        tabT.push(i);
    }
    tabF.push(tabT);
    tabF.push([]);
    tabF.push([]);

    return tabF;
}
async function main()
{
    // Initialisation 
    const rl = new createInterface(input,output);
    // Question pour recup un nombre
    do {
        const nbDisque = parseInt(await rl.question(chalk.cyan('Entrer un nombre de dique de la tour d\'hanoï\n> ')));
    } while (isNaN(nbDisque));
    // Initialisation de départ
    const tabFinal = init(nbDisque);
    // parametrage de lancement du programme
    const tabT=[];
    tabT.push(0,0);
    // Lancement du programme
    move(tabT,2,tabFinal);
    // Affichage final du tableau
    console.table(tabFinal);
    rl.close();
}
main();