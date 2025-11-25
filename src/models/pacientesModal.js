import { db } from "../config/conexao.js";


export async function createPaciente(data){
    const { nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa } = data
    const insert = await db.run('INSERT INTO pacientes (nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa])
    return insert
}

export async function updatePaciente(id, data){

    const { nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa } = data
    // Atualiza todos os campos baseados no ID
    
    const update = await db.run("UPDATE pacientes SET nome_Paciente = ?, cpf = ?, telefone = ?, data_nasc = ?, cidade = ?, bairro = ?, rua = ?, num_casa = ? WHERE id_Paciente = ?", [nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa, id])
    
    return update
}


export async function deletePaciente(id){
    const result = await db.run('DELETE FROM pacientes WHERE id_Paciente = ?', [id])
    return result
}

export async function vericaExisteCPF(cpf) {    
    const VerificaExisteCPF = await db.all(`SELECT * from pacientes WHERE cpf = ?`, [cpf])    
    if (VerificaExisteCPF.length > 0){
            return true
    }
    return false
}