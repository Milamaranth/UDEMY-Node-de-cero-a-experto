require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.clear();

//console.log(process.env);

const main = async() => {

    const busquedas = new Busquedas();
    let opt = '';

    do{
        opt = await inquirerMenu();
        //console.log({opt});

        //await pausa();

        switch (opt) {
            case'1':
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                
                
                //console.log(lugarSel);
                //await fetch('https://www.aemet.es');
                // Buscar los lugares
                
                // Seleccionar el lugar
                const id = await listadoLugares(lugares);
                if(id === '0') continue;
                
                const lugarSel = lugares.find(l => l.id === id);
                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.long);
                console.log(clima);

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ',lugarSel.nombre);
                console.log('Lat: ',lugarSel.lat);
                console.log('Long: ',lugarSel.long);
                console.log('Temperatura: ',clima.temp);
                console.log('Mín: ',clima.min);
                console.log('Máx: ',clima.max);
                console.log('Descripción del clima: '.green,clima.desc)


                break;

            case '2':
                busquedas.historialCapitalizad.forEach((lugar,i) => {
                //busquedas.historial.forEach((lugar,i) => {
                    const idx = `${i+1}`.green;
                    console.log(`${idx} . ${lugar}`);
                })

            break;
        }
        if(opt !== 0) await pausa();
    } while(opt !== 0){

    }


        const confirmar = async(mensaje) => {
    const quest = [{
        type: 'confirm',
        name: 'ok',
        mensaje
    }];

    const {ok} = await inquirer.prompt(quest);
    return ok;
}

const preguntas = 
{
    type: 'list',
    name: 'id',
    message: 'Borrar',
    choices: choices
}


const {id} = await inquirer.prompt(preguntas);
return id;
}

const confirmar = async(mensaje) => {
    const quest = [{
        type: 'confirm',
        name: 'ok',
        mensaje
    }];

    const {ok} = await inquirer.prompt(quest);
    return ok;
}



main();