# Meu Projeto de Notas Pessoais
---

## **Visão Geral**

Esta é uma **aplicação web completa** onde você pode **criar e gerenciar suas notas pessoais**. Cada usuário possui um espaço exclusivo, garantindo que suas anotações sejam acessíveis apenas por você. O projeto utiliza um **banco de dados local** para armazenamento de dados, sendo fácil de configurar e rodar.

---

## **Funcionalidades Principais**

* **Autenticação de Usuários:** Crie novas contas e faça login para acessar suas notas.
* **Notas Personalizadas:** Cada usuário pode criar e visualizar suas próprias notas.
* **Armazenamento Local:** Dados persistidos em um banco de dados local.

---

## **Pré-requisitos**

Certifique-se de ter o **Node.js** e o **npm** (Node Package Manager) instalados em sua máquina.

---

## **Instalação**

Para configurar o ambiente do projeto, siga estes passos:

1.  **Clone o repositório** para o seu computador.
2.  Navegue até o diretório do projeto no seu terminal.
3.  **Instale as dependências do Frontend (aplicação React):**

    ```bash
    npm install
    ```

    (Este comando deve ser executado na **pasta raiz** do projeto.)

4.  **Instale as dependências do Backend (banco de dados local):**

    ```bash
    cd banco_de_dados
    npm install
    cd ..
    ```

    (Execute os comandos na ordem indicada para entrar e sair da pasta `banco_de_dados`.)

---

## **Inicialização**

Para iniciar a aplicação, você precisará rodar o frontend e o backend separadamente:

1.  **Inicie o Backend (Banco de Dados Local):**
    Abra um novo terminal e navegue até a pasta `banco_de_dados`.

    ```bash
    cd banco_de_dados
    node server.js
    ```

    Mantenha este terminal aberto enquanto a aplicação estiver em uso.

2.  **Inicie o Frontend (Aplicação Web):**
    Abra outro terminal e navegue até a **pasta raiz** do projeto.

    ```bash
    npm run dev
    ```
