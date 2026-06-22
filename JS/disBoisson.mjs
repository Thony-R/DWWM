import { createInterface } from "node:readline/promises";
import { stdin as input,stdout as output } from "node:process";
import { truncateSync } from "node:fs";

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
function verifPrix(monnaie,prix)
{
    let rendue =monnaie-prix;
    monnaie -= rendue;
    return 'Rendue monnaie : '+rendue+'€';

}
async function main()
{
    console.log('\nBienvenue à la pose cafée du devloppeur.\nverification du stock des gobelet en cour ...');

    if(verifStock() === true)
    {
        console.clear();
        let boucle = true;
        let prix = 1.50;
        let monnaie = 0;
        let choix;
        do 
        {
            console.log('\n\x1b[38;2;0;255;255mBienvenue à la pose cafée du devloppeur.\n');
            choix = await sc.question('032# : chocolat \t033# : café\x1b[0m\n> ');
            switch(choix)
            {
                case '032#':
                    do {
                        console.clear();
                        monnaie += parseFloat(await sc.question('\tchocolat\nInsérer monnaie\nPrix : '+prix+'€\nReste : '+monnaie+'€\n> '));
                    } while (monnaie<=prix);
                    console.log(verifPrix(monnaie,prix));
                    stock--;
                    console.log('gobelet : '+stock);
                    boucle = false;
                    break;
                case '033#':
                    do {
                        console.clear();
                        monnaie += parseFloat(await sc.question('\tcafé\nInsérer monnaie\nPrix : '+prix+'€\nReste : '+monnaie+'€\n> '));
                    } while (monnaie <=prix);
                    console.log(verifPrix(monnaie,prix));
                    stock--;
                    console.log('gobelet : '+stock);
                    boucle = false;
                    break;
                default :
                    console.log('erreur');
                    break;
            }
        } while (boucle);

    }
    else
    {
        console.clear();
        console.log('\nBienvenue à la pose cafée du devloppeur.\nDistributeur indisponible.');
    }

    sc.close();
}

main();