import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';

const rl = new createInterface({input,output});
function calculVan(iDepart,flux_net,vr)
{
    let i = 0.04;
    let sFn=0;
    flux_net.forEach((element,index) => {sFn+=element*Math.pow((1+i),-(index+1))});
    let van = -iDepart+sFn+vr*Math.pow((1+i),-5);
    return van.toFixed(2);
}
async function main()
{
    let flux =[];
    let invD = parseFloat(await rl.question('Quel est votre investissement de départ ?\n> '));
    for(let i=1;i<5;i++)
    {
        let temp = parseFloat(await rl.question('flux net de votre année '+i+'\n> '));
        flux.push(temp);
    }
    
    let vR = parseFloat(await rl.question('Quel est le prix de revente à la fin ?\n> '));
    console.log(calculVan(invD,flux,vR));
    rl.close();
}
main();