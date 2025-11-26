import { db } from "./conexao.js";

export async function TabelaPaciente() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS pacientes(
        id_Paciente INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_Paciente TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        telefone TEXT NOT NULL,
        data_nasc TEXT NOT NULL,
        cidade TEXT NOT NULL,
        bairro TEXT NOT NULL, 
        rua TEXT NOT NULL,
        num_casa TEXT NOT NULL)
        `);
}

export async function TabelaConsultas() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS consultas (
      id_Consulta INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_id INTEGER NOT NULL,
      data DATETIME,
      especialidade TEXT NOT NULL,
      FOREIGN KEY(paciente_id) references pacientes(id_Paciente)
    )
  `);
}