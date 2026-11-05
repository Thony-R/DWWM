//  Impotation des fonctions
import * as funcForm from "./function";
//  ============================================================================
//  Programme principal
function main():void
{
    // Déclaration des tableaux.
    const tabQ1 : string[] = ["Par l'un de nos client !", "Par relation",
                            "par un support publicitaire", "Par un moteur de recherche", "Par hasard"];
    const tabQ2 : string[] = `un site plaquette, un site communal, un catalogue en ligne, une boutique en ligne (e-commerce), le référencement, de l'e-mailing, un intranet ou extranet, une GED (gestion électronique de document), un relookage de votre site, une formation, la réalisation d'un cahier des charges, un audit accessibilité, le dépôt d'un nom de domaine en .fr, en savoir plus sur la solution ia souveraine`.split(", ");
    //  ============================================================================
    //  Chargement du Dom.
    const q1Dom = document.getElementById("q1") as HTMLSelectElement;
    const q2Dom = document.getElementById("q2") as HTMLSelectElement;
    const form = document.querySelector(".formulaire") as HTMLFormElement;
    const prenomDom = document.getElementById("firstName") as HTMLInputElement;
    const nomDom = document.getElementById("lastName") as HTMLInputElement;
    const soCoDom = document.getElementById("nom") as HTMLInputElement;
    const numDOm = document.getElementById("nbPhone") as HTMLInputElement;
    const messageDom = document.getElementById("message") as HTMLTextAreaElement;
    const mailDom = document.getElementById("email") as HTMLInputElement;
    const checkBox = document.getElementById("rgpd") as HTMLInputElement;
    //  ============================================================================
    //  Remplissage des select option du formulaire.
    funcForm.rQuestion(q1Dom,tabQ1);
    funcForm.rQuestion(q2Dom,tabQ2);
    //  ===========================================================================
    //  Listener du bouton submite. 
    form.addEventListener("submit",(event)=>
    {
        event.preventDefault();
        try 
        {
            if(!funcForm.verifFullName(prenomDom.value.trim())) throw new Error("Prénom pas bon");
            if(!funcForm.verifFullName(nomDom.value.trim())) throw new Error("Nom pas bon");
            if(!funcForm.verifColSo(soCoDom.value.trim())) throw new Error("societe ou colecivite pas bon");
            if(!funcForm.verifNum(numDOm.value.trim())) throw new Error("num pas bon");
            if(!funcForm.verifMess(messageDom.value.trim())) throw new Error("message pas bon");
            if(!funcForm.verifEmail(mailDom.value.trim())) throw new Error("Email pas bon");
            if(!funcForm.verifSelect(q1Dom.value.trim(),tabQ1)) throw new Error("q1 pas bon");
            if(!funcForm.verifSelect(q2Dom.value.trim(),tabQ2)) throw new Error("q2 pas bon");
            if(!checkBox.checked) throw new Error("rgpd pas bon");
        } 
        catch (error) 
        {
            if (error instanceof Error)
            {
                alert(error.message);
            }
        }
    });
}
main()