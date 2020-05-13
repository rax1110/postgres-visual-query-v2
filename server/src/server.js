import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mountRoutes from './routes';

const app = express();

const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

mountRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
