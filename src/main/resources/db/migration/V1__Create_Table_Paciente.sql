CREATE TABLE IF NOT EXISTS `paciente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_de_nascimento` DATE NOT NULL,
  `cpf` varchar(16) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `genero` varchar(30) NOT NULL,
  `celular` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `historico_medico` varchar(200) NOT NULL,

  PRIMARY KEY (`id`)
);