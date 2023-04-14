# Frontend

## Como executar o projeto

Existem duas opções para executar o projeto, dependendo da sua preferência e configuração do ambiente. Siga as instruções abaixo para cada opção.

### Opção 1: Docker Compose

1. Certifique-se de ter o Docker instalado na sua máquina.
2. Abra o terminal e navegue até a pasta raiz do projeto.
3. Execute o comando `docker-compose up`.
4. Aguarde até que o contêiner seja criado e inicializado.
5. Abra o navegador e acesse a URL `http://localhost:5173` para acessar o aplicativo.

### Opção 2: Instalação Manual

1. Abra o terminal e navegue até a pasta `/frontend`.
2. Execute o comando `npm install` para instalar as dependências do projeto.
3. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento.
4. Abra o navegador e acesse a URL `http://localhost:5173` para acessar o aplicativo.


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