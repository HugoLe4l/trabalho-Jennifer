import { Router } from 'express'
import { db } from '../config/conexao.js';
import { createPaciente, updatePaciente, deletePaciente, vericaExisteCPF } from '../models/pacientesModal.js';

const router = Router();

//Cadastra novo paciente caso o cpf não esteja cadastrado
router.post('/cadastrar', async (req, resp) => {
    const { DadosNovoPaciente } = req.body

    if (!Object.values(DadosNovoPaciente).every(valor => valor != "")) {
        resp.status(400).json({ success: true, mensagem: "Campos necessarios não foram enviados." })
    } else {


        const existeCPF = await vericaExisteCPF(DadosNovoPaciente.cpf)

        if (existeCPF) {
            return resp.status(409).json({ success: false, mensagem: "CPF já cadastrado." })
        }

        try {
            const cadastra = await createPaciente(DadosNovoPaciente)
            resp.status(201).json({ success: false, mensagem: "Sucesso ao cadastrar o paciente.", resultado: cadastra })
        }
        catch (error) {
            resp.status(500).json({ success: true, error: error, mensagem: "Houve um error ao tentar cadastrar o paciente." })
        }


}
})

//Busca todos caso não forneça cpf
router.get('/dados', async (req, resp) => {
    //Ex.: /pacientes?cpf=123
    const { cpf } = req.query;

    if (cpf) {
        const pegaPorCPF = await db.all('SELECT * FROM pacientes WHERE cpf = ?', [cpf])

        if (pegaPorCPF.length < 1) {
            return resp.status(404).json({ success: false, mensagem: "Nenhum paciente encontrado com esse CPF." })
        }
        resp.status(200).json({ success: true, mensagem: 'Sucesso ao pegar dados por cpf ', resultado: pegaPorCPF })

    } else {
        const pegaTodosPorCPF = await db.all('SELECT * FROM pacientes')
        resp.json({ success: true, mensagem: 'Sucesso ao pegar todos os pacientes ', resultado: pegaTodosPorCPF })
    }
})

//Atualiza as informações do paciente
router.put('/atualizar/:id', async (req, resp) => {
    const { id } = req.params
    const { DadosPaciente } = req.body

    // Verifica se mandou algum dado
    if (!DadosPaciente || Object.values(DadosPaciente).every(v => v === "")) {
        return resp.status(400).json({ success: false, mensagem: "Dados não enviados para atualização." })
    }

    const existeCPF = await vericaExisteCPF(DadosPaciente.cpf)
    if (existeCPF) {
        return resp.status(409).json({ success: false, mensagem: "CPF já cadastrado." })
    }


    try {
        const busca = await db.all('SELECT * FROM pacientes WHERE id_Paciente = ?', [id])

        if (busca.length < 1) {
            return resp.status(404).json({ success: false, mensagem: "Paciente não encontrado." })
        }

        await updatePaciente(id, DadosPaciente)

        resp.status(200).json({ success: true, mensagem: "Paciente atualizado com sucesso." })

    } catch (error) {

        resp.status(500).json({ success: false, error: error, mensagem: "Erro ao atualizar o paciente." })
    }

})

//Deleta as infos do paciente
router.delete('/deletar/:id', async (req, resp) => {
    const { id } = req.params
    
    try {
        const busca = await db.all('SELECT * FROM pacientes WHERE id_Paciente = ?', [id])

        if(busca.length < 1){
            return resp.status(404).json({ success: false, mensagem: "Paciente não encontrado." })
        }

        await deletePaciente(id)

        resp.status(200).json({ success: true, mensagem: "Paciente deletado com sucesso." })

    } catch(error) {
        resp.status(500).json({ success: false, error: error, mensagem: "Erro ao tentar deletar o paciente." })
    }
})

export default router
