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
},{
  //vou falar para ele colocar nossa variavel virtual junto com a requisição 
  toJSON:{
    virtuals: true
  }
});

//Muito importante 
//Vou criar um campo virtual, quando criarmos uma nova casa ele não vai ser registrado no nosso banco
//mas quando fizermos uma busca ele vai estar lá....Mas não estará registrado na base de dados.
HouseSchema.virtual('thumbnail_url').get(function(){
  return  `http://localhost:3333/files/${this.thumbnail}`;
  
})


//vamos exportar o model=>User e o Schema deste model => UserSchema
export default model('House', HouseSchema);