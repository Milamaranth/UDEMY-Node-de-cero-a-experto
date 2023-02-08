require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express()
const port = process.env.PORT;


// TODO: require('hbs');

//this required before view engine setup
hbs.registerPartials(__dirname + '/views/partials');
/* app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'base', 
    layoutDir: __dirname + '/views/layouts',
    partialsDir: path.join(__dirname, 'views/partials'),
})); */

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Servir contenido estático

app.get('/', (req,res)=> {
    res.render('home',{
        nombre: 'Mila',
        titulo: 'Curso Node'
    });
});

app.use( express.static('public') );

app.get('/generic', (req,res)=> {
    res.render('generic',{
        nombre: 'Mila',
        titulo: 'Curso Node'
    });
});
app.get('/elements', (req,res)=> {
    res.render('elements',{
        nombre: 'Mila',
        titulo: 'Curso Node'
    });
});

/* app.get('/', (req, res) =>{
    res.send('Home Page')
});
 */
app.get('/hola-mundo', (req, res) => {
    res.send('Hello World')
});

/* app.get('*', (req, res) => {
    res.send('404 | Page not found')
}); */

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html')
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
