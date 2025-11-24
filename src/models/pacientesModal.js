import { db } from "../config/conexao.js";


export default async function createPaciente(data){
    const { nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa } = data
    const insert = await db.run('INSERT INTO pacientes (nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa])
    return insert
}