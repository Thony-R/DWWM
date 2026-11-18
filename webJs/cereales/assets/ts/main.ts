type data = {id:number;name:string;calories:number;protein:number;sodium:number;fiber:number;carbo:number;sugars:number;potass:number;vitamins:number;rating:string};
//  ============================================================================
function calcNS(_nb:number):string
{
    if(_nb>80)
    {
        return "A";
    }
    else if(_nb>70 && _nb<80)
    {
        return "B";
    }
    else if(_nb>55 && _nb<70)
    {
        return "C"
    }
    else if(_nb>35 && _nb<55)
    {
        return "D"
    }
    else
    {
        return "E"
    }
}
//  ============================================================================
function rThead(_Dom:HTMLTableSectionElement,_Tab:string[]):void
{
    const row = crRows(_Dom,_Tab,true);
    const cells = row.children;

    for(let i=0;i<_Tab.length;i++)
    {
        cells[i].textContent = _Tab[i]; 
    }
}
//  ============================================================================
function rTbody(_Dom:HTMLTableSectionElement,_Tab:string[],_Data:data[],_DataRecherche?:data[]):void
{
    _Dom.replaceChildren();
    const tab : data[] = _DataRecherche ? _DataRecherche : _Data;
    tab.forEach((element) => 
    {
        const row = crRows(_Dom,_Tab,false);
        const cells = row.children as HTMLCollectionOf<HTMLTableCellElement> ;
        cells[0].textContent = String(element.id);
        cells[1].textContent = element.name;
        cells[2].textContent = String(element.calories);
        cells[3].textContent = String(element.protein);
        cells[4].textContent = String(element.sodium);
        cells[5].textContent = String(element.fiber);
        cells[6].textContent = String(element.carbo);
        cells[7].textContent = String(element.sugars);
        cells[8].textContent = String(element.potass);
        cells[9].textContent = String(element.vitamins);
        cells[10].textContent = element.rating;
        cells[11].textContent = calcNS(Number(element.rating));
        cells[11].className = `nS__${cells[11].textContent}`;
        cells[12].textContent = "X";
        cells[12].addEventListener("click",()=>
        {
            row.remove();
            const index = _Data.indexOf(element);
            _Data.splice(index,1);
        })
    });
}
//  ============================================================================
function crRows(_Dom:HTMLTableSectionElement,_Tab:string[],_Bool:boolean):HTMLTableRowElement
{
    const row = _Dom.insertRow()
    const balise : string = _Bool ? "th" : "td";
    _Tab.forEach(e=>
    {
        const cell = document.createElement(balise);
        row.appendChild(cell);  
    })
    return row;
}
//  ============================================================================
async function rJson():Promise<data[]> 
{
    const dataJson = await fetch("https://arfp.github.io/tp/web/javascript2/10-cereals/cereals.json").then(reponse=>reponse.json());
    return dataJson.data;
}
//  ============================================================================
async function main():Promise<void>
{
    const donne : data[] = await rJson();
    const tabTitre : string[] = ["id","nom","calories","proteïnes","sel","fibres","glucides","sucre","potassium","vitamines","évaluation","ns","del"];
    const tabDom = document.getElementById("table") as HTMLTableElement;
    const theadDom = tabDom.createTHead();
    const tbodyDom = tabDom.createTBody();
    const inputRecherche = document.getElementById("recherche") as HTMLInputElement;
    rThead(theadDom,tabTitre);
    rTbody(tbodyDom,tabTitre,donne);

    inputRecherche.addEventListener("input",()=>
    {
        const result = donne.filter(el=>el.name.toLowerCase().includes(inputRecherche.value.toLowerCase()))
        rTbody(tbodyDom,tabTitre,donne,result);
    })
}
main();