const datalist = document.getElementById("ville");
const btnValid = document.getElementById("valid");

async function zipcode() 
{
    let api = await fetch("https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json").then(reponse => reponse.json());
    return api; 
}
function ajoutOption(donné)
{
    donné.forEach(element => {
        const option = document.createElement("option");
        option.value = `${element.codePostal},${element.nomCommune}`;
        datalist.appendChild(option);
    });
}
function searchinput(donné)
{
    const saisi = document.getElementById("saisiVille");
    const tabSaisi = saisi.value.split(",");
    for (const element of donné) 
    {
        if(element.codePostal === tabSaisi[0] && element.nomCommune)
        {
            return element;
        }
    }
    saisi.value = "";
    return false;
}
async function createCards(ville)
{
    const article = document.getElementById("resultVille");
    const imgObjet = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${ville.nomCommune}&origin=*`).then(reponse=> reponse.json());
    const url = imgObjet.query.pages[0].original.source;
    article.style.backgroundImage = "url('"+url+"')";
    article.style.backgroundSize = "cover";
}
async function main()
{
    const datas = await zipcode();
    ajoutOption(datas);

    btnValid.addEventListener("click",async (event)=>
    {
        event.preventDefault();
        const result = searchinput(datas);
        if(result != false)
        {
            createCards(result);
            console.log(result);
        }
        else
        {
            
            alert("cette ville n'est pas dans la base de donnée");
        }
    })
}
main();

