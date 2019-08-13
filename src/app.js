const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode')

const app = express()
const port = process.env.PORT || 3001

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

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
        name: 'Gennaro Oriolo',
        helpText: 'This is a help message.'
    })
})

app.get('/weather', async (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const data = await geocode.getWeather(req.query.address)
    const forecast = data.forecast
    const location = data.location
    const error = data.error

    if (error) {
        res.send({
            error
        })
    } else {
        res.send({
            address: req.query.address,
            location,
            forecast
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        error: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        error: '404 page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})