import { db } from "../config/conexao.js";


export async function vericaExisteCPF(cpf) {
    const VerificaExisteCPF = await db.all(`SELECT * from pacientes WHERE cpf = ?`, [cpf])
    if (VerificaExisteCPF.length > 0) {
        return true
    }
    return false
}

export async function createPaciente(data) {
        const { nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa } = data

        const campos = [nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa];

        if (campos.some(campo => campo === "" || campo === null || campo === undefined)) {
                return { sucess: false, mensagem: `Há campos vazios` }
            }
    try {
        const vericaExiste = await vericaExisteCPF(cpf)
        if (!vericaExiste) {

            const result = await db.run('INSERT INTO pacientes (nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa])
            if (result && result.lastID) {
                return { sucess: true, mensagem: `Paciente ${nome_Paciente} cadastrado com sucesso.` }
            } else {
                return { sucess: false, mensagem: `Houve um erro ao cadastrar o paciente.` }
            }

        } else {
            return { sucess: false, mensagem: `Já existe um paciente com essse CPF.` }
        }

    } catch (erro) {
        return { success: false, mensagem: erro.message };
    }
}

export async function updatePaciente(id, data) {

    const { nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa } = data
    // Atualiza todos os campos baseados no ID

    const update = await db.run("UPDATE pacientes SET nome_Paciente = ?, cpf = ?, telefone = ?, data_nasc = ?, cidade = ?, bairro = ?, rua = ?, num_casa = ? WHERE id_Paciente = ?", [nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa, id])

    return update
}


export async function deletePaciente(id) {
    const existe = await existePaciente(id)
    if(existe){
        const result = await db.run('DELETE FROM pacientes WHERE id_Paciente = ?', [id])
        return { sucess: true, mensagem: `Paciente com ID [${id}] foi deletado.` }
    }else{
        return { sucess: false, mensagem: `Paciente com ID [${id}] não foi encontrado.` }
    }
}

export async function existePaciente(id) {
    const result = await db.all("SELECT * FROM pacientes WHERE id_Paciente = ?", [id]);
    return result.length < 1 ? false : true
}

export async function buscarPacientePorID(id) {    
    const result = await db.all("SELECT * FROM pacientes WHERE id_Paciente = ?", [id]);
    
    if(result.length > 0 ){
        return { sucess: true, mensagem: `Paciente com ID[${id}] encontrado.`, paciente: result[0] }

    }else{
        return { sucess: false, mensagem: `Paciente com ID[${id}] não foi encontrado.` }
    }
}

export async function  buscaTodosOsPacientes() {
    const result = await db.all("SELECT * FROM pacientes ");
    if(result.length > 0){
        return { sucess: true, mensagem: `Pacientes com encontrados.`, pacientes: result }
    }else{
        return { sucess: false, mensagem: `Nenhum paciente cadastrado.`, pacientes: result }
    }
}


export async function atualizarTelefonePorID(id, novoTelefone) {    
    const existe = await existePaciente(id)
    
    if(existe){
        const result = await db.run("UPDATE pacientes SET telefone = ? WHERE id_Paciente = ?", [novoTelefone, id])

        return { sucess: true, mensagem: `Telefone do paciente com ID[${id}] foi atualizado.`}

    }else{
        return { sucess: false, mensagem: `Paciente com ID[${id}] não foi encontrado.` }
    }
}

export async function atualizarEndereco(id, cidade, bairro, rua, num_casa) {    
    const existe = await existePaciente(id)
    
    if(existe){
        const result = await db.run("UPDATE pacientes SET cidade = ?,  bairro = ?, rua = ?, num_casa = ? WHERE id_Paciente = ?", [cidade, bairro, rua, num_casa, id])

        return { sucess: true, mensagem: `Endereço do paciente com ID[${id}] foi atualizado.`}

    }else{
        return { sucess: false, mensagem: `Paciente com ID[${id}] não foi encontrado.` }
    }
}


