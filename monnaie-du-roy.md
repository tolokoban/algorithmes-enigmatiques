# La monnaie du Roy

```C
void f( int n, int maxN, int* coins, int size, int best ) {
  if( n> maxN ) {
    if( size <= best ) {
      printSolution( coins, size );
      return size;
    } else {
      return best;
    }
  }
  
}
```


----
[Retour](README.md).
