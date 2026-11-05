//  Export des fonction
export
{
    rQuestion,
    verifFullName,
    verifEmail,
    verifColSo,
    verifMess,
    verifNum,
    verifSelect
};

//  ============================================================================
/**
 * Remplit une liste déroulante avec les options.
 * Crée un élément option pour chaque valeur du tableau.
 * @param _Dom - Élément HTML select dans lequel insérer les options.
 * @param _Tab - Tableau contenant les valeurs à ajouter à la liste déroulante.
 */
function rQuestion(_Dom:HTMLSelectElement,_Tab:string[]):void
{
    _Tab.forEach((e):void=>
    {
        const opt = document.createElement("option");
        opt.textContent = e
        _Dom.appendChild(opt);
    })
}
//  ============================================================================
/**
 * Vérifie la validité d'un nom ou prénom à l'aide d'une expression régulière.
 * Accepte uniquement les lettres non accentuées et les mots composés séparés par des tirets.
 * @param _Chaine - Chaîne de caractères contenant le nom ou le prénom à vérifier.
 * @returns true si la chaîne respecte le format attendu, false dans le cas contraire.
 */
function verifFullName(_Chaine:string):boolean
{
    const regex = /^(?=.{3,}$)[a-zA-Z]+(-[a-zA-Z]+)*$/;
    return regex.test(_Chaine);
}
//  ============================================================================
/**
 * Vérifie la validité d'une adresse e-mail à l'aide d'une expression régulière.
 * Accepte les lettres, les chiffres et certains séparateurs dans la partie locale,
 * ainsi que les tirets dans le nom de domaine.
 * @param _Chaine - Chaîne de caractères contenant l'adresse e-mail à vérifier.
 * @returns true si l'adresse respecte le format attendu, false dans le cas contraire.
 */
function verifEmail(_Chaine:string):boolean
{
    const regex = /^[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    return regex.test(_Chaine);
}
//  ============================================================================
/**
 * 
 * @param _Chaine 
 * @returns 
 */
function verifColSo(_Chaine:string):boolean
{
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,28}[a-zA-Z0-9]$/;
    return regex.test(_Chaine);    
}
//  ============================================================================
/**
 * Vérifie la validité d'une chaîne destinée à représenter un identifiant de colonne.
 * Accepte les lettres, les chiffres et les tirets, sans autoriser ces derniers en début ou en fin de chaîne.
 * @param _Chaine - Chaîne de caractères contenant l'identifiant à vérifier.
 * @returns true si la chaîne respecte le format attendu, false dans le cas contraire.
 */
function verifMess(_Chaine:string):boolean
{
    const regex = /^[^><"]{1,3000}$/;
    return regex.test(_Chaine);
}
//  ============================================================================
/**
 * Vérifie la validité d'un numéro de téléphone au format français.
 * Accepte uniquement les numéros commençant par 0, suivis de 9 chiffres,
 * avec un deuxième chiffre compris entre 1 et 9.
 * @param _Chaine - Chaîne de caractères contenant le numéro de téléphone à vérifier.
 * @returns true si le numéro respecte le format attendu, false dans le cas contraire.
 */
function verifNum(_Chaine:string):boolean
{
    const regex = /^[0][1-9][0-9]{8}$/;
    return regex.test(_Chaine);
}
//  ============================================================================
/**
 * Vérifie si une valeur appartient à la liste des choix autorisés.
 * @param _Chaine - Chaîne de caractères contenant la valeur à vérifier.
 * @param tabQ1 - Tableau contenant les valeurs autorisées.
 * @returns true si la valeur est présente dans le tableau, false dans le cas contraire.
 */
function verifSelect(_Chaine:string,tabQ1:string[]):boolean
{
    if(tabQ1.includes(_Chaine))
    {
        return true;
    }
    return false;
}