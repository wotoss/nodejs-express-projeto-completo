//ao invés de eu importar o mongoose completo
//eu importo o que vou usar => Schema model.
import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({
  //guardaremos o caminho do arquivo/foto na base de dados.Não a foto.
  thumbnail: String,
  description: String,
  price: Number,
  location: String,
  status: Boolean,
  //preciso saber o usuario que esta logado e criou esta (House-Casa)
  user:{
  //com este ObjectId eu consigo buscar o Id que esta vindo lá User que esta logado.
    type: Schema.Types.ObjectId,
  //veja que eu coloco a referencia User que vem da minha classe User  
    ref:'User'
  }
});

//vamos exportar o model=>User e o Schema deste model => UserSchema
export default model('House', HouseSchema);