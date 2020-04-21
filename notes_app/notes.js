const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();    
    const duplicateNote = notes.find(( note ) => note.title === title );

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.black.bgGreen('New note added'));
    }
    else{
        console.log(chalk.black.bgRed('Unable to add note...title already taken:('));
    }    
}

const removeNote = (title) => {    
    const notes = loadNotes();
    const notesNotRemoved = notes.filter(( note ) => note.title !== title )

    if(notes.length === notesNotRemoved.length){
        console.log(chalk.black.bgRed('Unable to find title...try another'));
    }
    else{        
        saveNotes(notesNotRemoved);
        console.log(chalk.black.bgGreen('Note removed successfully'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes:'));
    notes.forEach( note => {
        console.log('Title: ' + note.title);        
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(( note ) => note.title === title );
    if(!foundNote) console.log(chalk.red.inverse('Sorry...no note found:('));
    else{
        console.log(chalk.cyan.inverse(foundNote.title + ':'));
        console.log(foundNote.body);
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
   try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
   }
   catch(e){
       return [];
   }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}