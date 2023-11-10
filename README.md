# [MOBILE] ATY - Plataforma de Gerenciamento de Estações Meteorológicas

## Introdução

A plataforma de gerenciamento de dados meteorológicos consiste em um aplicação mobile multiplataforma, em que os usuários, pessoas e instituições públicas ou privadas, poderão se cadastrar para gerenciar, compartilhar ou consumir estações meteorológicos.

Na plataforma móvel proposta, será possibilitado ao usuário o cadastro de estações meteorológicas, atribuindo identificadores como nome, coordenadas geográficas, altitude, selecionar os sensores desejaveis com base nos disponíveis, instituições parceiras, se a estação e os dados estarão públicos ou privados e uma imagem representativa da estação. 

### Backend

Dentre os dados que o mantenedor poderá selecionar para que a estação envie, estão os de sensores de temperatura, umidade, pressão, radiação solar direta, radiação solar global, direção do vento, pluviômetro e anemômetro, com a possibilidade de expansão mediante solicitação.

O backend possui os endpoint que recebem os dados das estações meteorológicas e os identifica por meio de um token que será único para cada estação, esses dados serão tratados e inseridos em um banco de dados de séries temporais. Através de uma API REST esses dados poderão ser disponibilizados para aplicações, com essa mesma API, também será feita a comunicação com a aplicação mobile.

### Frontend

O aplicativo permite a listagem das estações sob responsabilidade do usuário, além das estações públicas de seu interesse e aquelas privadas cujo acesso lhe foi concedido. Uma estação poderá ter um ou mais mantenedores e cada mantenedor, que também é um usuário que faz uso de dados da plataforma, estará responsável por nenhuma ou várias estações.

A pesquisa é realizada através de um mapa interativo, onde cada estação será representada por um marcador. Ao selecionar um marcador, será apresentada uma breve descrição da estação e de seus sensores disponíveis. No caso de estações públicas, será disponibilizado um botão para acessar os dados coletados e um para adicioná-la aos favoritos, enquanto que para estações privadas, será possível solicitar o acesso. Tal solicitação acionará uma notificação, tanto na aplicação quanto via e-mail, aos responsáveis pela estação.

A tela de visualização dos dados coletados pelas estações poderá ser feita acessando tanto pela lista de estações quanto pelos marcadores no mapa, caso a estação seja pública. Estes dados, correspondentes às últimas 24 horas, serão representados em gráficos correspondentes a cada sensor cadastrado na estação. Caso não haja informações recentes para um determinado sensor, uma mensagem informativa será apresentada.

Os usuários responsáveis por uma estação terão acesso a uma interface de gerenciamento, na qual poderão alterar o nome da estação, adicionar ou remover parceiros e mantenedores, e até mesmo desativar ou reativar a estação. Se a estação for privada, uma interface adicional será disponibilizada para o gerenciamento de solicitações de acesso, onde será possível aceitar ou negar novas solicitações e revogar acessos concedidos anteriormente.

Para o gerenciamento pessoal, será proporcionado ao usuário uma interface na qual poderá alterar seu nome e redefinir sua senha. Nesta mesma interface, será fornecido o token necessário para o envio dos dados das estações à plataforma.

## Tecnologias

O projeto mobile será desenvolvido utilizando a biblioteca [React Native](https://reactnative.dev/docs/getting-started) da Meta, tendo o [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) como linguagem de programação. A estilização da aplicação será utilizando o [Styled Components](https://styled-components.com/docs/basics#getting-started), uma biblioteca de estilizações de componentes em React. A comunicação da aplicação com a API REST do backend será realizado pelo [Axios](https://axios-http.com/docs/intro), um cliente http baseado em promisse para navegadores e node.js.

## O Repositório


## Executar o projeto

Para executar o projeto é necessário baixar a instalar a [Node.js 18.17.0](https://nodejs.org/en), e o repositorio [aty-backend](https://github.com/aty-plataforma-dados-meteorologicos/aty-backend).


```
npx ...
```


## Equipe e contato

Esse projeto está sendo desenvolvido por Romildo C Marques $^1$ e Victor Gabriel F Ferrari $^2$ e Luiz Fernando Freitas Silva $^3$, alunos de Tecnologia em Análise e Desenvolvimento de Sistemas ([IFPR - Foz](https://ifpr.edu.br/foz-do-iguacu/superior/tecnologia-em-analise-e-desenvolvimento-de-sistemas-superior/)), sob orientação do professor Felippe Alex Scheidt $^4$ e da professora Juliana Hoffmann Quiñónez Benacchio $^5$.

$^1$romildodcm@gmail.com
$^2$victorfonsecaferrari@gmail.com 
$^3$lffs2000@outlook.com
$^4$felippe.scheidt@ifpr.edu.br
$^5$juliana.benacchio@ifpr.edu.br
