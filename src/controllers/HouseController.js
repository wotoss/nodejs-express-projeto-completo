//agora vamos trazer o nosso model para dentro do controller através do import
//import House from '../controller/HouseController';

class HouseController{
  
  async store(req, res){
  //vamos ver o que esta chegando
  console.log('Vamos ver req.body =>', req.body);  
  console.log('Observando ver req.file =>',  req.file);
    return res.json({ ok: true });
  }


}
export default new HouseController();