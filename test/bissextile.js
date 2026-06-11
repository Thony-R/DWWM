
function recup()
{
    const year = document.querySelector("#annee");
    var annee = parseInt(year.value);
    calculB(annee);
    year.value = "";
}
function calculB(ans)
{
    if(ans%4 == 0&&(ans%100!=0||ans%400==0))
    {
        document.querySelector("#resultat").textContent = 'L\'année '+ans+' bissextile';
    }
    else
    {
        document.querySelector("#resultat").textContent = 'L\'année '+ans+' n\'est pas bissextile';
    }
}

document.querySelector("#annee").addEventListener('keyup',function(event)
{
    event.preventDefault();
    if(event.keyCode ===13)
    {
        recup();
    }
});