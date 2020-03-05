const notes=require('./notes.js')
const yargs=require('yargs')
const chalk= require('chalk')
const msg=notes.getNotes()

yargs.command({
    command: 'add',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    body: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
    },
    handler(argv){
        notes.addNotes(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command: 'list',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})
yargs.parse()
//console.log(yargs.argv)
















// const fs=require('fs')
// //fs.writeFileSync('notes.txt','First Node.js code')
// fs.appendFileSync('notes.txt',' Written in javascript')
