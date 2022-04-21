//método que podemos ter dentro de um controller
//métods index, show, update, store, destroy
/**
 * index:   listagem de sessões ou usuarios.
 * store:   criar uma sessão um usuario.
 * show:    quando queremos listar uma unica sessão ou usuario.
 * update:  quando queremos alterar atualizar alguma sessão ou usuario.
 * destroy: quando queremos deletar uma sessão ou usuario.
 */

//agora vamos trazer o nosso model para dentro do controller através do import
import User from '../models/User';

class SessionController{
  //vamos fazer um login, então teremos um método store
  //1- chamamos o método store
  //2- pegamos o email que ele esta enviando na req =>  const { email } = req.body;
  //3- ao pegar este email nos criamos na base dedas =>  User.create({ email })
  //4- e ai retornamos para o usuarios atraves res o email.Lembrando em formato Json
 async store(req, res){
     const { email } = req.body;
     
     //validação ou verificação para ver se o usuario já existe. 
     //caso ele exista não registraremos na base de dados mongoDb.
     // com o método findOne eu consigo verificar se tem algum registro no banco
     //com o mesmo nome ou email que estou passando.
     let user = await User.findOne({ email });  
     
     //se não tiver nenhum  usuario eu entro no if e crio um na base de dados MongoDb
     if(!user){
       user = await User.create({ email });
     }
     //caso já exista eu retorno este usuario aqui.
     return res.json(user);
  }
}

export default new SessionController();