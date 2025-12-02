import readline from "readline-sync"
import { titulo, subtitulo, inputINT, notificacao, verificacao, dataFormatada, extrairData } from "../utils/utils.js";
import { atualizarEndereco, atualizarTelefonePorID, buscarPacientePorID, buscaTodosOsPacientes, createPaciente, deletePaciente, existePaciente } from "../models/pacientesModal.js";

import Paciente from "../classes/Paciente.js";

export default async function MenuPaciente() {
    while (true) {
        titulo("MENU PACIENTES")
        console.log("1.Cadastrar paciente.\n2.Excluir paciente.\n3.Buscar paciente por ID.\n4.Exibir todos os pacientes.\n5.Atualizar paciente\n6.Voltar")
        const opcao = inputINT()

        switch (opcao) {
            case 1:
                await Cadastrar();
                break;
            case 2:
                await DeletarPaciente();
                break;
            case 3:
                await BuscarPacientePorID()
                break;
            case 4:
                await BuscarTodosPacientes()
                break;
            case 5:
                await MenuAtualizarPaciente();
            case 6:
                return
            default:
                notificacao(2, "Opção inválida!")
                break;
        }

    }

}



async function Cadastrar() {
    subtitulo("Cadastrar novo paciente.");
    const cancelar = verificacao("Tem certeza de que deseja cadastrar um novo paciente?");
    if (cancelar) { return }

    console.log("");

    const nome_Paciente = readline.question("> Nome do paciente: ");
    const cpf = readline.question("> CPF: ");
    const telefone = readline.question("> Telefone: ");
    const data_nasc = extrairData("Data de nascimento")
    const cidade = readline.question("> Cidade: ");
    const bairro = readline.question("> Bairro: ");
    const rua = readline.question("> Rua: ");
    const num_casa = readline.question("> Numero da casa: ");
    console.log("\n" + "-".repeat(10))
    const novoPaciente = new Paciente(
        nome_Paciente,
        cpf,
        telefone,
        data_nasc,
        cidade,
        bairro,
        rua,
        num_casa
    );

    const result = await createPaciente(novoPaciente)
    notificacao(result.sucess ? 1 : 2, result.mensagem)
}

async function DeletarPaciente() {
    subtitulo("Deletar paciente.");
    console.log("Insira o ID do paciente: ");
    const id = inputINT()

    const cancelar = verificacao(`Tem certeza que deseja deletar o paciente com ID [${id}] ?`)
    if (cancelar) { return }


    const result = await deletePaciente(id)
    notificacao(result.sucess ? 1 : 2, result.mensagem)

}

async function BuscarPacientePorID() {
    subtitulo("Buscar paciente por ID");
    console.log("Insira o ID do paciente: ");
    const id = inputINT()

    const result = await buscarPacientePorID(id)
    if (result.sucess) {
        const paciente = result.paciente
        console.log(`\nID: ${paciente.id_Paciente} | Nome: ${paciente.nome_Paciente} | CPF: ${paciente.cpf} | Telefone: ${paciente.telefone} | Data de Nascimento: ${paciente.data_nasc} | Cidade: ${paciente.cidade} | Bairro: ${paciente.bairro} | Rua: ${paciente.rua} | N° Casa: ${paciente.num_casa}`)
    } else {
        notificacao(2, result.mensagem)
    }

}

async function BuscarTodosPacientes() {
    subtitulo("Buscar todos paciente");
    const result = await buscaTodosOsPacientes()
    if (result.sucess) {
        console.log(`Quantidade de pacientes: ${result.pacientes.length}`)
        result.pacientes.map(paciente => {
            console.log(`\nID: ${paciente.id_Paciente} | Nome: ${paciente.nome_Paciente} | CPF: ${paciente.cpf} | Telefone: ${paciente.telefone} | Data de Nascimento: ${paciente.data_nasc} | Cidade: ${paciente.cidade} | Bairro: ${paciente.bairro} | Rua: ${paciente.rua} | N° Casa: ${paciente.num_casa}`)
        })
    } else {
        notificacao(2, result.mensagem)
    }

}


async function MenuAtualizarPaciente() {
    while (true) {
        titulo("MENU DE ATUALIZAÇÃO")
        console.log("1.Atualizar endereço.\n2.Atualizar telefone.\n3.Voltar");
        const opcao = inputINT()

        switch (opcao) {
            case 1:
                await AtualizarEndereço()
                break;

            case 2:
                await AtualizarTelefone()
                break;
            case 3:
                return;
            default:
                notificacao(2, "Opção inválida!")
                break;
        }
    }

}

async function AtualizarEndereço() {
    subtitulo("Atualizar Endereço do paciente");

    console.log("Insira o ID do Paciente: ");
    const id = inputINT()

    const cidade = readline.question("> Cidade: ")
    const bairro = readline.question("> Bairro: ")
    const rua = readline.question("> Rua: ")
    const num_casa = readline.question("> N casa: ")

    const result = await atualizarEndereco(id, cidade, bairro, rua, num_casa)

    notificacao(result.sucess ? 1 : 2, result.mensagem)

}
async function AtualizarTelefone() {
    subtitulo("Atualizar telefone do paciente");

    console.log("Insira o ID do Paciente: ");
    const id = inputINT()

    const novoTelefone = readline.question("Novo telefone: ")

    const result = await atualizarTelefonePorID(id, novoTelefone)
    notificacao(result.sucess ? 1 : 2, result.mensagem)

}   