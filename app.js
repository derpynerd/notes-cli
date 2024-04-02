import yargs from "yargs";
import fs from "fs";
import { addNote, removeNote } from './notes.js';

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
            category: {
                describe: 'Note or Checklist',
                type: 'string' // by default -> note
            }
        },
        function(argv) { //handler
            addNote(argv.title, (argv.catgory === null ? 'Note' : argv.category))
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
    .command('view', 'View notes', () => {
        viewNotes()
    })
    .parse()
