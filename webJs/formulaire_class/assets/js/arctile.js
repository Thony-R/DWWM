export class Article
{
    constructor(nom, prixHT,Taux_tva)
    {
        this.nom = nom.value;
        this.prixHT = parseFloat(prixHT.value);
        this.Taux_tva=parseFloat(Taux_tva.value);
    }
    calculPrixTTC()
    {
        let priceTTC = parseFloat(this.prixHT+((this.prixHT* this.Taux_tva)/100)).toFixed(2);
        return priceTTC;
    }
}