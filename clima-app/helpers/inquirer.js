const inquirer = require('inquirer');
//import { prompt } from 'inquirer';
//import * as prompt from 'inquirer';

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Buscar ciudad`  
            }, 
            {
                value: '2',
                name: `${'2.'.green} Historial` 
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`  
            }
        ]
    }
];

const inquirerMenu = async() => {

    //console.clear();
    console.log('=================='.green);
    console.log('Seleccione una opción'.rainbow);
    console.log('=================='.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async() => {
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'enter'.green} para continuar\n`
        }
    ]
    await inquirer.prompt(pregunta);
};

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;

};


/* const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
            readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
                readline.close();
                resolve();
            });    
        })
    } */

const listadoLugares = async(lugares = []) => {
    const choices = lugares.map( (lugar,i) =>{
        const idx = `${i + 1}.`.green;
        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    // Cancelar
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'

    });


    const preguntas = 
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
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

const listadoTareasCompletar = async(tareas = []) => {
    const choices = tareas.map( (tarea,i) =>{
        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

/*     // Cancelar
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'

    }); */


    const pregunta = 
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoLugares,
    confirmar,
    listadoTareasCompletar
}