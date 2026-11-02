//  Importation et initialisation des listeners
import { listener } from "./listeners";
const listeners = new listener();
//  ============================================================================
//  Déclaration des types
export type data = {id:number;employee_name:string;employee_salary:number;employee_age:number;photo:string};
//  ============================================================================
export function trieSal(_Data:data[],_bool:boolean):data[]
{
    if(_bool)
    {
        return _Data.sort((a,b)=>a.employee_salary - b.employee_salary);
    }
    else
    {
        return _Data.sort((a,b)=>b.employee_salary - a.employee_salary);
    }
}
//  ============================================================================
/**
 * Remplissage du thead
 * @param _Dom 
 * @param _Tab 
 */
function rThead(_Dom:HTMLTableSectionElement,_Tab:string[],_Data:data[],_TBodyDom:HTMLTableSectionElement):void
{
    const row : HTMLTableRowElement = nLigne(_Tab,_Dom,true);
    const btn : HTMLButtonElement = document.createElement("button");
    btn.textContent ="v"
    btn.classList.add("non");
    const div :HTMLDivElement = document.createElement("div");
    div.textContent = _Tab[3]
    div.classList.add("salary");
    div.appendChild(btn);

    const cells = row.children;
    cells[0].textContent = _Tab[0];
    cells[1].textContent = _Tab[1];
    cells[2].textContent = _Tab[2];
    cells[4].textContent = _Tab[4];
    cells[5].textContent = _Tab[5]
    cells[3].appendChild(div)

    listeners.trieSal(btn,_TBodyDom,_Tab,_Data);
}
//  ============================================================================
/**
 * Remplissage du tbody
 * @param _Dom 
 * @param _tab 
 * @param _Data 
 */
export function rTbody(_Dom:HTMLTableSectionElement,_tab:string[],_Data:data[]):void
{
    _Dom.replaceChildren()
    _Data.forEach(element => 
    {
        const row : HTMLTableRowElement = nLigne(_tab,_Dom,false);
        const btnSup : HTMLButtonElement = document.createElement("button");
        btnSup.textContent = "Delete";
        const btnDupl : HTMLButtonElement = document.createElement("button");
        btnDupl.textContent = "Duplicate";

        const cells = row.children;
        cells[0].textContent = String(element.id);
        cells[1].textContent = element.employee_name;
        cells[2].textContent = email(element.employee_name);
        cells[3].textContent = `${salaryM(element.employee_salary)} €`;
        cells[4].textContent = String(calcYeard(element.employee_age));
        cells[5].append(btnDupl,btnSup);

        listeners.rmLigne(btnSup,row);
        listeners.duplicate(btnDupl);   
    });
}
//  ============================================================================
/**
 * Création d'une Ligne && de ces cellules
 * @param _tabTitre 
 * @param _Dom 
 * @param _Bool 
 */
function nLigne(_TabTitre:string[],_Dom:HTMLTableSectionElement,_Bool:boolean):HTMLTableRowElement
{
    const row : HTMLTableRowElement = _Dom.insertRow();
    for(let i=0;i<_TabTitre.length;i++)
    {
        if(_Bool)
        {
            const cellTitre : HTMLTableCellElement = document.createElement("th");
            row.appendChild(cellTitre);
        }
        else
        {
            row.insertCell();
        }
    }
    return row;
}
//  ============================================================================
/**
 * Génération du mail
 * @param _Name 
 * @returns 
 */
function email(_Name:string):string
{
    const tabname = _Name.split(" ");
    const mail : string = `${tabname[0][0].toLowerCase()}.${tabname[1].toLowerCase()}@email.com`;
    return mail;
}
//  ============================================================================
/**
 * Calcul du salaire Mensuel
 * @param _EmpSal 
 * @returns 
 */
function salaryM(_EmpSal:number):string
{
    const sal : string = (_EmpSal/12).toFixed(2);
    return sal;
}
//  ============================================================================
/**
 * Calcul de l'année de naissance
 * @param _Age 
 */
function calcYeard(_Age:number):number
{
    const yeard : number = new Date().getFullYear() - _Age;
    return yeard;
}
//  ============================================================================
//  Récupération du JSON
async function recupJson():Promise<data[]>
{
    const result = await fetch("https://arfp.github.io/tp/web/javascript2/03-employees/employees.json").then(reponse=>reponse.json());
    return result.data;     
}
//  ============================================================================
// Programme principale
async function main():Promise<void> 
{
    //  Chargement et création du Dom
    const tabDom : HTMLTableElement = document.getElementById("tabEmp") as HTMLTableElement;
    if(!tabDom) throw new Error("Chargement du Dom");
    const thead : HTMLTableSectionElement = tabDom.createTHead();
    const tbody : HTMLTableSectionElement = tabDom.createTBody();
    // ============================================================================
    //  declaration des variables
    const data : data[] = await recupJson();
    const tabTitre : string[] =["EID","Full Name","Email","Monthly salary","Yeard of birth","Actions"];
    //  ============================================================================
    // Fonction principal
    rThead(thead,tabTitre,data,tbody);
    rTbody(tbody,tabTitre,data);
}
main();