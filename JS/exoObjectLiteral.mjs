import {createInterface} from 'node:readline/promises';
import {stdin as input,stdout as output} from 'node:process';
import chalk from 'chalk';

// const rl = new createInterface(input,output);
async function main() 
{
    let formationsInfo =
    {
        ABC_I : 24,
        ADRN : 8,
        TIP : 20,
        TRI : 7,
        TSSR : 22,
        AIS : 6,
        AEC : 5,
        DWWM : 21,
        CDA : 23,
        ISI : 4
    };
    // new version plus simple

        formationsInfo = Object.fromEntries(Object.entries(formationsInfo).sort((a,b) => {return b[1]-a[1]}));

    // Mon code 

        // let matrice = Array.from({length:10},() => Array(2));
        // let indice =0;
        
        // for (const valeur in formationsInfo) 
        // {
        //     matrice[indice] = [valeur,formationsInfo[valeur]];
        //     indice++;
        // }
        // matrice.sort((a,b)=>{return b[1]-a[1]});
        // console.log(formationsInfo);
        // console.log(matrice);
        // formationsInfo ={};
        // for(let i =0;i<matrice.length;i++)
        // {
        //     formationsInfo[matrice[i][0]]= matrice[i][1];
            
        // }
    console.log(formationsInfo);
}
main();