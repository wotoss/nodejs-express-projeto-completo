//No backend iremos trabalhar em formato de classe

//vamos chamar e importar o nosso express
//para poder usar o import instalei este framework sucrase
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

//quando carregar os nosso App ele inicializa o construtor 
//carregando assim os => middlewares, routes.
class App{

//atraves do construtor nos criamos o que vamos usar. 
  constructor(){
//criamos o nosso express no 
     this.server = express();
//instalamos a biblioteca mongoose     
     mongoose.connect('mongodb+srv://woto:woto@cluster0.ltpps.mongodb.net/projeto-node?retryWrites=true&w=majority', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     this.middlewares();
     this.routes();
  }

  middlewares(){
//iremos usar os middlewares no formato Json.
     this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }
}

//neste momento estarei exportando o server.
//é o que faz sentido neste momento dentro do processo.
export default new App().server;