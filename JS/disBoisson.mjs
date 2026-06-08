import { createInterface } from "node:readline";
import { stdin as input,stdout as output } from "node:process";

const sc = new createInterface({input,output});
let stock = 5;

function verifStock()
{
    if(stock >0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
async function main()
{
    console.log('\nBienvenue à la pose cafée du devloppeur.\nverification du stock des gobelet en cour ...');

    if(verifStock() === true)
    {
        console.clear();
        console.log('\x1b[38;2;0;255;255m');
    }
    else
    {
        console.clear();
        console.log('\nBienvenue à la pose cafée du devloppeur.\nDistributeur indisponible.');
    }

    sc.close();
}

main();