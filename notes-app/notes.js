const fs=require('fs')
const chalk= require('chalk')
const getNotes = () => {
    return "Your notes..."
}

const readNotes = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title===title)
    if(findNote){
        console.log(chalk.green(findNote.title))
        console.log(findNote.body)
    }
    else
        console.log(chalk.red("Note not found"))
        

}

const listNotes = () => {
    const notes=loadNotes()
    if(notes.length!==0){
        console.log(chalk.green("List of notes..."))
        notes.forEach(note => {
            console.log(note.title + " " + note.body)
        })
        console.log(notes.title + " " + notes.body)
    }
    else{
        console.log(chalk.red("No notes present"))
    }
    
}

const removeNotes = (title) => {
    const notes=loadNotes()
    const notetokeep = notes.filter((note) => note.title!==title)

    // const notetokeep = notes.filter(function(note){
    //     return note.title!==title
    // })
    
    saveNotes(notetokeep)
    if(notes.length!==notetokeep.length)
        console.log(chalk.black.bgGreen.bold("Notes removed"))
    else
    console.log(chalk.black.bgRed.bold("Notes not removed"))
}

const addNotes = (title,body) => {
    const notes=loadNotes()
    const duplicatesNotes = notes.filter((note) => note.title==title)
    if(duplicatesNotes.length==0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("New Notes added")
    }
    else{
        console.log("Not added")
    }
    
}
const saveNotes = (notes) => {
    const data=JSON.stringify(notes)
    fs.writeFileSync('notes.json',data)
}

const loadNotes = () => {
    try{
            const dataJSON=fs.readFileSync('notes.json')
            const dataBuffer=dataJSON.toString()
            return JSON.parse(dataBuffer)
    }
    catch(e){
        return []
    }
}

module.exports={
    addNotes: addNotes,
    getNotes: getNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}