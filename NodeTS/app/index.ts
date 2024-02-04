import express, { Request, Response } from 'express';

const app = express();

const router = express.Router();
app.use(router);

interface User{
    id:string,
    name:string;
    surname:string;
}

router.get('/user',(req:Request,res:Response)=>{
    const arr:User[] = [
        {id:'1',name:'Pepito',surname:'Perez'}]
    res.status(200).json(arr);
    })


app.listen(3000, () => {
  console.log('Server listening on port 3000');
})