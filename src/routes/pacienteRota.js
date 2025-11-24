import { Router } from 'express'
import { db } from '../config/conexao.js';
import createPaciente from '../models/pacientesModal.js';

const router = Router();

//Cadastra novo paciente caso o cpf não esteja cadastrado
router.post('/cadastrar', async (req, resp) => {
    const { DadosNovoPaciente } = req.body

    if (!Object.values(DadosNovoPaciente).every(valor => valor != "")) {
        resp.status(400).json({ success: true, mensagem: "Campos necessarios não foram enviados." })
    } else {

        const VerificaExisteCPF = await db.all('SELECT * FROM pacientes WHERE cpf = ?', [DadosNovoPaciente.cpf])

        if (VerificaExisteCPF.length > 0) {
            return resp.status(409).json({ success: true, mensagem: "CPF já cadastrado." })

        } else {
            try {
                const cadastra = await createPaciente(DadosNovoPaciente)
                resp.status(201).json({ success: false, mensagem: "Sucesso ao cadastrar o paciente.", resultado: cadastra })
            }
            catch(error) {
                resp.status(500).json({ success: true, error: error, mensagem: "Houve um error ao tentar cadastrar o paciente." })
            }

        }

    }
})

//Busca todos caso não forneça cpf
router.get('/dados', async (req, resp) => {
    //Ex.: /pacientes?cpf=123
    const { cpf } = req.query;

    if(cpf){ 
        const pegaPorCPF = await db.all('SELECT * FROM pacientes WHERE cpf = ?', [cpf])

        if(pegaPorCPF.length < 1){
            return resp.status(404).json({ success: false, mensagem: "Nenhum paciente encontrado com esse CPF."})
        }
        resp.status(200).json({ success:true, mensagem: 'Sucesso ao pegar dados por cpf ', resultado: pegaPorCPF})

    }else{
        const pegaTodosPorCPF = await db.all('SELECT * FROM pacientes')
        resp.json({ success:true, mensagem: 'Sucesso ao pegar todos os pacientes ', resultado: pegaTodosPorCPF})
    }
})


export default router
