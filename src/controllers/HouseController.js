//agora vamos trazer o nosso model para dentro do controller através do import
import House from '../models/House';
import User from '../models/User';
import * as Yup from 'Yup';

class HouseController{
  
  //filtro para listar as casa que estão com o status => true ou false.
  async index(req, res){
    const { status } = req.query;

    const houses = await House.find({ status });
    return res.json(houses);
  }
  //vamos fazer o update
  async update(req, res){
     
   //fazendo validação atraves da biblioteca instalada Yup
  const schema = Yup.object().shape({
    description: Yup.string().required(),
    price: Yup.number().required(),
    location: Yup.string().required(),
    status: Yup.boolean().required(),
 });


    //lembrando que req ou requisição é tudo que estou enviando pelo meu formulário ao servidor
    const { filename } = req.file;
    const { house_id } = req.params; //consigo pegar o meu id
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers; //o id do usuario esta vindo pelo headers.

    //vamos para validação completa
  if(!(await schema.isValid(req.body))){
    //status code 400 => front-end nos enviou algum campo errado.  
      return res.status(400).json({ error: 'Falha na validação.'})
    }
  


    //vamos fazer uma validação se o usuario que esta atualizando for diferente do que estiver logado
    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)){
     return res.status(401).json({ error: 'Não autorizado.'});
    }
    
    //vai ser atualizada a casa ou house com base no (id ou house_id que estou enviando por parametro)
    //comparado ao (id ou __id => que esta na base de dados ou que esta no meu json). 
     await House.updateOne({ _id: house_id }, {
      //agora neste objeto vamos enviar as informações que serão substituidas.
      user: user_id,
      thumbnail: filename,
      description, 
      price,
      location,
      status,
    });
    return res.send();
  }

  //vamos fazer o excluir 
  async destroy(req, res){
    const { house_id } = req.body; //consigo pegar o meu id
    const { user_id } = req.headers; //o id do usuario esta vindo pelo headers.
  

  //vamos fazer uma validação se o usuario que esta atualizando for diferente do que estiver logado
     const user = await User.findById(user_id);
     const houses = await House.findById(house_id);
 
     if(String(user._id) !== String(houses.user)){
      return res.status(401).json({ error: 'Não autorizado.'});
     }

  //vou procurar o id e se achar eu já deleto.
    await House.findByIdAndDelete({ _id: house_id });

    return res.json({ message: "Excluida com sucesso!" });
    
  }


  //store esta fazendo a criação da casa.
  async store(req, res){

  //fazendo validação atraves da biblioteca instalada Yup
  const schema = Yup.object().shape({
     description: Yup.string().required(),
     price: Yup.number().required(),
     location: Yup.string().required(),
     status: Yup.boolean().required(),
  });

  const { filename } = req.file;
  const { description, price, location, status } = req.body;
  const { user_id } = req.headers;

  //antes de criar vamos para validação completa
  if(!(await schema.isValid(req.body))){
  //status code 400 => front-end nos enviou algum campo errado.  
    return res.status(400).json({ error: 'Falha na validação.'})
  }

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