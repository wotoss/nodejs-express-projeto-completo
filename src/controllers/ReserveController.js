
import Reserve from '../models/Reserve';
import User from '../models/User'; 
import House from '../models/House';

class ReserveController{

  //vamos ter o controller da minhas reservas.
  async index(req, res){
    const { user_id } = req.headers;

    //vai procurar a reserva, onde o usuario é igual ao usuario logado.
    const reserves = await Reserve.find({ user: user_id }).populate('house');

    return res.json(reserves);
  }

  //vamos criar a reserva, com o store
  async store(req, res){
  //tudo isto que esta no const eu estou pegando da minha requisição
  const { user_id } = req.headers;
  const { house_id } = req.params;
  const { date } = req.body;

  //1º verificação
  //vai procurar se esta casa que estou enviando por parametro ela existe na base dados
  const house = await House.findById(house_id);
  //caso não exista entra dentro deste if => com o retorno 
  if(!house){
    return res.status(400).json({ error: 'Essa casa não existe.' });
  }
  //não pode fazer a reserva de uma casa com estatus false
  if(house.status !== true){
    return res.status(400).json({ error: 'Solicitação indisponivel.'});
  }

  //Se o usuario que esta logado, for o mesmo que criou a casa. 
  //Ele não pode fazer a reserva. Pois ele é o dono da house.
  const user = await User.findById(user_id);
  if (String(user._id) === String(house.user)){
    return res.status(401).json({ error: 'Reserva não permitida.' });
  }


  const reserve = await Reserve.create({
    user: user_id,
    house: house_id,
    date,
  });

  //se eu colocar da forma recomendada ele dá erro no populate.
  //então adaptei com o && e deu certo.
  //await reserve.populate('house').populate('user').execPopulate();
  await (reserve.populate('house') && reserve.populate('user'));
  
    return res.json(reserve);
  }

  //vamos fazer exclusão de reservas.
  async destroy(req, res){

    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id });
    
    //return res.send();
    //return res.json({ message: 'Deletado com sucesso!' });
    return res.status(200).json({ message: 'Status 200 deletado com sucesso!!'})
  }

}

export default new ReserveController();