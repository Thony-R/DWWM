import chalk from 'chalk';

function genNbTab()
{
    let tabNb = [];
    let x = 10;
    for(let i=0;i<x;i++)
    {
        tabNb[i]= Math.floor(Math.random()*100)+1;
    }
    return tabNb;
}

function triTab(tableauNb)
{
    let mintp;
    let indice;
    for(let i=0;i<tableauNb.length;i++)
    {
        mintp = tableauNb[i];
        indice = i;
        for(let j=i+1;j<tableauNb.length;j++)
        {
            if(mintp>tableauNb[j])
            {
                mintp=tableauNb[j]
                indice= j;
            }
        }
        if(mintp<tableauNb[i])
        {
            tableauNb[indice]= tableauNb[i];
            tableauNb[i] = mintp;
        }
    }
    return tableauNb;
}

function main()
{
    let tab = genNbTab();
    console.log('\n'+chalk.red(tab));
    tab = triTab(tab);
    console.log('\n'+chalk.green(tab));
}
main();