const fs = require('fs');

const guardarDB = (data) =>{
    const archivo = './db/data.json';
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = (archivo) => {
    if(!fs.existsSync(archivo)){
        return null;
    }
    const info = fs.readFileSync(archivo,{encoding: 'utf8'});
    const data = JSON.parse(info);
    //console.log(data);
    return data;
}

module.exports = {
    guardarDB, leerDB
}; 