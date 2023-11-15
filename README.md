# [MOBILE] ATY - Plataforma de Gerenciamento de Estações Meteorológicas

## Introdução

A plataforma de gerenciamento de estações meteorológicas consiste em um aplicação mobile multiplataforma, em que os usuários, pessoas e instituições públicas ou privadas, poderão se cadastrar para gerenciar, compartilhar ou consumir dados de estações meteorológicos.

Na plataforma móvel é possivel que o usuário realize o cadastro de estações meteorológicas, atribuindo identificadores como nome, coordenadas geográficas, altitude, selecionar os sensores desejaveis com base nos disponíveis, instituições parceiras, se a estação e os dados estarão públicos ou privados e uma imagem representativa da estação. 

### Backend

Dentre os dados que o mantenedor pode selecionar para que a estação envie, estão os de sensores de temperatura, umidade, pressão, radiação solar direta, radiação solar global, direção do vento, pluviômetro e anemômetro, com a possibilidade de expansão mediante solicitação via contato com os administradores da plataforma.

O backend possui os endpoint que recebem os dados das estações meteorológicas e os identifica por meio de um token que é único para cada usuário, esses dados são tratados e inseridos em um banco de dados de séries temporais. Através de uma API REST esses dados são disponibilizados para aplicações, com essa mesma API, também é realizado a comunicação com a aplicação mobile.

### Mobile

O aplicativo permite a listagem das estações sob responsabilidade do usuário, além das estações públicas de seu interesse e aquelas privadas cujo acesso lhe foi concedido. Uma estação pode ter um ou mais mantenedores e cada mantenedor, que também é um usuário que faz uso de dados da plataforma, estará responsável por nenhuma ou várias estações.

A pesquisa é realizada através de um mapa interativo, onde cada estação é representada por um marcador. Ao selecionar um marcador, é apresentado uma breve descrição da estação e de seus sensores disponíveis. No caso de estações públicas, é disponibilizado um botão para acessar os dados coletados e um para adicioná-la aos favoritos, enquanto que para estações privadas, é possível solicitar o acesso aos dados.

O acesso a tela de visualização dos dados coletados pelas estações, é realizado acessando tanto pela lista de estações quanto pelos marcadores no mapa, caso a estação seja pública. Estes dados, correspondentes às últimas 24 horas, estão representados em gráficos, a cada qual para cada sensor cadastrado na estação. Caso não haja informações recentes para um determinado sensor, uma mensagem informando que esse sensor não possui dados nesse periodo é apresentada.

Os usuários responsáveis por uma estação tem acesso a uma interface de gerenciamento, na qual podem alterar o nome da estação, adicionar ou remover parceiros e mantenedores, e até mesmo desativar ou reativar a estação. Se a estação for privada, uma interface adicional é disponibilizada para o gerenciamento de solicitações de acesso, onde é possível aceitar ou negar novas solicitações e revogar acessos concedidos anteriormente.

Para o gerenciamento pessoal, é proporcionado ao usuário uma interface na qual pode alterar seu nome e redefinir sua senha.

## Tecnologias

O projeto mobile foi desenvolvido utilizando a biblioteca [React Native](https://reactnative.dev/docs/getting-started) da Meta, tendo o [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) como linguagem de programação. A estilização da aplicação utilizou o [Styled Components](https://styled-components.com/docs/basics#getting-started), uma biblioteca de estilizações de componentes em React. A comunicação da aplicação com a API REST do backend é realizada pelo [Axios](https://axios-http.com/docs/intro), um cliente http baseado em promisse para navegadores e node.js.

## Executar o projeto

Para executar o projeto é necessário baixar a instalar a [Node.js 18.17.0](https://nodejs.org/en), e o repositório [aty-backend](https://github.com/aty-plataforma-dados-meteorologicos/aty-backend). Também é necessário que o [Android Studio](https://developer.android.com/studio) esteja instalado e o emulador já configurado (não possui restrição para qual versão do android será utilizado). Caso deseje rodar diretamente pelo dispositivo mobile, é necessário ter instalado o Expo Go, disponível para [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&pli=1) ou [IOS](https://apps.apple.com/br/app/expo-go/id982107779). Após isso deve-se serguir os seguintes passos:

1 - Acessar a pastar do projeto
```
cd aty-mobile/
```

2 - Instalar as dependências do projeto
```
npm install
```

3 - Rodar a aplicação
```
npx expo start
```

4.1 - Acessar via emulador android
```
1 - Estar com o emulador do android studio aberto.
2 - Digitar a no terminal em que o projeto estiver rodando.
3 - O expo realizada a instalação do Expo Go no emulador e irá abrir com a aplicação rodando logo depois.
```

4.2 - Acessar via Dispositivo Android
```
1 - Estar com o Expo Go instalado.
2 - Abrir o Expo Go, clicar no leitor de QR code e escanear o QR code que aparece no terminal em que o projeto estiver rodando.
3 - Esperar o build finalizar.
4 - Caso de algum erro no aplicativo e o indicativo do build não ter finalizado no terminal,
esperar esse build ser finalizado, voltar para tela inicial do expo e acessa a aplicação via a
lista de ultimas aplicação abertas no expo, que aparece logo abaixo do leito de QR Code.
```

4.3 - Acessar via Dispositivo IOS
```
1 - Estar com o Expo Go instalado.
2 - Abrir a camêra do IOS e escanear o QR code que aparece no terminal em que o projeto estiver rodando. O aplicativo do expo irá abrir com o build da aplicação sendo realizado.
3 - Esperar o build finalizar.
4 - Caso de algum erro no aplicativo e o indicativo do build não ter finalizado no terminal,
esperar esse build ser finalizado, voltar para tela inicial do expo e acessa a aplicação via a
lista de ultimas aplicação abertas no expo, que é a unica ná tela inicial.
```

## Equipe e contato

Esse projeto foi desenvolvido por Romildo C Marques $^1$, Victor Gabriel F Ferrari $^2$ e Luiz Fernando Freitas Silva $^3$, alunos de Tecnologia em Análise e Desenvolvimento de Sistemas ([IFPR - Foz](https://ifpr.edu.br/foz-do-iguacu/superior/tecnologia-em-analise-e-desenvolvimento-de-sistemas-superior/)), sob orientação do professor Felippe Alex Scheidt $^4$ e da professora Juliana Hoffmann Quiñónez Benacchio $^5$.

$^1$romildodcm@gmail.com
$^2$victorfonsecaferrari@gmail.com 
$^3$lffs2000@outlook.com
$^4$felippe.scheidt@ifpr.edu.br
$^5$juliana.benacchio@ifpr.edu.br
