import express from 'express'
import { TabelaPaciente } from './src/config/databaseSetup.js';

//Importando as rotas
import pacienteRota from "./src/routes/pacienteRota.js"

TabelaPaciente()

const app = express();


app.use(express.json());


app.use('/paciente', pacienteRota)



//aaaaaaaaaaaaaaaaaaaaaaaaa atualiza aqui





const PORT = 3131
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})