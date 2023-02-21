const tareamodule = require('./tarea.js')

// Vamos a testear test UUID
describe('test tarea', () => {


    it('testea la descripción', () => {
        const tarea = new tareamodule('desc');
        expect(tarea.desc).toBe('desc');
    })

    it('testea UUID', () => {
        const tarea = new tareamodule('desc');
        expect(tarea.id).not.toEqual(null);
    })

})