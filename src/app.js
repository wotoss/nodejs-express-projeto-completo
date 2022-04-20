//No backend iremos trabalhar em formato de classe

//vamos chamar e importar o nosso express
const express = require('express');
const routes = require('./routes');

//quando carregar os nosso App ele inicializa o construtor 
//carregando assim os => middlewares, routes.
class App{

//atraves do construtor nos criamos o que vamos usar. 
  constructor(){
//criamos o nosso express no 
     this.server = express();
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
module.exports = new App().server;