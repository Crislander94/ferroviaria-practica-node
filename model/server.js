const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const {dbConnection} = require('../db/database');

class Server{

    constructor(){
        this.paths = {
            equipos: '/api/equipos',
            itinerario: '/api/itinerario'
        }
        this.app = express();
        this.port = process.env.PORT;
        //middlewares
        this.connectDb();
        this.middlewares();
        this.routes();
    }
    
    connectDb(){
        dbConnection();
    }

    routes(){
        this.app.use(this.paths.equipos, require('../routes/equipos'));
        this.app.use(this.paths.itinerario, require('../routes/itinerario'));
    }
    
    middlewares(){
        this.app.use( cors() );
        this.app.use( express.static( 'public' ) );
        this.app.use( express.json() );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Server corriendo en puerto ' , this.port);
        })
    }
}

module.exports = Server;