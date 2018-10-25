# Calcul de hautes puissances

Considérons le groupe __G(E, +)__. `E` est l'ensemble des chaînes de caractères que l'on peut
former à partir de l'alphabet suivant qui comporte 27 caractères : `-ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

Si on retirer toutes ou partie des `-` à droite d'une chaîne, on obtient une chaîne équivalente.
Ainsi, on a par exemple : `CAR--- = CAR-- = CAR- = CAR`.

L'opération `+` produit une chaîne de caractères à partir de deux autres. La production aura la même longueur que la plus grande de ses entrées. Pour obtenir le résultat, on multiplie modulo 27 chaque caractère de même indice. Ainsi, `-` correspond à `0`, `A` à `1`, `B` à `2`, ..., `Z` à `27`.

Par exemple, pour calculer `C + L`, on transform le `C` en `3`, le `L` en `12` et on obtient le résultat `(3 * 12) % 27 = 9` et `9` correspond à `I`. Donc `C + L = I`.
Si une des deux chaînes en entrée est plus longue que l'autre, on ajoute à la droite de la première autant de `A` qu'il faut pour avoir la même longueur.

Ainsi : `NN + Q = NN + QA = VN`.

Voici quelques exemples :

```js
"UFT" + "-W" = "-CT"
"KWF" + "" = "KWF"
"Z-R" + "G-C" = "T--"
"YP" + "IS" = "IG"
"YHUM" + "AJMF" = "YZCX"
"NN" + "Q" = "VN"
"TJ" + "H" = "YJ"
"OMM" + "GKVJ" = "XHPJ"
"PWLI" + "MCN" = "SOFI"
"WINH" + "RUWS" = "I-YQ"
```

Le but de ce défi est de calculer les puissances n-ièmes de chaînes de caractères avec un algorithme en `log(n)`.
Par exemple, `FHEKW ^ 3 = FHEKW + FHEKW + FHEKW = -ZQHQ`.

## Format des fichiers

En entrée, on attend un calcul par ligne respectant l'expression régulière suivante : `[A-Z-]+^[0-9]+`.

Par exemple :
```
YAHOURT^1
BAR^2
FHEKW^3
JERFHAD^7
PUISSANT^1974
```

En sortie, on attend un résultat par ligne, comme dans l'exemple suivant qui est la solution de l'entrée précédente :
```
YAHOURT
DA-
-ZQHQ
JN--HAV
S--AAAJS
```

Remarquez le `-` final sur la deuxième ligne. C'est parce que l'on s'attend à ce que le résultat soit de la même longueur exactement que l'entrée (ici `DA-` a la même longueur que `BAR`).

## défi

* Fichier d'entrée : [high-power.in](high-power.in).
* Résultat attendu : [high-power.out](high-power.out).

La proposition de solution suivante s'exécute en moins de 5 secondes : [high-power.js](high-power.js).
