'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.registerUserPath = '/opinionManager/v1/users';
        this.loginPath = '/opinionManager/v1';

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.registerUserPath, userRoutes);
        this.app.use(this.loginPath, authRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server is running on port', this.port);
        });
    }
}

export default Server;