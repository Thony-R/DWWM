//  Importation des types
import { data } from "./type";
//  ============================================================================
//  Importation des fonctions 
import { rTbody, rThead } from "./function";

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
    const tfooter : HTMLTableSectionElement = tabDom.createTFoot();
    // ============================================================================
    //  declaration des variables
    const data : data[] = await recupJson();
    const tabTitre : string[] =["EID","Full Name","Email","Monthly salary","Yeard of birth","Actions"];
    //  ============================================================================
    // Fonction principal
    rThead(thead,tabTitre,data,tbody,tfooter);
    rTbody(tbody,tabTitre,data,tfooter);
}
main();