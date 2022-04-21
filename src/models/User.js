//ao invés de eu importar o mongoose completo
//eu importo o que vou usar => Schema model.
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
//vamos usar para fazer o login na nossa aplicação.
   email: String,
});

//vamos exportar o model=>User e o Schema deste model => UserSchema
export default model('User', UserSchema);