# Calcul de hautes puissances

Considérons le groupe __G__ sur l'ensemble des chaînes de caractères (dont l'alphabet sont les 26 lettres majuscule de
la langue française) et muni d'une opération commutative notée `mul`.

```js
mul("A", "A") === "A"
mul("B", "A") === "B"
mul("G", "A") === "G"
mul("B", "B") === "C"
mul("G", "B") === "H"
mul("BAC", "TOTOBILL") === mul("BACAAAAA", "TOTOBILL") === "UOVOBILL"
```

Chaque chaîne de caractère peut être considérée comme un nombre en base 26 avec le chiffre de poinds faible à gauche. 
