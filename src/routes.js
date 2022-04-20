//aqui por ser um arquivo que vamos trabalhar apenas com rotas 
//então eu não preciso importar todo o framework express 
//importo apenas a rota (Routes).

//importo a rota 
import { Router } from 'express';


//crio uma instância para poder utilizar.
const routes = new Router();

//vamos criar a primeira rota..
routes.get('/', (req, res) => {
  return res.json({ ok: false });
});

//Agora vamos exportar para que nosso App consegua enchergar.
export default routes;