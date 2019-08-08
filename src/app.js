const path = require('path')
const express = require('express')
const hbs = require('hbs')
 const port = process.env.PORT ||  3000
const app = express()
const geocode = require('./utils/geocode.js')
const forecast =require('./utils/forecast.js')
//define paths for express engine
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')
// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
//setup static directory to serve
app.use(express.static(publicDirectory))

app.get("", (req, res) => {
res.render('index',{
   title: 'Weather' ,
   name: 'Hitimana',
   
})
})


app.get("k", (req, res) => {
res.send({
    name: 'Hitimana',
    age: 26,
    
})
})
 app.get('/help',(req, res) => {
     res.render('help',{
         name: 'If you need help click Help Button',
         title : 'Help'
     })

 })

 app.get('/weather',(req,res) => {
     if(!req.query.address){
         return res.send({
             error: 'you must provide address'
         })
     } 
        geocode(req.query.address, (error, {latitude, longitude, location} = {})  => {

            if (error){
                return  res.send({error})
                
            }
     
    forecast(latitude, longitude,(error, forecastData) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast:forecastData,
            location,
            address: req.query.address
        })
        })
    })
})
    

 app.get('*', (req, res) => {
     res.send('error 404')
 })

app.listen(port, () =>{

    console.log('Application is Listened on port'+port)
})