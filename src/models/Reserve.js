
import { Schema, model } from 'mongoose';


const ReserveSchema = new Schema({
 //poderá dizer qual o dia ou mês que ele quer fazer a reserva. 
  date: String,
 //precisamos saber qual o usuario que esta fazendo esta reserva. 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
 //precisamos saber qual é a casa 
 house: {
   type: Schema.Types.ObjectId,
   ref: 'House'
 }
});


export default model('Reserve', ReserveSchema);
