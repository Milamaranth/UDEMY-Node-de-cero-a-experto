require('colors');

const { guardarDB,
        leerDB
} = require('./helpers/guardarArchivo');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        listadoTareasCompletar
    
} = require('./helpers/inquirer');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();




const main = async() => {
    //console.log('Hola mundo'.rainbow);

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB('./db/data.json');

    if(tareasDB){
        //Establecer tareas
        //Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    //await pausa();

    do{
        opt = await inquirerMenu();
        //console.log({opt});

        switch (opt) {
            case'1':
                //crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
            break;
            case '3': //Completadas
                tareas.listarPendientesCompletadas(true);
                //console.log(tareas.listadoArr);
            break;
            case '4': //Pendientes
                tareas.listarPendientesCompletadas(false);
                //console.log(tareas.listadoArr);
            break;
            case '5': //Marcar como completada | pendiente
                const ids = await listadoTareasCompletar( tareas.listadoArr);
                //console.log(ids);
                tareas.toggleCompletadas(ids);
            break;
            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const siono = await confirmar('¿Está seguro?');
                    if(siono){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
                //console.log({siono});
                
            //console.log(tareas.listadoArr);
        break;
        }
/*         const tareas = new Tareas();
        const tarea = new Tarea('Comprar');

        tareas._listado[tarea.id] = tarea;

        console.log(tareas);
 */

        guardarDB( tareas.listadoArr);

        if(opt !== '0') await pausa();
    }while( opt !== '0');

    //pausa();
}

main();