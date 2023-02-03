const {v4:uuidv4} = require('uuid');

class Tarea {

    // fines ilustrativos
    id = '';
    desc = ''; //Descripción
    completadoEn = null;
    // fines ilustrativos

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;

    }

}

// module.exports.Tarea = Tarea;

module.exports = Tarea;