const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const port = process.env.PORT || 3000

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

hbs.registerPartials(partialPath)

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anupama Bauri'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anupama Bauri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Anupama Bauri'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please provide the address'
        })
    }
    const input = req.query.search
    geocode(input, (error, {latitude,longitude,location}={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })

    // res.render('weather',{
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg:'Help article not found',
        name:'Anupama Bauri'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'404 page! Page not Found',
        name:'Anupama Bauri'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})