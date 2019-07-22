const { promisify } = require('util');
const key = require('./key');

const request = promisify(require('request'));
const url = 'https://api.darksky.net/forecast';///key/37.8267,-122.4233?exclude=[minutely,hourly,daily,alerts]'

async function geocode(coordinate) {
    if (!(coordinate['lat'] && coordinate['long']))
        return false;

    const query = `${url}/${key.geocode}/${coordinate['lat']},${coordinate['long']}`;
    const response = await request({ url: query, json: true });
    return response.body;
}

module.exports = geocode;