


const http = require('http');


http.createServer( (request,response) => {
    
/*     response.setHeader('Content-Disposition','attachment; filename = lista.csv')
    response.writeHead(200,{'Content-Type': 'application/csv'});
 */

/*     response.write('id, nombre\n');
    response.write('1, Fulano\n');
    response.write('2, Mengano\n');
    response.write('3, Zutano\n');
 */
    /* 
    const persona = {
        id: 1,
        nombre: 'Fernando'
    }
 */
    //console.log(request);

    //response.write(JSON.stringify(persona))
    response.end();
})
.listen( 8080 );

console.log('Listen puerto ', 8080);