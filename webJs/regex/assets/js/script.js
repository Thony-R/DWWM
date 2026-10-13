const mybtnSubmit= document.getElementById("valider");
const txtName=document.querySelector("#myName");
const chaine1 = document.querySelector("#myPassword1");
const chaine2= document.querySelector("#myPassword2");
const date = document.querySelector("#myBirthDate");
const num = document.querySelector("#myPhone");

mybtnSubmit.addEventListener("click",
    function(event){
        event.preventDefault();

        const myForm=document.querySelector("form");

        try 
        {
            if(validateName(txtName.value)==false) throw new Error("le nom est invalide");
            if(validatePassword(chaine1.value,chaine2.value)==false) throw new Error("mot de passe différents");
            if(!date.value) throw new Error("date non valide");
            let dateV = new Date(date.value);
            if(dateV>new Date()) throw new Error("la date doit être inférieure à celle actuelle");
            if(validateNumber(num.value)==false) throw new Error("numéro de tel invalide");
        } catch (error) 
        {
            alert(error.message);
        }
        myForm.submit();

    }
)
/**
 * 
 * @param {*} chaine 
 */

function validateName(chaine)
{ 
    let regexName=/^[A-Z][a-z]{3,}$/;
    
    return regexName.test(chaine);
}

function validatePassword(chaine1,chaine2)
{
if (chaine1===chaine2) {
    let regexPass=/^(?=(?:.*[A-Z]))(?=(?:.*[0-9]))(?:[a-zA-Z0-9]{9,})$/;
    return regexPass.test(chaine1);
}
return false;
}
function validateNumber(numberPhone)
{
    let phone = String(numberPhone).replaceAll(/.| /g,"");
    let regexphone =/^0[1-79][0-9]{10}$/;
    return regexphone.test(phone);
}
B0njour39100