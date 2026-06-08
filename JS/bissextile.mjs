import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';

// init Scanner
const sc =new createInterface({input,output});

function calculeYears(annee)
{
    if(annee%4 ===0 && annee%100!==0 ||annee%400 ===0 && annee%100===0)
    {
        return 'bissextile';
    }
    else
    {
        return 'non bissextile';
    }
}

async function main()
{
    let years;

    do 
    {
        // years = Number(await sc.question('Entrer une année :\n> '));
        years = await sc.question('Entrer une année :\n> ');
        // console.log(parseInt(years));
        years= parseInt(years);
    } while (!Number.isInteger(years));

    console.log(calculeYears(years));
    sc.close();
}
main();