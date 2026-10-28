type student = { fullname:string; grade : number; };
// Ajout des informations de l'élement Thead
/**
 * @param _tabTitre 
 * @param _ElementDom 
 */
function creatThead(_tabTitre:string[],_ElementDom:HTMLTableSectionElement):void
{
    const row : HTMLTableRowElement = nouvelLigne(_ElementDom,_tabTitre,true);
    const cells = row.childNodes;
    for(let i=0;i<_tabTitre.length;i++)
    {
        cells[i].textContent = _tabTitre[i];
    }
}
// Ajout des informations de l'élement Tbody
/**
 * @param _fichierJson 
 * @param _ElementDom 
 */
function creatTbody(_fichierJson:student[],_ElementDom:HTMLTableSectionElement,tab:string[],_eliminatoire:number):void
{
    const tabsort :student[]= [..._fichierJson].sort((a,b)=> b.grade - a.grade);
    for(let i = 0;i<_fichierJson.length;i++)
    {
        const row : HTMLTableRowElement = nouvelLigne(_ElementDom,tab,false);
        const cells = row.childNodes;
        cells[0].textContent = tabsort[i].fullname.split(" ")[0];
        cells[1].textContent = tabsort[i].fullname.split(" ")[1];
        cells[2].textContent = String(tabsort[i].grade);
        cells[3].textContent = tabsort[i].grade>_eliminatoire ? "Oui" : "Non";
    }
}
// Insertion d'une nouvel ligne
/**
 * @param _ElementDom 
 * @returns 
 */
function nouvelLigne(_ElementDom:HTMLTableSectionElement,_tab:string[],bool:boolean):HTMLTableRowElement
{
    const row : HTMLTableRowElement = _ElementDom.insertRow();
    _tab.forEach(()=>bool ? row.appendChild(document.createElement("th")) : row.insertCell());
    return row;
}
// Verification du Nom et Prénom
/**
 * @param _ElementDom 
 * @returns 
 */
function verifName(_ElementDom:HTMLInputElement):boolean
{
    const regexString = /^[a-zA-Z]{2,}$/;
    const chaine : string[]|boolean = _ElementDom.value.split(" ").length === 2 ? _ElementDom.value.split(" ") : false;
    const bool : boolean = (chaine != false && regexString.test(chaine[0] && chaine[1])) ? true : false;

    return bool;
}
// Verification de la note
/**
 * @param _ElementDom 
 * @returns 
 */
function verifNote(_ElementDom:HTMLInputElement):boolean
{
    const bool : boolean = parseInt(_ElementDom.value)>=0 && parseInt(_ElementDom.value)<=20 ? true : false;
    return bool;
}
// Ajout des information de l'élement UL
/**
 * @param _ElementDom 
 * @param _fichierJson 
 * @param _eliminatoire 
 */
function remplirUl(_ElementDom:HTMLUListElement,_fichierJson:student[],_eliminatoire:number):void
{
    for(let i = 0;i<4;i++)
    {
        const li= document.createElement("li") as HTMLLIElement;
        _ElementDom.appendChild(li);
    }
    const moyenStudent : number = moyen(_fichierJson);
    const nbStudentSupmoyen : number = studentSupMoyen(_fichierJson,moyenStudent);
    const lis = _ElementDom.childNodes;
    lis[0].textContent = `Nombre d'étudiants : ${_fichierJson.length}`;
    lis[1].textContent = `Moyenne de la classe : ${moyenStudent}`;
    lis[2].textContent = `Nombre d'étudiants au dessus de la moyenne : ${nbStudentSupmoyen}`;
    lis[3].textContent = `Note éliminatoire : ${_eliminatoire}`;
}
// Calcule moyen
/**
 * @param _fichierJson 
 * @returns 
 */
function moyen(_fichierJson:student[]):number
{
    const result : number = Number(((_fichierJson.map(s => s.grade).reduce((acc, curr)=> acc + curr,0))/_fichierJson.length).toFixed(2));
    return result;
}
// Recupère le nombre d'étudiant superieur à la moyen
/**
 * @param _fichierJson 
 * @param _moyen 
 * @returns 
 */
function studentSupMoyen(_fichierJson:student[],_moyen:number):number
{
    const test = _fichierJson.filter((e)=>e.grade > _moyen).length;
    return test;
}
// Recuperation JSON
async function extractJson():Promise<student[]>
{
    const data = await fetch("./assets/json/eval.json");
    return data.json();
}
// Programme principal
async function main():Promise<void>
{
    const chargementDom: string = "Erreur chargement d'un élement Dom";
    const tabDom = document.getElementById("tableaux") as HTMLTableElement;
    if(!tabDom) throw new Error(chargementDom);
    const thead : HTMLTableSectionElement = tabDom.createTHead();
    const tbody : HTMLTableSectionElement = tabDom.createTBody();
    const ulDom = document.getElementById("liste") as HTMLUListElement;
    if(!ulDom) throw new Error(chargementDom);
    const inputName = document.getElementById("name") as HTMLInputElement;
    if(!inputName) throw new Error(chargementDom);
    const inputNote = document.getElementById("note") as HTMLInputElement;
    if(!inputNote) throw new Error(chargementDom); 
    const btnForm = document.getElementById("send") as HTMLButtonElement;
    if(!btnForm) throw new Error(chargementDom);

    const json : student[] = await extractJson();
    const titreTab : string[] = ["Nom","Prénom","Note","Obtenue"];
    const noteEliminatoire : number = 12;
    creatThead(titreTab,thead);
    creatTbody(json,tbody,titreTab,noteEliminatoire);
    remplirUl(ulDom,json,noteEliminatoire);
    btnForm.addEventListener("click",() => 
    {
        const tabName : string[] = inputName.value.split(" ");
        tabName[0] = tabName[0][0].toUpperCase() + tabName[0].slice(1).toLowerCase();
        tabName[1] = tabName[1][0].toUpperCase() + tabName[1].slice(1).toLowerCase();

        if(verifName(inputName) && verifNote(inputNote) && json.every((e)=>e.fullname != tabName[0]+" "+tabName[1]))
        {
            json.push({fullname : tabName[0]+" "+tabName[1], grade : parseInt(inputNote.value)});
            console.table(json);
            tbody.replaceChildren();
            creatTbody(json,tbody,titreTab,noteEliminatoire);
            ulDom.replaceChildren();
            remplirUl(ulDom,json,noteEliminatoire);
        }
        else
        {
            inputName.value = "";
            inputName.style.borderColor = "red";
            setTimeout(()=>{inputName.style.borderColor = ""},3000);
            inputNote.value = "0";
            inputNote.style.borderColor = "red";
            setTimeout(()=>{inputNote.style.borderColor = ""},3000);
        }
    });
}
main();