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
      data DATE,
      especialidade TEXT NOT NULL,
      FOREIGN KEY(paciente_id) references pacientes(id_Paciente)
    )
  `);
}





export async function insertPacientes() {
  db.exec(`
    INSERT INTO pacientes (nome_Paciente, cpf, telefone, data_nasc, cidade, bairro, rua, num_casa) VALUES
('Maria Silva', '12345678901', '81981234567', '1995-03-10', 'Olinda', 'Casa Forte', 'Avenida Central', '12'),
('João Souza', '98765432100', '81987654321', '2000-12-25', 'Recife', 'Boa Viagem', 'Rua do Sol', '101'),
('Ana Pereira', '11122233344', '81990011223', '1992-06-30', 'Jaboatão', 'Piedade', 'Rua Nova', '45'),
('Carlos Alberto', '55566677788', '81998877665', '1985-11-05', 'Recife', 'Madureira', 'Rua Velha', '23'),
('Fernanda Lima', '99988877766', '81991122334', '1998-08-15', 'Recife', 'Espinheiro', 'Rua das Flores', '56');`);
}


export async function insertConsultas() {
  db.exec(`
INSERT INTO consultas (paciente_id, data, especialidade) VALUES
(1, '2025-12-10', 'Cardiologia'),
(2, '2025-12-11', 'Ortopedia'),
(3, '2025-12-12', 'Dermatologia'),
(4, '2025-12-13', 'Pediatria'),
(5, '2025-12-14', 'Ginecologia'),
(1, '2025-12-15', 'Neurologia'),
(3, '2025-12-16', 'Endocrinologia');
`);
}




