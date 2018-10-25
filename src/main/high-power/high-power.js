"use strict";

const Boilerplate = require( "../boilerplate" );

Boilerplate.on( function ( line ) {
    const [ x, n ] = parse( line ),
        result = pow( strToArr( x ), n );
    flushArray( result );
    console.log( x, '^', n, "=" );
    console.log( result.map( n => ALPHABET.charAt( n ) ).join( '' ) );
    console.log();
} );


const ALPHABET = "-ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function parse( line ) {
    const result = line.split( "^" );
    return [ result[ 0 ], parseInt( result[ 1 ], 10 ) ];
}


function strToArr( x ) {
    const arr = Array( x.length );
    for ( let k = 0; k < x.length; k++ ) {
        arr[ k ] = ALPHABET.indexOf( x.charAt( k ) );
    }
    return arr;
}


function flushArray( arr ) {
    for ( let k = 0; k < arr.length; k++ ) {
        Boilerplate.flush( ALPHABET.charAt( arr[ k ] ) );
    }
    Boilerplate.flush( "\n" );
}


/**
 * @returns {Array} Un nouveau tableau est alloué dont la taille est `max(_a.length, _b.length)`.
 */
function ope( _a, _b ) {
    const
        a = _a.length < _b.length ? _b : _a,
        b = _a.length < _b.length ? _a : _b,
        lenA = a.length,
        lenB = b.length,
        lenC = lenA,
        // Copie de a.
        c = Array( lenC );

    for ( let idxC = 0; idxC < lenC; idxC++ ) {
        const
            valA = a[ idxC ],
            valB = idxC < lenB ? b[ idxC ] : 1,
            valC = valA * valB;

        c[ idxC ] = valC % ALPHABET.length;
    }

    return c;
}


function pow( x, n ) {
    if ( n === 1 ) return x;
    const
        half = Math.floor( n * 0.5 ),
        rest = n - ( 2 * half ),
        next = pow( x, half ),
        next2 = ope( next, next );
    if ( rest === 0 ) return next2;
    return ope( next2, x );
}