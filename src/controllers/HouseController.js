//agora vamos trazer o nosso model para dentro do controller através do import
import House from '../models/House';

class HouseController{
  
  async store(req, res){
  const { filename } = req.file;
  const { description, price, location, status } = req.body;
  const { user_id } = req.headers;

  //crio a variavel const house.
  //await => pois vou ter acesso a base de dados, será um processo assincrono
  //estou trazendo a minha classe House do meu model e dou um create para o banco
  const house = await House.create({
      user: user_id,
      thumbnail: filename,
  //por ser o mesmo nome que esta na classe House e tabela não precisa passar duas vezes
  //description: description, um só já referencia e resolve.
      description, 
      price,
      location,
      status
  });

    return res.json(house);
  }


}
export default new HouseController();