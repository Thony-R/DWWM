import chalk from "chalk";
import { table } from "node:console";
import { ftruncate } from "node:fs";

 
function donne(json)
{
    const tabmail = json.employee_name.toLowerCase().split(' ');

    const id = json.id;
    const full_name = json.employee_name;
    const email = tabmail[0][0]+'.'+tabmail[1]+'@gmail.com';
    const income_monthly = parseFloat((json.employee_salary/12).toFixed(2));
    const year_of_birth = new Date().getFullYear()-json.employee_age;

    return {id,full_name,email,income_monthly,year_of_birth};
}
function remplissage(tableaux)
{
    const tabFinal = [];
    for (const element of tableaux)
    {
        tabFinal.push(donne(element));
    }
    return tabFinal;
}
async function main()
{
    const api = await fetch('https://arfp.github.io/tp/web/javascript2/03-employees/employees.json')
    .then(reponse => reponse.json());
    const tabJson = api.data;

    const tab = remplissage(tabJson);
    console.table(tab);
}
main();