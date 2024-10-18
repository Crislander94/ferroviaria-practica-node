const equipos = require('./equipos');
const itinerario = require('./itinerario');

module.exports = {
    ...equipos,
    ...itinerario
}