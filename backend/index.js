const express = require('express');
const app = express();
const morgan = require('morgan'); //Create a new morgan logger middleware function using the given format and options.
const cors = require('cors'); //Package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const { mongoose } = require('./database');
//Se instalo modulo nodemon - Tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. ('npm run dev' para correr api con nodemon)
//Se instalo modulo mongoose - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

//Settings
app.set('port', 3000);

//Middlewares
app.use(morgan('dev')); //Permite utilizar un morgan logger 'dev' para desarrollo que muestra por consola las peticiones del usuario al servidor
app.use(cors({origin: 'http://localhost:4200'})); //Permite comunicar los servidores de frontend y backend, permite establecer la comunicacion entre dos dominios o servidores diferentes
app.use(express.json()); //Permite mostrar los datos en formato json

//Routes
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/tareas', require('./routes/tarea.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/asignacion', require('./routes/asignacion.routes'));

//Server -> Correr server con comando 'npm run dev' (se agrego script a package.json)
app.listen(app.get('port'), () => {
    console.log('Server funcionando en puerto', app.get('port'));
});