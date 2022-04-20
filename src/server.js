//no server eu faço a configuração do servidor.
const app = require('./app');

//atraves do listem eu faço a configuração da porta do meu servidor 
//neste caso será a porta 3333.
app.listen(3333);



//Observação
//Dica caso você esteja usando reactjs no front-end, ele usa a porta 3000
//Você estando criando uma api e queira combinar isto com o
//reactjs (não dará conflito de porta).