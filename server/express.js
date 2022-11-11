import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import template from '../template';
import userRoutes from './routes/user.routes';
import devBundle from './devBundle';
import path from 'path';
import authRoutes from './routes/auth.routes';

const CURRENT_WORKING_DIR = process.cwd();
console.log(CURRENT_WORKING_DIR);
const app = express();

// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
// devBundle.compile(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use((error, req, res) => {
    if(error.name === 'UnauthorizedError') {
        res.status(401).json({"error" : error.name + ": " + error.message});
    }else if(error){
        res.status(400).json({"error" : error.name + ": " + error.message});
        console.log(error);
    }
});

app.get('/', (req, res) => {
    res.status(200).send(template());
});

export default app;