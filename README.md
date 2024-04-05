# notes-cli
A CLI application to manage &amp; view notes written in Javascript using Node.js

> Pre-requisites
- Node.js 

> Installation
- Clone the repo on your machine
- Run `npm install` via terminal in the directory where the repo was cloned

> Running the program
- Adding a new note is as simple as running `node app.js add --title='note_title' --body='[insert note body]'`
- To remove an existing note, run `node app.js remove --title='note_title'`
- To read any note, run `node app.js read --title='note_title'`
- To list all stored notes, run `node app.js list`

> Note that `note_title` can be anything as long as it is a string value 
