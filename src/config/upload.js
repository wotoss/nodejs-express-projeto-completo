import multer from "multer";
import path from 'path';

export default{
  //estou dizendo (multer.diskStorage) que vou armazenar a foto do meu projeto em algum local
  storage: multer.diskStorage({
  //para que o nodejs saiba onde esta armazenada esta foto => path.resolve(__dirname)
  //estou na pasta config => para chegar até a pasta que esta
  //a minha foto eu preciso descer duas pasta ('..', '..', 'uploads') 
  //eu poderia ter feito ../../ mas eu fiz deste outro jeito. Porque ai o 
  //path escolhe como é a barra de cada sistema e se adapta. 
     destination: path.resolve(__dirname, '..', '..', 'uploads'),
     /**
      * @param {é a nossa requisição que estamos enviando} req 
      * @param {dentro do file nos vamos ter o nome do arquivo acesso a extensão, 
      * ter acesso ao tamanho, para poder manipular, como quisermos} file 
      * @param {cb calbacker é chamado por ultimo, ápos ter feito a manipulação do file} cb 
      */
     filename: (req, file, cb) => {
       //vou pegar somente a extensão desta imagem.
       const ext = path.extname(file.originalname);
       //agora vou pegar o nome e passar a extensão(ext) para ele veja =>
       const name = path.basename(file.originalname, ext);

       //finalizando o processo 
       //1- Depois que eu peguei o nome
       //2- Peguei a extensão
       //3- finalizar o processo => passando para o calback.
       cb(null,`${name}-${Date.now()}${ext}`)
       //1º parameltro (req) eu passo como null, caso gere algum erro não seja preciso tratar
       //2º parametro (file)=> eu passo nomeDoArquivo-dataAtualeaExtensãoDesteArquivo.
       //Quando eu passo a data atual ele não se repete.
       //`` => template string onde eu uso para colocar variavel.
     },
  })
};