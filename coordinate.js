const { promisify } = require('util');
const key = require('./key');

const request = promisify(require('request'));
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places'//Los%20Angeles.json?access_token=${location_key}&limit=1'

async function coordinate(address) {
    if (!address)
        return false;

    const query = `${url}/${address}.json?access_token=${key.coordinate}&limit=1`;
    const response = await request({ url: query, json: true });
    return response.body;
}

module.exports = coordinate;