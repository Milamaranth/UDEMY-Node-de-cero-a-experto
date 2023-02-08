const fs = require('fs');

const axios = require("axios");


class Busquedas {

    historial = [];
    dbPath = './db/database.json';


    constructor(){
        // TODO : Leer DB si existe
        this.leerDB();
    }

    get historialCapitalizad(){
        // Mayúsculas
        return this.historial.map(l => {
            let palabras = l.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }
    get paramsMapbox(){
        return{
            'proximity':'ip',
            'language':'es',
            'access_token':process.env.MAPBOX_KEY
        }
    }

    get paramsOpenWeather(){
        return{
            appid: process.env.OPENWHEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = ''){

        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            // peticion http
            //console.log('ciudad',lugar);
            //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/C%C3%A1ceres.json?proximity=ip&language=es&access_token=pk.eyJ1IjoibWlzYW5jYSIsImEiOiJjbGRyOGo0MTkwYmhiM3BwY3VjZmlsenowIn0.9BsJWiktOCxt5YRlRbDvNA');
            //console.log(resp.data.features);

            return resp.data.features.map( lugar => ({
                // Devuelve objeto de forma implícita
                id: lugar.id,
                nombre: lugar.place_name,
                long: lugar.center[0],
                lat: lugar.center[1]
            })); //retornar los lugares

        }catch(error){
            return [];
        }        
    }

    async climaLugar(lat,lon) {
        try{

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather,lat,lon}
            })

            // resp.data
            const resp = await instance.get();
            //console.log(resp);
            const {weather, main} = resp.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        }catch(error){
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        //Prevenir duplicados
        if ( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        //grabar en DB
        this.guardarDB();

    }

    guardarDB(){
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }

    leerDB(){
        // Verificar que existe
        if(!fs.existsSync(this.dbPath)) return;
        //Cargar info readfylesync... path...encoding 
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        // Deserializar parsear
        const data = JSON.parse(info);

        this.historial = data.historial;

    }

}

module.exports = Busquedas;