import readline from "readline-sync"
import { consultaPorID, criarConsulta, deletePorID, todasConsultas } from "../models/consultasModal.js";

import { titulo, subtitulo, inputINT, notificacao, verificacao, dataFormatada, extrairData } from "../utils/utils.js";
import { buscarPacientePorID } from "../models/pacientesModal.js";

export default async function MenuConsulta() {
    while (true) {
        titulo("MENU CONSULTA")
        console.log("1.Marcar Consulta.\n2.Excluir Consulta.\n3.Buscar Consulta por ID.\n4.Exibir todos as Consultas.\n5.Voltar")
        const x = inputINT()

        switch (x) {
            case 1:
                await MarcarConsulta();
                break;
            case 2:
                await DeletarConsulta();
                break;
            case 3:
                 await BuscarConsultaPorID()
               break;
            case 4:
                await BuscarTodasConsulta()
                break;
            case 5:
                return
            default:
                notificacao(2, "Opção inválida!")
                break;
        }

    }

}


async function MarcarConsulta() {
    subtitulo("Marcar Consulta")

    console.log("Insira o ID do paciente: ");
    const id = inputINT()

    console.log("Insira data da consulta: ");
    const data = extrairData("Data")

    const especialidade = readline.question("Especialidade: ")
    
    const result = await criarConsulta(id, data, especialidade)
    notificacao(result.sucess ? 1 : 2, result.mensagem)
    
}
async function DeletarConsulta() {
    subtitulo("Deletar Consulta")

    console.log("Insira o ID da Consulta: ");
    const id = inputINT()

    const result = await deletePorID(id);
    notificacao(result.sucess ? 1 : 2, result.mensagem)
    
}

async function BuscarConsultaPorID() {
    subtitulo("Buscar consulta por ID")

    console.log("Insira o ID da Consulta: ");
    const id = inputINT()

    const result = await consultaPorID(id)
    const consulta = result.consulta
    console.log("");
    if(result.sucess){
        console.log(`> ID: ${consulta.id_Consulta} | ID Paciente: ${consulta.id_Consulta} | Nome paciente: ${consulta.nome_Paciente} | Data: ${consulta.data} | Especialidade: ${consulta.especialidade}`)
    }else{
        notificacao(2, result.mensagem)
    }

}

async function BuscarTodasConsulta() {
    subtitulo("Buscar todas as consultas")

    const result = await todasConsultas()
    if(result.sucess){
        console.log(`Quantidades de consultas: ${result.consultas.length}\n`);
        
        result.consultas.map( consulta => {
            console.log(`> ID: ${consulta.id_Consulta} | ID Paciente: ${consulta.id_Consulta} | Nome paciente: ${consulta.nome_Paciente} | Data: ${consulta.data} | Especialidade: ${consulta.especialidade}`)
        })
    }else{
        notificacao(2, result.mensagem)
    }
    

}
