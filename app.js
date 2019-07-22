const path = require('path');
const express = require('express');
const hbs = require('hbs');
const coordinate = require('./coordinate');
const geocode = require('./geocode');

const app = express();
const static = path.join(__dirname, 'public');
const dynamic = path.join(__dirname, 'templates/views');
const partial = path.join(__dirname, 'templates/partials');

hbs.registerPartials(partial);

app
    .set('view engine', 'hbs')
    .set('views', dynamic)
    .use(express.static(static))
    .get('/', (req, res) => {
        res.render('index', {
            title: 'Weather App',
            name: 'Zabiullah AliSher'
        })
    })
    .get('/about', (req, res) => {
        res.render('about', {
            title: 'About Page',
            name: 'Zabiullah AliSher'
        })
    })
    .get('/help', (req, res) => {
        res.render('help', {
            title: 'Help Page',
            name: 'Zabiullah AliSher'
        })
    })
    .get('/weather', async (req, res) => {
        const address = req.query.address;

        if (!address)
            return res.send({
                error: 'you must provide an address term!'
            });

        const _coordinate = await coordinate(address);
        if (!_coordinate || _coordinate['features'].length === 0)
            return res.send({
                error: 'could not find the location you provided!'
            });

        const coordinates = _coordinate['features'][0]['center'];
        const _geocode = await geocode({ lat: coordinates[0], long: coordinates[1] });
        if (!_geocode || _geocode['error'])
            return res.send({
                error: 'could not find the forecast!'
            });

        res.send({
            forecast: `${_geocode['hourly']['summary']} It is currently ${_geocode['currently']['temperature']} degrees out. There is ${_geocode['currently']['precipProbability']}% chance of rain.`,
            location: _coordinate['features'][0]['place_name']
        });
    })
    .listen(3000, () => console.log('Server is running on port 3000!'))