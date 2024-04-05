import yargs from "yargs";
import { addNote, removeNote, readNote, listNotes } from './notes.js';

yargs(process.argv.slice(2))
    .command(
        'add', //command
        'Add new note', //description
        { 
            title: { //builder
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note data',
                type: 'string' 
            }
        },
        function(argv) { //handler
            addNote(argv.title, argv.body)
        }
    )
    .command(
        'remove', 
        'Remove note', 
        {
            title: {
                describe: 'Note title to uniquely identify note',
                demandOption: true,
                type: 'string'
            }
        },
        function(argv) {
            removeNote(argv.title)
        }
    )
    .command(
        'read', 
        'Read a specific note using note title', 
        {
            title: {
                describe: 'Note title to uniquely identify note',
                demandOption: true,
                type: 'string'
            }
        },
        function(argv) {
            readNote(argv.title)
        }
    )    
    .command('list', 'List all note titles', () => {
        listNotes()
    })
    .parse()
