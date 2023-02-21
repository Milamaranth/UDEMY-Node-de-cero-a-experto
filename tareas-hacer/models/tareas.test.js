const Tareas = require('./tareas.js')
const Tarea = require('./tarea.js')

require('colors');

describe('test tarea', () => {


    it('iniciado vacío sin cargar antes', () => {
        const listado = new Tareas();
        expect(listado.listadoArr).toStrictEqual([]);
    })

    it('carga tareas del array', () => {
        const listado = new Tareas();
        const tarea1 = new Tarea();
        listado.cargarTareasFromArray([tarea1]);
        expect(listado.listadoArr).toStrictEqual([tarea1]);
    })

    it('crea tarea', () => {
        const listado = new Tareas();
        listado.crearTarea('test');
        expect(listado.listadoArr[0].desc).toStrictEqual('test');
    })

    it('devuelve listado completo', () => {
        const listado = new Tareas();
        listado.crearTarea('test');
        //Vamos a mockear console.log
        console.log = jest.fn();
        listado.listadoCompleto();
        // The first argument of the first call to the function was 'hello'
        expect(console.log.mock.calls[0][0]).toBe('1'.green + ' test :: ' + 'Pendiente'.red);
    })

    it('lista tareas pendientes y completadas', () => {
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

        const listado = new Tareas();
        listado.crearTarea('test');
        const tareaId = Object.keys(listado._listado)[0];
        console.log = jest.fn();
        listado.listarPendientesCompletadas(false);
        expect(console.log.mock.calls[0][0]).toBe('1.'.green + ' test :: ' + 'Pendiente'.red);
        listado.toggleCompletadas([tareaId]);
        listado.listarPendientesCompletadas(true);
        expect(console.log.mock.calls[1][0]).toBe('1.'.green + ' test :: ' + '2020-01-01T00:00:00.000Z'.green);

    })

    it('borra tarea', () => {

        const listado = new Tareas();
        listado.crearTarea('test');
        const tareaId = Object.keys(listado._listado)[0];
        listado.borrarTarea(tareaId);
        expect(listado.listadoArr).toStrictEqual([]);
    })

})

/*
TEST POR HACER:

cargarTareasFromArray
crearTarea
listadoCompleto
listarPendientesCompletadas
borrarTarea
toggleCompletadas
*/