CREATE TABLE medico (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crm VARCHAR(20) UNIQUE NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
    telefone VARCHAR(20)
);

CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE consulta (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    medico_id BIGINT NOT NULL,
    paciente_id BIGINT NOT NULL,
    data_hora DATETIME NOT NULL,
    observacoes TEXT,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON DELETE CASCADE
);

-- Inserindo médicos
INSERT INTO medico (nome, crm, especialidade, email, telefone) VALUES
('Dr. João Silva', 'CRM12345', 'Oftalmologia', 'joao.silva@clinica.com', '11987654321'),
('Dra. Maria Oliveira', 'CRM67890', 'Oftalmologia Pediátrica', 'maria.oliveira@clinica.com', '11912345678');

-- Inserindo administradores
INSERT INTO admin (nome, email, senha) VALUES
('Administrador', 'admin@clinica.com', 'senhaSegura123'),
('Carlos Souza', 'carlos@clinica.com', 'outraSenha456');

-- Inserindo consultas (Assumindo que já existem pacientes cadastrados)
INSERT INTO consulta (medico_id, paciente_id, data_hora, observacoes) VALUES
(1, 1, '2025-02-10 10:00:00', 'Consulta de rotina.'),
(2, 2, '2025-02-12 14:30:00', 'Paciente com sintomas de miopia.'),
(1, 3, '2025-02-15 09:00:00', 'Acompanhamento pós-cirurgia.');
