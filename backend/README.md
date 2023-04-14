# Backend
## Como executar o projeto

Existem duas opções para executar o projeto, dependendo da sua preferência e configuração do ambiente. Siga as instruções abaixo para cada opção.

### Opção 1: Docker Compose

1. Certifique-se de ter o Docker instalado na sua máquina.
2. Abra o terminal e navegue até a pasta `/backend`.
3. Execute o comando `docker-compose up`.
4. Aguarde até que o contêiner seja criado e inicializado.
5. O servidor estará disponível na porta 3000.

### Opção 2: Instalação Manual


1. Abra o terminal e navegue até a pasta `/backend`.
2. Execute o comando `npm install` para instalar as dependências do projeto.
3. Execute o comando `npm start` para iniciar o servidor backend.
4. O servidor estará disponível na porta 3000.

#### Linting e Formatação
Para verificar se o código está seguindo as regras de linting, execute o comando:

```
npm run lint
```

Para formatar o código de acordo com as regras do Prettier, execute o comando:
```
npm run format
```


## Licença

[MIT](https://opensource.org/licenses/MIT)
