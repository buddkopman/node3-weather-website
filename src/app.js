const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const viewPath = path.join(__dirname, "../templates/views");
const pubDir = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// set static directory to serve
app.use(express.static(pubDir));

app.get('', (req, res) => 
{
    res.render('index', 
        {
           title: "Weather App",
           name: "Budd Kopman" 
        });
});

app.get('/about', (req, res) => 
{
    res.render('about', 
        {
            title: "About Me",
            name: "Budd Kopman" 
        }
     );
});

app.get('/help', (req, res) => 
{
    res.render('help', 
        {
            helpMsg: "This is a help message",
            title: 'Help',
            name: 'Budd Kopman'
        }
    );
});

app.get('/weather', (req, res) => 
{
    if (!req.query.address)
    {
        return res.send(
            {
                error: "You must provide a address term"
            }
        );
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => 
    {
        if (error)
            return res.send(
                {
                    error: error
                }
            )
        
        forecast(latitude, longitude, (error, {description, temperature, feelslike, windspeed, winddir} = {}) =>
        {
            if (error)
                return res.send(
                    {
                        error: error
                    }
                );
    
            res.send(
                {
                    description: description,
                    temperature: temperature,
                    feelslike: feelslike, 
                    windspeed: windspeed,
                    winddir: winddir,
                    location: location,
                    address: req.query.address
                }
            );
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search)
    {
        return res.send(
            {
                error: "You must provide a search term"
            }
        );
    }
    console.log(req.query.search);
    res.send(
        {
            products: []
        });
});

app.get('/help/*', (rqe, res) => {
    res.render('404',
        {
           title: '404',
           message: "Help article not found" ,
           name: 'Budd Kopman'
        }
    );
});

app.get('*', (req, res) => {
    res.render('404',
        {
            title: '404',
            message: "Page not found",
            name: 'Budd Kopman'
        }
    );
});

app.listen(port, () => 
{
    console.log('Server is up on port ' + port);
});