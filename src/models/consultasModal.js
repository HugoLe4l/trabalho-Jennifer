import { db } from "../config/conexao.js";
import { buscarPacientePorID } from "./pacientesModal.js";


export async function criarConsulta(paciente_id, data, especialidade) {
  const buscaID = await buscarPacientePorID(paciente_id)
  if (buscaID.sucess) {
    try {
      const realizaConsulta = await db.run("INSERT INTO consultas (paciente_id, data, especialidade) VALUES(?, ?, ?)", [paciente_id, data, especialidade])
      return { sucess: true, mensagem: `Consulta marcada para o paciente com ID [${paciente_id}]` }
    }catch(err){
      return { sucess: false, mensagem: `Error ao tentar inserir`, err: err.message }
    }
  } else {
    return buscaID
  }


}

export async function deletePorID(id) {
  const vericaExiste = await verificaConsultaExiste(id)
  if(vericaExiste){
    const result = await db.run("DELETE FROM consultas WHERE id_Consulta = ?", [id])
    return { sucess: true, mensagem: `Consulta com ID[${id}] foi deletada`}
  }else{
      return { sucess: false, mensagem: `Consulta com ID[${id}] não foi encontrada.`}

  }
}



export async function consultaPorID(id) {
  const verificaIDConsulta = await db.all(
    "SELECT consultas.id_Consulta, consultas.paciente_id, pacientes.nome_Paciente, consultas.data, consultas.especialidade FROM consultas INNER JOIN pacientes on consultas.paciente_id = pacientes.id_Paciente WHERE consultas.id_Consulta = ?", [id])

  if (verificaIDConsulta.length > 0) {
   return { sucess: true, mensagem: `Consulta com ID [${id}] encontrada.`, consulta: verificaIDConsulta[0] }
  }
  return { sucess: false, mensagem: `Consulta com ID [${id}] não foi encontrada.`}
}




export async function verificaConsultaExiste(id) {
  const verificaIDConsulta = await db.all("SELECT * FROM consultas WHERE id_Consulta = ?", [id])

  if (verificaIDConsulta.length < 1) {
    return false
  }
  return true
}

export async function todasConsultas() {
  const result = await db.all(
     "SELECT consultas.id_Consulta, consultas.paciente_id, pacientes.nome_Paciente, consultas.data, consultas.especialidade FROM consultas INNER JOIN pacientes on consultas.paciente_id = pacientes.id_Paciente")

  if (result.length > 0 ) {
       return { sucess: true, mensagem: `Consultas encontradas.`, consultas: result }
  }else{
    return { sucess: false, mensagem: `Nenhuma consulta encontrada`}
  }
}
