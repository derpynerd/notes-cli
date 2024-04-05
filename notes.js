import fs from 'fs';
import chalk from 'chalk';

const notes_file_name = 'notes.json'

const addNote = function(title, body) {
    const storedNotes = loadNotes()
    const duplicateNotes = storedNotes.filter(function(note) {
        return (note.title === title)   // if any stored note has title same as note trying to be added return true 
    })                                  // i.e. add to duplicateNotes array 

    if (duplicateNotes.length === 0) { // if duplicateNotes array is empty then no duplicates found
        storedNotes.push({
            title: title,
            body: body
        })
        saveNotes(storedNotes)
        console.log(`Note "${title}" added successfully`)
    } else {
        console.log('Duplicate title found, aborting...')
    }
}

const removeNote = function(title) {
    var storedNotes = loadNotes()
    const exists = storedNotes.filter(function(note) {
        return (note.title === title)
    })

    if (exists.length != 0) {
        storedNotes = storedNotes.filter((note) => (note.title !== title))  // if storedNotes.title === title then filter out field
        saveNotes(storedNotes)                                              // i.e. (remove object)
        console.log(`Note "${title}" removed successfully`)
    } else {
        console.log('Note with given title does not exist')
    }
}

const listNotes = function() {
    const storedNotes = loadNotes()

    storedNotes.forEach((note) => {
        console.log(chalk.green.bold.underline(note.title) + ' - ' + chalk.whiteBright.italic(note.body))
    })
}

/* Helper Functions */
const saveNotes = function(notes) {
    const notesString = JSON.stringify(notes)
    fs.writeFileSync(notes_file_name, notesString)
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync(notes_file_name)
        const dataString = dataBuffer.toString()
        const dataJson = JSON.parse(dataString)
        return dataJson
    } catch (error) {
        return []
    }
}


export { addNote, removeNote, listNotes }