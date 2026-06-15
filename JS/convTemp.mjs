import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output, stderr} from 'node:process';

const rl = new createInterface(input,output);

async function main() 
{
    let test=[];
    do
    {
        let rep =await rl.question('x\n> ');
        rep = rep.toLowerCase();
        test = rep.split(' ');
        test[0] =parseFloat(test[0]);
    }while(test[1]!='c' && test[1]!='f' || isNaN(test[0]));

    switch(test[1])
    {
        case 'c':
            console.log(verF(test));
            break;
        case 'f':
            console.log(verC(test));
            break;
    }
    rl.close();
}

function verF(tableau)
{
    let result = (parseFloat(tableau[0])*9/5)+32;
    return result;
}
function verC(tableau)
{
    let result = (parseFloat(tableau[0])-32)*5/9;
    return result; 
}
main();