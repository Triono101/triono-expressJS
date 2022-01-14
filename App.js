const express = require('express');
const app = express();
const router = require('./routes');
const log = require('./middlewares/logger');
const path = require('path');


            // Middlewares
                app.use(log);

            // Menangani Request Body dengan Middleware
                app.use(express.urlencoded({extended: true}));

            // Menangani Request Body dengan Middleware Json
            app.use(express.json());

            // Menangani File Static
            app.use('/public', express.static(path.join(__dirname, 'uploads', )));

    // 1. Menggunakan 'APP.USE' biasa
        // app.use('/', (req,res) => {
        //     res.send({
        //         status: `Succesfully added at ${moment().format('LTS')}`,
        //         message: 'Welcome to Express JS Tutorial'
        //     });
        // });
    
    // 2. Menggunakan Module Router
        app.use(router);

    // Menangani Error 404
        app.use((req, res, next) => {
            res.status(404);
            res.send({
                status: 'Failed',
                message: 'Resource ' + req.originalUrl + ' Not Found'
            })
        })

app.listen(3001, () => console.log('Server: http://localhost:3001'));