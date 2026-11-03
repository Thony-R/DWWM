//  Importation des types
import { data } from "./type";
//  ============================================================================
//  Importation des fonctions
import { trieSal,rTbody } from "./function";
//  ============================================================================
// Class listener
export class listener
{
    /**
     * Ajoute un événement permettant de trier les employés par salaire.
     * Le tri alterne entre croissant, décroissant et ordre initial.
     * @param _Btn - Bouton déclenchant le changement de tri.
     * @param _TBodyDom - Élément HTML tbody contenant les employés.
     * @param _TabTitre - Tableau des intitulés des colonnes.
     * @param _Data - Données initiales des employés.
     * @param _tfootDom - Élément HTML tfoot contenant les totaux.
     */
    trieSal(_Btn:HTMLButtonElement,_TBodyDom:HTMLTableSectionElement,_TabTitre:string[],_Data:data[],_tfootDom:HTMLTableSectionElement):void
    {
        _Btn.addEventListener("click",()=>
        {
            if(_Btn.classList.contains("non"))
            {
                const nTab : data[] = trieSal(_Data,true);

                _Btn.classList.remove("non");
                _Btn.classList.add("trie");

                rTbody(_TBodyDom,_TabTitre,nTab,_tfootDom);
            }
            else if(_Btn.classList.contains("trie"))
            {
                const nTab : data[] = trieSal(_Data,false);

                _Btn.classList.remove("trie");
                _Btn.classList.add("trieD");

                rTbody(_TBodyDom,_TabTitre,nTab,_tfootDom);
            }
            else
            {
                _Btn.classList.remove("trieD");
                _Btn.classList.add("non");
                rTbody(_TBodyDom,_TabTitre,_Data,_tfootDom);
            }
        });
    }
    //  =============================================================================
    /**
     * Ajoute un événement permettant de supprimer un employé du tableau.
     * @param _Btn - Bouton déclenchant la suppression.
     * @param _Row - Ligne HTML correspondant à l'employé.
     * @param _Emp - Objet représentant l'employé à supprimer.
     * @param _Data - Tableau contenant l'ensemble des employés.
     */
    rmLigne(_Btn:HTMLButtonElement,_Row:HTMLTableRowElement,_Emp:data,_Data:data[]):void
    {
        _Btn.addEventListener("click",()=>
        {
            const indice = _Data.indexOf(_Emp);
            _Data.splice(indice,1);
            _Row.remove();
        });

    }
    //  ============================================================================
    /**
     * Ajoute un événement permettant de dupliquer un employé dans le tableau.
     * La copie est insérée immédiatement après l'employé d'origine avec un nouvel identifiant.
     *
     * @param _Btn - Bouton déclenchant la duplication.
     * @param _Emp - Objet représentant l'employé à dupliquer.
     * @param _Data - Tableau contenant l'ensemble des employés.
     * @param _TabTitre - Tableau contenant les intitulés des colonnes.
     * @param _TBodyDom - Élément HTML tbody contenant les lignes des employés.
     * @param _tfootDom - Élément HTML tfoot contenant les informations de pied de tableau.
     */
    duplicate(_Btn:HTMLButtonElement,_Emp:data,_Data:data[],_TabTitre:string[],_TBodyDom:HTMLTableSectionElement,_tfootDom:HTMLTableSectionElement):void
    {
        _Btn.addEventListener("click",()=>
        {
            const newEmp : data = {..._Emp};
            const newData : data[] = [..._Data].sort((a,b)=>b.id - a.id);
            newEmp.id = newData[0].id+1;
            _Data.splice((_Data.indexOf(_Emp)+1),0,newEmp);
            rTbody(_TBodyDom,_TabTitre,_Data,_tfootDom);
        });
    }
}