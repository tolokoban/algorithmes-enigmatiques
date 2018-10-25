"use strict";

const
    Fs = require( "fs" ),
    Readline = require( 'readline' );

if ( process.argv.length !== 4 ) {
    console.error( "Il me faut deux arguments : le nom du fichier d'entrée et celui du fichier de sortie." );
    process.exit( 1 );
}

const [ , , inputFilename, outputFilename ] = process.argv,
    inputStream = Readline.createInterface( {
        input: Fs.createReadStream( inputFilename ),
        terminal: false
    } ),
    outputStream = Fs.createWriteStream( outputFilename );

exports.on = function ( processLine ) {
    inputStream.on( 'line', processLine );
}

exports.flushLine = function ( line ) {
    outputStream.write( line );
    outputStream.write( "\n" );
}

exports.flush = function ( text ) {
    outputStream.write( text );
}