import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';

const rl = new createInterface(input,output);
async function main()
{
    let tab=[];
    randomNumber(tab);
    tab.sort((a,b) => { return a-b });
    console.log(tab);
    let yourNb = parseInt(await rl.question('search number \n> '));
    if(tab.includes(yourNb))
    {
        tab.forEach((Element,index) => {
            if(Element==yourNb)
            {
                console.log(Element+' est à l\'indice '+index);               
            }
            });
    }
    else
    {
        console.log('404 Not fund')
    }


    rl.close();
}   
function randomNumber(tableau)
{
    for(let i=0;i<10;i++)
    {
        let nb = Math.floor(Math.random()*100);
        if(!tableau.includes(nb)) 
        {
            tableau.push(nb);
        }
        else{
            i--;
        }
    }
    return tableau;
}
main();