const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const paritalViewsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(paritalViewsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

//#region Express for Beginners - Basics
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help',(req,res)=>{

//     res.send([
//         {name:'Devni'},
//         {name: 'Shavindra'}
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h2>About page</h2>')
// })

//#endregion


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Devni Heraliyawala'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Devni Heraliyawala'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Devni Heraliyawala',
        helpText: 'This is helper text'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    console.log(req.query.address)


    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { foreCastSummary }) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                address: req.query.address,
                forecast: foreCastSummary
            })
        })
    })














    // geoCode(req.query.address, (error, { latitude, longitude, location }) => {

    //     if (error) {
    //         return res.send({ error })
    //     }

    //     forecast(latitude, longitude, (error, forecastData) => {

    //         if (error) {
    //             return res.send({ error })
    //         }

    //         res.send({
    //             location,
    //             forecastData,
    //             address: req.query.address
    //         })
    //     })
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Devni Heraliyawala',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Devni Heraliyawala',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port: 3000')
})