import fs from 'fs';
import chalk from 'chalk';

const notes_file_name = 'notes.json' /* File name of locally stored notes can be configured here */

const addNote = function(title, body) {
    const storedNotes = loadNotes()
    const duplicateNote = storedNotes.find((note) => (note.title === title)) /* find if duplicate note title exists */

    if (duplicateNote === undefined) { /* no duplicate present */
        storedNotes.push({
            title: title,
            body: body
        })
        saveNotes(storedNotes)
        console.log(chalk.green.bold(`Note "${title}" added successfully`))
    } else {
        console.log(chalk.red.bold('Duplicate title found, aborting...'))
    }
}

const removeNote = function(title) {
    var storedNotes = loadNotes()
    const exists = storedNotes.find((note) => (note.title === title)) /* find if note with given title exists */

    if (exists !== undefined) {
        storedNotes = storedNotes.filter((note) => (note.title !== title))  // if storedNotes.title === title then filter out field
        saveNotes(storedNotes)                                              // i.e. (remove object)
        console.log(chalk.green.bold(`Note "${title}" removed successfully`))
    } else {
        console.log(chalk.red.bold('Note with given title does not exist'))
    }
}

const readNote = function(title) {
    const storedNotes = loadNotes()
    const readingNote = storedNotes.find((note) => (note.title === title)) /* find if note with given title exists */

    if (readingNote !== undefined) {
        console.log(chalk.blue.bold.underline(readingNote.title) + ' - ' + chalk.whiteBright.italic(readingNote.body))
    }
    else {
        console.log(chalk.red.bold('Note with given title does not exist'))
    }
}

const listNotes = function() {
    const storedNotes = loadNotes()

    storedNotes.forEach((note) => {
        console.log(chalk.yellowBright.bold.underline(note.title))
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

/* Exported functions */
export { addNote, removeNote, readNote, listNotes }