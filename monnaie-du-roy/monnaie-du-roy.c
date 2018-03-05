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
