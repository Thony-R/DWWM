import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
    
const sc = new createInterface({input,output});
let reponse;

async function verif(question)
{
     do 
    {
        reponse = await sc.question(question);
    } while (reponse.toLowerCase() !=='oui'&& reponse.toLowerCase() !=='non');
    return reponse;
}
async function main (){

    reponse = await verif('fera-t-il beau demain ?\n> ');
   
   
    // console.log(`Bonjour voici votre réponse: ${reponse}`);
    
    if(reponse.toLowerCase() === 'oui')
    {
        reponse =await verif('La bicyclette est en bonne état ?\n> ');
        if(reponse.toLowerCase() ==='oui')
        {
            console.log('\nj\'irai faire une balade à bicyclette. =)');
        }
        else
        {
            reponse = await verif('Les réparations du garagiste sont-elles immédiates ?\n> ');
            if(reponse.toLowerCase() ==='oui')
            {
                console.log('\nj\'irai faire une balade à bicyclette. =)');
            }
            else
            {
                console.log('\nj\'irai me balader à l\'étang.');
            }
        }
    }
    else
    {
        reponse = await verif('Avez vous le tome 1 de Game of Thrones ?\n> ');
        if(reponse.toLowerCase() ==='oui')
        {
            console.log('\nDemain, journée lecture.');
        }
        else
        {
            reponse =await verif('Est-il disponible à la bibliothèque ?\n> ');
            if(reponse.toLowerCase() ==='oui')
            {
                console.log('\nDemain, journée lecture.');
            }
            else
            {
                console.log('\nJ\'emprunterai un roman policier.');
            }
        }
    }
    sc.close();
}

await main();


