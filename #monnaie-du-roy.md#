# La monnaie du Roy

## Force brute

Cet algo permet d'afficher toutes les solutions avec 18 pièces, 17 pièces, ...
Il est exhaustif, mais il est très long. Sur une machine correcte de 2018, il lui faut plus de 12 heures (dans sa version en C) pour trouver toutes les solutions. Les meilleures utilisent 16 pièces.

| 1 | 3 | 5 | 6 | 10 | 14 | 18 | 22 | 26 | 28 | 29 | 31 | 61 | 62 | 67 | 68 |
| 1 | 3 | 4 | 9 | 11 | 16 | 20 | 25 | 30 | 34 | 39 | 41 | 46 | 47 | 49 | 50 |
| 1 | 3 | 4 | 7 |  8 |  9 | 16 | 17 | 21 | 24 | 35 | 46 | 57 | 68 | 79 | 90 |
| 1 | 3 | 4 | 6 | 10 | 14 | 18 | 22 | 26 | 28 | 29 | 31 | 61 | 62 | 67 | 68 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 44 | 47 | 48 | 49 | 51 | 52 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 44 | 46 | 48 | 49 | 51 | 53 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 44 | 46 | 47 | 48 | 49 | 51 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 44 | 45 | 47 | 48 | 49 | 52 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 43 | 44 | 46 | 47 | 48 | 51 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 41 | 45 | 46 | 48 | 49 | 85 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 38 | 41 | 43 | 46 | 47 | 48 | 51 |
| 1 | 3 | 4 | 5 |  8 | 14 | 20 | 26 | 32 | 35 | 41 | 45 | 46 | 48 | 49 | 53 |
| 1 | 2 | 3 | 7 | 11 | 15 | 19 | 23 | 27 | 28 | 29 | 30 | 61 | 64 | 67 | 70 |
| 1 | 2 | 3 | 7 | 11 | 15 | 19 | 23 | 27 | 28 | 29 | 30 | 60 | 63 | 66 | 69 |


### En Python

``` python
def isMissing(n, coins):
	for a in coins:
		if a == n: return False
		for b in coins:
			if a + b == n: return False
	return True

def find(n, m, coins=[], best=18):
	if len(coins) > best: return best
	if n > m:
		print(coins, "->", len(coins))
		return len(coins)
	if not isMissing(n, coins):
		best = find( n + 1, m, coins, best )
	coins.append( n )
	best = find( n + 1, m, coins, best )
	coins.pop()
	return best
```

### En C

Le même algorithme en C est beaucoup plus rapide puisqu'il n'y a aucune réservation de mémoire pour les tableaux.

```C
#include <stdio.h>

void printSolution( int* coins, int size ) {
  printf( "(%i)", size );
  for( int k=0 ; k<size ; k++ ) {
    printf( " %i", coins[k] );
  }
  printf( "\n" );
}

int isFine( int n, int* coins, int size ) {
  int iA, iB, a, b;
  for( iA = 0 ; iA < size ; iA++ ) {
    a = coins[iA];
    if( a == n ) return 1;
    for( iB = iA ; iB < size ; iB++ ) {
      b = coins[iB];
      if( a + b == n ) return 1;
    }
  }
  return 0;
}

int f( int n, int maxN, int* coins, int size, int best ) {
  if( size > best ) return best;
  if( n > maxN ) {
      printSolution( coins, size );
      return size;
  }
  coins[size] = n;
  if( isFine( n, coins, size ) ) {
    best = f( n + 1, maxN, coins, size, best );
  }
  coins[size] = n;
  best = f( n + 1, maxN, coins, size + 1, best );
  return best;
}

void main() {
  int coins[18];
  int best = f( 1, 99, coins, 0, 18 );
  printf( "\n\nBest solution found has a length of %i.\n\n", best );
}
```

## Minimum local

Personne ne nous impose d'obtenir TOUTES les solutions du problème, c'est pourquoi nous pouvons utiliser un algorithme plus rapide qui va se contenter de retourner la première solution qu'il trouve pour un nombre donné de pièces.

Sur une machine correcte de 2018, avec l'algorithme en Python, il trouve la solution suivante en cinq minutes environ : __1, 3, 4, 5, 8, 14, 20, 26, 32, 38, 41, 45, 46, 48, 49, 85__.
Mais parfois, il lui faut plusieurs heures. Mais dans tous nos tests, il est toujours resté sous l'heure.

Le principe est le suivant :
* On génère un ensemble de 16 pièces dont la première est __1__ et les autres sont prises aléatoirement.
* On calcule le  score de cet ensemble,  c'est-à-dire le nombre de  valeurs entre 1 et  99 qu'il est
possible d'atteindre avec au plus deux de ces pièces.
* Si le score est de 99, on a trouvé une solution.
* Sinon, on calcule le score de chaque nouvel ensemble obtenu en modifiant une seule pièce de l'ensemble de départ.
* On garde le meilleur score si celui-ci est supérieur à ce qu'on avait obtenu avant.
* Sinon, on prend au hasard une valeur qu'on ne peut atteindre avec deux pièces et on remplace une de nos pièces (sauf la première qui reste toujours __1__) par cette valeur.
* Et on boucle.

On ajoute aussi un mécanisme qui permet de recommencer avec un tirage aléatoire si le score est redescendu au moins 100 fois.

### En Python

``` python
# -*- coding: utf-8 -*-
import sys
import math
import random

def createCandidate( size, m ):
    candidate = [1]
    while len(candidate) < size:
        n = random.randint(2, m)
        if n not in candidate:
            candidate.append( n )
    candidate.sort()
    return (candidate, score(candidate, m))

def isFine(n, coins):
	for a in coins:
		if a == n: return True
		for b in coins:
			if a + b == n: return True
	return False

def score(coins, m):
    s = 1
    for n in range(2, m + 1):
        if isFine(n, coins):
            s = s + 1
    return s

def improve(coins, m):
    bestCandidate = None
    bestScore = score(coins, m)
    for i in range(1, len(coins)):
        n = coins[i]
        for w in range(2, m + 1):
            if w == n: continue
            if w not in coins:
                coins[i] = w
                s = score( coins, m )
                if s > bestScore:
                    bestScore = s
                    bestCandidate = coins[:]
                    break
                coins[i] = n
    if bestCandidate == None:
        return None
    else:
        bestCandidate.sort()
        return (bestCandidate, bestScore)

def getWhatIsMissing(coins, m):
    result = []
    for n in range(1, m + 1):
        if not isFine(n, coins):
            result.append( n )
    return result

def solve(q=17, m=99):
    candidate = createCandidate(q, m)
    failures = 0
    while candidate[1] < m:
        print( "score =", candidate[1], "    ", candidate[0])
        sys.stdout.flush()
        nextone = improve(candidate[0], m)
        if nextone == None:
            missing = getWhatIsMissing( candidate[0], m )
            print("                Local minimum: ", missing)
            failures = failures + 1
            if failures > 99:
                nextone = createCandidate(q, m)
                failures = 0
            else:
                coins = candidate[0][:]
                coins[random.randint(1, len(coins) - 1)] = missing[random.randint(0, len(missing) - 1)]
                coins.sort()
                nextone = (coins, score(coins, m))
        candidate = nextone
    print("-" * 60)
    champion = candidate[0]
    print( champion )

solve( 16, 99 )
```

----
[Retour](README.md).
