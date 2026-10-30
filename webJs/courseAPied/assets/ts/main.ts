type dataJson = {nom : string; pays : string; temps : number};
type data = {nom :string;prenom:string;pays:string;temps : number};
type pays = {pays : string;bool:boolean};

// Formatage du json
/**
 * @param _json 
 * @returns 
 */
function formatageJson(_json:dataJson[]):data[]
{
    return _json.map(e=>
    {
        const tabName : string[] = e.nom.split(" ");
        return {...e,
            nom : tabName[0],
            prenom : tabName[1]
    }});
}
// Trie de la donnés
/**
 * @param _data 
 * @returns 
 */
function triedata(_data:data[]):data[]
{
    const trieJson : data[] = _data.map(e => e).sort((a,b)=> a.temps-b.temps); 
    return trieJson;
}
// trie des pays par ordre alphabetique
/**
 * @param _tab 
 * @returns 
 */
function triePays(_tab:pays[]):pays[]
{
    const tab : pays[] = [..._tab].sort((a,b)=> a.pays.localeCompare(b.pays)) 
    return tab;
}
// Remplissage de la div avec le nombre de participants && le gagnant
/**
 * @param _json 
 * @param _ElementDom 
 */
function infoCourse(_data:data[],_ElementDom:HTMLDivElement):void
{
    const participants : HTMLSpanElement = document.createElement("span");
    participants.textContent = _data.length > 1 ?`${_data.length} participants`:`${_data.length} participant`;
    _ElementDom.appendChild(participants);
    const gagnant : HTMLSpanElement = document.createElement("span");
    const trieJson : data[] = triedata(_data);
    gagnant.textContent = `Gagnant : ${trieJson[0].prenom} ${trieJson[0].nom}`;
    _ElementDom.appendChild(gagnant);

}
// Ajout Thead && Remplissage
/**
 * @param _ElementDom 
 * @param _tabTitre 
 */
function ajoutThead(_ElementDom:HTMLTableElement,_tabTitre:string[]):void
{
    const thead : HTMLTableSectionElement = _ElementDom.createTHead();
    const row : HTMLTableRowElement = nouvelLigne(thead,true,_tabTitre);
    const cells = row.childNodes;
    for(let i = 0;i<_tabTitre.length;i++)
    {
        cells[i].textContent = _tabTitre[i];
    }
}
// Ajout du Tbody && Remplissage
/**
 * @param _data 
 * @param _ElementDom 
 * @param _tabTitre 
 */
function ajoutTbody(_data:data[],_ElementDom:HTMLTableElement,_tabTitre:string[]):void
{
    const tbody : HTMLTableSectionElement = _ElementDom.createTBody();
    const trieJson : data[] = triedata(_data);
    for(const element of trieJson)
    {
        const row : HTMLTableRowElement = nouvelLigne(tbody,false,_tabTitre);
        const cells = row.childNodes;
        cells[0].textContent = element.pays;
        cells[1].textContent = element.nom;
        cells[2].textContent = element.prenom;
        cells[3].textContent = convertion(element.temps);
    }
}
// Affichage des filtre
/**
 * @param _data 
 * @param _ElementDom 
 */
function filtre(_data:data[],_ElementDom:HTMLDivElement):void
{
    const tabPays : pays[] = triePays(pays(_data));
    const form : HTMLFormElement = document.createElement("form");
    const titreForm : HTMLHeadingElement = document.createElement("h2");
    titreForm.textContent = "Filtrer";
    form.appendChild(titreForm);
    const div : HTMLDivElement = document.createElement("div");
    form.appendChild(div);
    tabPays.forEach(e => {
        const label = div.appendChild(document.createElement("label"));
        label.textContent = e.pays;
        const checkBox = document.createElement("input");
        checkBox.type="checkBox";
        checkBox.value = e.pays;
        label.appendChild(checkBox);
        // checkBox.addEventListener("click",()=>ajoutTbody(_data,);console.log(checkBox.checked + " " +checkBox.value));
    })
    _ElementDom.after(form);
}
// Construction tableaux des pays
/**
 * @param _data 
 * @returns 
 */
function pays(_data:data[]):pays[]
{
    const x : pays[] =[];
    for (const element of _data) 
    {
        if(!x.some(test => test.pays === element.pays))
        {
            x.push({pays:element.pays,bool:false});
        }
    }
    return x;
}
// Convertion du temps en seconde en minutes
/**
 * @param _nb 
 * @returns 
 */
function convertion(_nb:number):string
{
    const minutes: number = Math.floor(_nb / 60);
    const seconds : number = _nb - 60 * minutes;
    const temp : string = seconds>10 ? `${minutes}min${seconds}s` : `${minutes}min0${seconds}s`;
    return temp;
}
// Création d'une ligne
/**
 * @param _ElementDom 
 * @param _bool 
 * @param _tabTitre 
 * @returns 
 */
function nouvelLigne(_ElementDom:HTMLTableSectionElement,_bool:boolean,_tabTitre:string[]):HTMLTableRowElement
{
    const row = _ElementDom.insertRow();
    if(_bool)
    {
        _tabTitre.forEach(e => row.appendChild(document.createElement("th")));
    }
    else
    {
        _tabTitre.forEach(e => row.insertCell());
    }
    return row;
}
// Recup du json
async function recupJson(): Promise<data[]>
{
    const info = await fetch("./assets/json/resultat10000metres.json").then(reponse => reponse.json());
    return info;
}
// Programme principal
async function main() 
{
    const chargementDom : string = "Erreur lors du chargement de l'élement du Dom"
    const divInfoDom = document.getElementById("infoCourse") as HTMLDivElement;
    if(!divInfoDom) throw new Error(chargementDom);
    const tabDom = document.getElementById("tableaux") as HTMLTableElement;
    if(!tabDom) throw new Error(chargementDom);
    const tabJson : dataJson[] = await recupJson();
    const data : data[] = formatageJson(tabJson);
    const tabTitre : string[] = ["Pays","Nom","Prénom","Temps final"];

    infoCourse(data,divInfoDom);
    filtre(data,divInfoDom);
    ajoutThead(tabDom,tabTitre);
    ajoutTbody(data,tabDom,tabTitre);
}
main();