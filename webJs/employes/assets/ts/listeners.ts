//  Importation des types
import type { data } from "./main"
//  ============================================================================
//  Importation des fonction
import { trieSal,rTbody } from "./main";
//  ============================================================================
// Class listener
export class listener
{
    //  Listener trie salaire
    trieSal(_Btn:HTMLButtonElement,_TBodyDom:HTMLTableSectionElement,_TabTitre:string[],_Data:data[]):void
    {
        _Btn.addEventListener("click",()=>
        {
            if(_Btn.classList.contains("non")||_Btn.classList.contains("trieD"))
            {
                const nTab : data[] = trieSal(_Data,true);

                _Btn.classList.remove("non");
                _Btn.classList.remove("trieD");
                _Btn.classList.add("trie");

                rTbody(_TBodyDom,_TabTitre,nTab);
            }
            else if(_Btn.classList.contains("trie"))
            {
                const nTab : data[] = trieSal(_Data,false);

                _Btn.classList.remove("trie");
                _Btn.classList.add("trieD");

                rTbody(_TBodyDom,_TabTitre,nTab);
            } 
        });
    }
    // ============================================================================
    //  Listner pour supprimer une ligne
    rmLigne(_Btn:HTMLButtonElement,_Row:HTMLTableRowElement):void
    {
        _Btn.addEventListener("click",()=>_Row.remove());
    }
    // ============================================================================
    // Listener pour dupliquer une data
    duplicate(_Btn:HTMLButtonElement):void
    {
        _Btn.addEventListener("click",()=>{console.log("duplicate")})
    }
}