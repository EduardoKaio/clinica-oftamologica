# Sistema de Gerenciamento de Consultas Oftalmológicas

Este é um sistema desenvolvido para gerenciar consultas oftalmológicas dentro de uma ótica. O sistema permite o cadastro e gerenciamento de pacientes, médicos e consultas, garantindo controle de acesso baseado em perfis de usuário.

## Tecnologias Utilizadas

### Backend
- **Spring Boot**: Framework principal para o desenvolvimento do backend.
- **Spring Security + Keycloak**: Autenticação e autorização dos usuários.
- **JPA (Hibernate)**: Persistência dos dados.
- **Banco de Dados**: A definir (MySQL para desenvolvimento).
- **Swagger/OpenAPI**: Documentação da API.

### Frontend
- **React**: Biblioteca principal para desenvolvimento do frontend.
- **Material-UI**: Componentes estilizados para interface moderna.
- **React Router**: Gerenciamento de rotas.
- **Axios**: Consumo da API do backend.
- **Context API**: Gerenciamento de estado da aplicação.

## Funcionalidades Implementadas Até Agora
- **Autenticação e Autorização**: Apenas usuários ADMIN podem cadastrar pacientes, médicos e consultas.
- **Gerenciamento de Pacientes, Médicos e Consultas**: CRUD básico via frontend.
- **Recuperação de Senha via Keycloak**: Configuração de e-mail para recuperação.
- **Interface com Sidebar e Header Personalizados**.
- **Visualização de Próximas Consultas e Histórico**.

## Como Rodar o Projeto

### Backend
1. Clone o repositório.
2. Configure o banco de dados no `application.properties`.
3. Suba o Keycloak e configure os clientes e roles necessários.
4. Execute a aplicação com:
   ```sh
   mvn spring-boot:run
   ```

### Frontend
1. Navegue até a pasta do frontend.
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Execute a aplicação:
   ```sh
   npm start
   ```

## Melhorias Futuras
- Integração com LLM
- Implementação do papel de Atendente.
- Melhorias na interface.
- Testes automatizados.
- Relatórios e estatísticas.

---
Este README será atualizado conforme o desenvolvimento avançar.

