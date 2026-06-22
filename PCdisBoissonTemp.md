# Pseudo code
## Function
```
Fonction verifCapteurG(capteur_gobelet)

    retourner capteur_gobelet
Fin de fonction
```
## thread spamUser
```
Listener ...
```
## thread ouverture_forcé
``` 
Listener  ....
```
## Var & thread
```
- Pcafe <- 1
- StockGobelet <- 10
- eau <- 10
- cafe <- 50
- Bcafe <- 15
- argent_insere <- 0
- capteurG <- false
- Machine_dispo <- true
- Thread tspam = crée thread spamUser
- thread touvrture = crée thread ouverture_forcé
```
## Debut Programme
```
Démarrer tspam
Démarrer touverture

Répéter
    Si StockGobelet <=0  ou eau <5 ou cafe <1:
        Afficher "Machine indisponible"
    Si Bcafe >20 :
        Afficher "boisson à base de café indisponnible"
    Appel verifCapteurG()
    Si capteurG = true :
        Afficher "machine non
    Afficher "Le prix du café est de "Pcfe"€. Veuilez payer."
    Lire argent_insere
    time <- time.now()

    Si argent_insere<Pcafe :
        Répéter
            Lire argent_insere
            Afficher "Solde insuffisant"
            Si time.now()-time  >= 2 minutes :
                Machine_dispo <- false
        jusqu'à (argent_insere<Pcafe ou !Machine_dispo)
        Si !Machine_dipo :
            break
    Sinon
        Afficher "Préparation en cours ..."
        Stockgobelet <- -1
        capteurG <- true
        Répéter
            Afficher "Récupérer goblet"
        jusqu'à (!capteurG)
        Afficher "Merci et bonne Journée" 

            


Tant que (Machine_dispo)
```


