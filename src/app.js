const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static Directory Path
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arun A'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arun A'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help',
        title: 'Help',
        name: 'Arun A'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
    
            console.log(location)
            console.log(forecastData)
        })
    })
})

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    // res.send('Help Article not found')
    res.render('404', {
        errorMessage: 'Help Article not found',
        title: '404',
        name: 'Arun A'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'My 404 Error page',
        title: '404',
        name: 'Arun A'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
})