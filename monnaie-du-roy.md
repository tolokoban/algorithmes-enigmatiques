# La monnaie du Roy

## Force brute

Cet algo permet d'afficher toutes les solutions avec 18 pièces, 17 pièces, ...
Il est exhaustif, mais il est très long.

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

Le même algorithme en C est beaucoup plus rapide. Pourtant il peine à descendre sous les 17.

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

## Algorithme génétique

Supposons que l'on cherche une solution avec __q__ pièces.
On se rend vite compte que la pièce __1__ est indispensable.
Si on voulait tester tous les tirages de 16 nombres parmis 98, on aurait plus d'un million de milliard de combinaisons ! Ça explique pourquoi la force brute est en difficulté.

Nous tentons donc une autre approche qui vise à trouver une solution pour un nombre de pièces données.

On commence par générer une population de 100 candidats générés aléatoirement (mais avec un __1__ comme première plièce). Ensuite, on leur attribut un score qui correspond au nombre de valeurs que l'on peut faire avec deux pièces. On ne garde que les 25 meilleurs. Puis on __croise__ deux fois chacun de ses 25 champions avec leur n + 1 respectif.
On a donc 75 candidats et il faut en générer 25 autres de façon aléatoire.

__Croiser__ deux candidats revient à générer une liste de pièces en gardant ce qu'ils ont en commun,
puis en prenant aléatoirement dans l'un et l'autre des parents.

Par exemple :
* `[1,3,6,7]` (parent 1)
* `[1,2,3,5]` (parent 2)

On garde ce qui est commun: `[1,3]`. Puis on prend dans le reste en alternant aléatoirement :
* `[6,7]` (reste du parent 1)
* `[2,5]` (reste du parent 2)
* `[2,7]` (mélange pour l'enfant)

On obtient alors `[1,3,2,7]` que l'on tri pour obtenir `[1,2,3,7]`.

### En Python

----
[Retour](README.md).
