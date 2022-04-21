//aqui por ser um arquivo que vamos trabalhar apenas com rotas 
//então eu não preciso importar todo o framework express 
//importo apenas a rota (Routes).

//importo a rota 
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

//passar a rota do meu controller.
import SessionController from './controllers/SessionController';

import HouseController from './controllers/HouseController';


//crio uma instância para poder utilizar.
const routes = new Router();

const upload = multer(uploadConfig);

//vamos criar a primeira rota..
//quando eu chamar /sessions pela rota =>
//ele vai na classe SessionController => procura o método store
//o objetivo desta rota é criar um novo usuario.
routes.post('/sessions', SessionController.store);

//veja! que estou enviando pela rota a imagem
//como eu vou enviar uma imagem eu ponho single e o nome da imagem upload.single('thumbnail').
//se fosse varias imagens eu colocaria um array  upload.array('thumbnail')
routes.post('/houses', upload.single('thumbnail') ,HouseController.store);

 

//Agora vamos exportar para que nosso App consegua enchergar.
export default routes;