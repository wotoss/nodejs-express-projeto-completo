//aqui por ser um arquivo que vamos trabalhar apenas com rotas 
//então eu não preciso importar todo o framework express 
//importo apenas a rota (Routes).

//importo a rota 
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

//passar a rota do meu controller.
import SessionController from './controllers/SessionController';
import DashboardController from './controllers/DashboardController';
import HouseController from './controllers/HouseController';
import ReserveController from './controllers/ReserveController';



//crio uma instância para poder utilizar.
const routes = new Router();

const upload = multer(uploadConfig);

//vamos criar a primeira rota..
//quando eu chamar /sessions pela rota =>
//ele vai na classe SessionController => procura o método store
//o objetivo desta rota é criar um novo usuario.
routes.post('/sessions', SessionController.store);

//rota de listagem de usuarios
routes.get('/sessions', SessionController.show);

routes.get('/dashboard', DashboardController.show);

//veja! que estou enviando pela rota a imagem
//como eu vou enviar uma imagem eu ponho single e o nome da imagem upload.single('thumbnail').
//se fosse varias imagens eu colocaria um array  upload.array('thumbnail')
routes.post('/houses', upload.single('thumbnail') ,HouseController.store);
//usando o metodo get => pois vou listar algo com a (rota /houses)
//acesso a minha controller HouseController e o metodo index.
routes.get('/houses', HouseController.index);

//estou passando em minha rota => house_id, a imagem, controller e o método.
routes.put('/houses/:house_id', upload.single('thumbnail') ,HouseController.update);

routes.delete('/houses', HouseController.destroy);

//rota encadeada => esta tentando fazer a reserva na casa
///house/id-da-casa/reserva.
routes.post('/houses/:house_id/reserve', ReserveController.store);
//estou usando o método get, pois vou entregar uma lista.
routes.get('/reserves', ReserveController.index);

//rota para excluir
routes.delete('/reserves/cancel', ReserveController.destroy);

 

//Agora vamos exportar para que nosso App consegua enchergar.
export default routes;