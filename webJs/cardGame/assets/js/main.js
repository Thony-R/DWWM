const tabInfo=["id","name","level","description","power","attack","armor","damage","mitigation","played","victory","defeat","draw"];
async function api()
{
    try {
        const reponse= await fetch("https://arfp.github.io/tp/web/javascript/03-cardgame/cardgame.json");
        if(!reponse.ok) throw new Error("impossible de recup les données");
        return await reponse.json();
    } catch (error)
    {
        console.log(error.message);
    }
}
/**
 * 
 * @param {*} _elementTable 
 * @param {*} _fichierJson 
 */
function remplirElementTab(_elementTable,_fichierJson)
{
    for(const element of _fichierJson)
    {
        const row = ajoutligne(_elementTable,_fichierJson,false);

        const cells = row.childNodes;
        for (const key in element) 
        {    
            cells[tabInfo.indexOf(key)].textContent =element[key];   
        }
    }
}
/**
 * 
 * @param {*} _elementDom 
 * @param {*} _fichierJson 
 */
function remplirTabH(_elementDom,_fichierJson)
{
    const row = ajoutligne(_elementDom,_fichierJson,true);
    const cells = row.childNodes;
    for(let i=0;i<tabInfo.length;i++)
    {
        cells[i].textContent = tabInfo[i];
    }
}
/**
 * 
 * @param {*} _elementDom 
 * @param {*} _fichierJson 
 * @param {*} _boolean 
 * @returns 
 */
function ajoutligne(_elementDom, _fichierJson,_boolean)
{
    const row = _elementDom.insertRow();
    if(!_boolean)
    {
        for (const key in _fichierJson[0]) 
        {
            row.insertCell();   
        }
    }
    else
    {
        for (const key in _fichierJson[0]) 
        {
            const cellH = document.createElement("th");
            row.appendChild(cellH); 
        }
    }
    return row;
}
async function main()
{   

    const elementTabH= document.querySelector("#tableauHead");
    const elementTabB= document.querySelector("#tableauBody");
    const tabJson = await api();

    console.table(tabJson);
    remplirTabH(elementTabH,tabJson);
    remplirElementTab(elementTabB,tabJson);
}
main();