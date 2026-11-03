//  Importation des listeners
import { listener } from "./listeners";
//  ============================================================================
// Importation des types
import type { data } from "./type";
//  ============================================================================
/**
 * Trie les données des employés selon leur salaire.
 * Le tri peut être effectué par ordre croissant ou décroissant.
 * @param _Data - Tableau contenant les données des employés à trier.
 * @param _bool - Définit l'ordre du tri : true pour croissant, false pour décroissant.
 * @returns Un nouveau tableau contenant les employés triés par salaire.
 */
export function trieSal(_Data:data[],_bool:boolean):data[]
{
    if(_bool)
    {
        return [..._Data].sort((a,b)=>a.employee_salary - b.employee_salary);
    }
    else
    {
        return [..._Data].sort((a,b)=>b.employee_salary - a.employee_salary);
    }
}
//  ============================================================================
/**
 * Remplit le thead avec les intitulés des colonnes.
 * Crée la ligne d'en-tête et ajoute un bouton permettant de trier les employés par salaire.
 * @param _Dom - Élément HTML thead dans lequel insérer la ligne d'en-tête.
 * @param _Tab - Tableau contenant les intitulés des colonnes.
 * @param _Data - Tableau contenant les données des employés utilisées pour le tri.
 * @param _TBodyDom - Élément HTML tbody contenant les lignes des employés à actualiser.
 * @param _tfootDom - Élément HTML tfoot à actualiser après le tri.
 */
export function rThead(_Dom:HTMLTableSectionElement,_Tab:string[],_Data:data[],_TBodyDom:HTMLTableSectionElement,_tfootDom:HTMLTableSectionElement):void
{
    const listens = new listener();
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

    listens.trieSal(btn,_TBodyDom,_Tab,_Data,_tfootDom);
}
//  ============================================================================
/**
 * Remplit le tbody avec les données des employés.
 * Crée les lignes, remplit leurs cellules avec les informations de chaque employé
 * et initialise les boutons d'action.
 * Actualise également le pied du tableau.
 * @param _Dom - Élément HTML tbody dans lequel insérer les lignes.
 * @param _tab - Tableau contenant les intitulés des colonnes.
 * @param _Data - Tableau contenant les données des employés à afficher.
 * @param _tfootDom - Élément HTML tfoot à actualiser avec les données récapitulatives.
 */
export function rTbody(_Dom:HTMLTableSectionElement,_tab:string[],_Data:data[],_tfootDom:HTMLTableSectionElement):void
{
    const listens = new listener();
    _Dom.replaceChildren();
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
        cells[5].className = "action";

        listens.rmLigne(btnSup,row,element,_Data);
        listens.duplicate(btnDupl,element,_Data,_tab,_Dom,_tfootDom);   
    });
    rTfoot(_tfootDom,_tab,_Data);
}
//  ============================================================================
/**
 * Remplit le tfoot avec les informations récapitulatives des employés.
 * Affiche le nombre d'employés et calcule le montant total des salaires mensuels.
 * @param _Dom - Élément HTML tfoot dans lequel insérer les informations récapitulatives.
 * @param _tabTitre - Tableau contenant les intitulés des colonnes utilisés pour créer la ligne.
 * @param _Data - Tableau contenant les données des employés utilisées pour calculer le total des salaires.
 */
function rTfoot(_Dom:HTMLTableSectionElement,_tabTitre:string[],_Data:data[]):void
{
    _Dom.replaceChildren();
    const row : HTMLTableRowElement = nLigne(_tabTitre,_Dom,true);
    const cells = row.children;
    cells[0].textContent = String(_Data.length);
    (cells[1] as HTMLTableCellElement).colSpan = 2;
    (cells[3] as HTMLTableCellElement).colSpan = 2;
    cells[2].textContent = (_Data.reduce((acc,val)=> acc + val.employee_salary,0)/12).toFixed(2)+" €";
    cells[4].remove();
    cells[4].remove();
}
//  ============================================================================
/**
 * Crée une nouvelle ligne HTML et ses cellules.
 * @param _TabTitre - Tableau contenant les intitulés des colonnes, utilisé pour déterminer le nombre de cellules à créer.
 * @param _Dom - Élément HTML thead ou tbody dans lequel insérer la ligne.
 * @param _Bool - Définit le type de cellules à créer : true pour des cellules d'en-tête (th), false pour des cellules classiques (td).
 * @returns La ligne HTML créée avec ses cellules.
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
 * Génère une adresse e-mail à partir du nom complet d'un employé.
 * Utilise la première lettre du prénom suivie du nom de famille.
 * @param _Name - Chaîne contenant le prénom et le nom de l'employé.
 * @returns Adresse e-mail générée au format initiale.nom@email.com.
 */
function email(_Name:string):string
{
    const tabname = _Name.split(" ");
    const mail : string = `${tabname[0][0].toLowerCase()}.${tabname[1].toLowerCase()}@email.com`;
    return mail;
}
//  ============================================================================
/**
 * Calcule le salaire mensuel d'un employé à partir de son salaire annuel.
 * @param _EmpSal - Montant du salaire annuel de l'employé.
 * @returns Salaire mensuel calculé, arrondi à deux décimales.
 */
function salaryM(_EmpSal:number):string
{
    const sal : string = (_EmpSal/12).toFixed(2);
    return sal;
}
//  ============================================================================
/**
 * Calcule une année de naissance estimée à partir de l'âge d'un individu.
 * @param _Age - Âge de l'individu en années.
 * @returns Année de naissance estimée à partir de l'année actuelle.
 */
function calcYeard(_Age:number):number
{
    const yeard : number = new Date().getFullYear() - _Age;
    return yeard;
}