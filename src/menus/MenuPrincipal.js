import { titulo, subtitulo, notificacao, inputINT } from "../utils/utils.js"

import MenuConsulta from "./MenuConsultas.js";
import MenuPaciente from "./MenuPaciente.js"

export default async function MenuPrincipal() {


    while (true) {
        titulo("MENU PRINCIPAL")
        console.log("1.Gerenciar pacientes.\n2.Gerenciar consultas.\n3.Sair");
        const opcao = inputINT()

        switch (opcao) {
            case 1:
                await MenuPaciente()
                break;
            case 2:
                await MenuConsulta()
                break
            case 3:
                console.log("Sistema encerrado")
                return
            default:
                notificacao(2, "Opção inválida!")
                break;
        }
    }


}