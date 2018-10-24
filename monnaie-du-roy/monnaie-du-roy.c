#include <stdio.h>

void printSolution( int* coins, int size ) {
  printf( "(%i)", size );
  for( int k=0 ; k<size ; k++ ) {
    printf( " %i", coins[k] );
  }
  printf( "\n" );
}

int isMissing( int n, int* coins, int size ) {
  int iA, iB, a, b;
  for( iA = 0 ; iA < size ; iA++ ) {
    a = coins[iA];
    if( a == n ) return 0;
    for( iB = iA ; iB < size ; iB++ ) {
      b = coins[iB];
      if( a + b == n ) return 0;
    }
  }
  return 1;
}

int f( int n, int maxN, int* coins, int size, int best ) {
  if( n > maxN ) {
    if( size <= best ) {
      printSolution( coins, size );
      return size;
    } else {
      return best;
    }
  }
  if( isMissing( n, coins, size ) ) {
    coins[size] = n;
    best = f( n + 1, maxN, coins, size + 1, best );
  } else {
    coins[size] = n;
    best = f( n + 1, maxN, coins, size + 1, best );
    int best2 = f( n + 1, maxN, coins, size, best );
    if( best2 < best ) best = best2;
  }
  return best;
}

void main() {
  int coins[18];
  int best = f( 1, 99, coins, 0, 18 );
  printf( "\n\nBest solution found has a length of %i.\n\n", best );
}
