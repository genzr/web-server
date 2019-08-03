const path = require('path')
const express = require('express')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine 
app.set('view engine', 'hbs')

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gennaro Oriolo'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Gennaro Oriolo'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a help message.'
    })
})

app.get('/weather', (req,res) => {
    res.send({
        forecast: '30 degrees',
        location: 'Brisbane'
    })
})

app.get('/', (req, res) => {

})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})