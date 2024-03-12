import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PORT } from './secrets';
import{rootRouter} from './routes/index'

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {

    res.json({
        message: "Welcome to the working prisma typescript API"
    });

});

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use('/api', rootRouter)


let port = PORT

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});