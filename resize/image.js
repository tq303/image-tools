#! /usr/bin/env node

'use strict';

let gm      = require('gm'),
    colour  = require('colour'),
    program = require('commander');

// process commander functions
let fn = {
    splitDimensions: val => {

        let dimensions = {};

        if (val.indexOf('x') === -1) {
            dimensions = {
                width: val
            }
        } else {
            dimensions = {
                width: val.split('x')[0],
                height: val.split('x')[1]
            }
        }

        return dimensions;
    }
};

// set commander inputs
program
    .version('0.0.1')
    .option('-i, --input [value]', 'Input filename')
    .option('-d, --dimensions <a>x<b>', 'Dimensions {width}x{height}', fn.splitDimensions)
    .option('-c, --constrain', 'Constrain Dimension, remove aspect ratio')
    .option('-o, --output [type]', 'output file name')
    .parse(process.argv);

if (!program.input)      throw 'No filename provided';
if (!program.dimensions) throw 'No dimensions provided';

if (!program.constrain) program.constrain = false
if (!program.output)    program.output = `resized.${program.input.split('.')[1]}`;

// resize
if (program.constrain) {

    gm(program.input)
    .resize(program.dimensions.width, program.dimensions.height)
    .write(program.output, (err)=> {
        if (!err) {
            console.log('resize successfull');
        }
    });

} else {

    gm(program.input)
    .resize(program.dimensions.width)
    .write(program.output, (err)=> {
        if (!err) {
            console.log('resize successfull');
        }
    });

}
