export default class Paciente{
    constructor(nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa){
        this.nome_Paciente  = nome_Paciente;
        this.cpf            = cpf;
        this.telefone       = telefone;
        this.data_nasc      = data_nasc;
        this.cidade         = cidade;
        this.bairro         = bairro;
        this.rua            = rua;
        this.num_casa       = num_casa
    }
}