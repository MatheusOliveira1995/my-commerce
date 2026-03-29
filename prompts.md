## Fase 1 - Base

- Faça um resumo, abrangendo tudo que eu devo saber de como funciona a integração entre o react-query e o next. O que eu devo saber sobre como o cache é controlado, sobre configurações e sobre diferenças no uso do react query em uma SPA. Também diga quais erros são comuns para que eu possa evitá-los.

## Fase 2 - Configuração do tema

- Este projeto é baseado no seguinte arquivo em PDF. Nas últimas páginas existe um exemplo de design que deve ser usado como referência. Baseado neste arquivo altere o theme definido de forma que ele esteja configurado de acordo com os espaçamentos, tamanhos e peso de fontes e paleta de cores que serão utilizados.

## Fase 3 - Camada de persistência

- Baseado na estrutura de pastas que foi criada em domain/products, crie um plano de implementação da camada de persistência utilizando o pattern "Repository".

* A idéia principal é que exista um http client, no caso o axios, que será criado/configurado na pasta core.
* Esse http client será utilizado pra fazer as chamadas.
* Nenhuma alteração de código deve ser feita nesta etapa, eu preciso que retorne o plano de alteração/criação dos arquivos em formato markdown para que eu possa revisar e refinar, para depois seguir pra etapa de implementação.

- O plano está adequado, apenas algumas observações:

* A api utilizada será a FakeStore API.Ela é uma api pública e não possui autenticação.
* O endpoint de lista /products não tem paginação e nem filtros, a lógica de paginação será implementada internamente.
* O endpoint de busca de um produto é /products/{id_produto}.Deixe a etapa de implementação dos hooks de listagem e detalhe por último.
* Não altere o mock ainda, vamos deixar também por último.Faça as adaptações necessárias para que a lógica de hydration do cache no frontend funcione adequadamente.
* Durante o processo pergunte caso seja necessário fazer qualquer alteração que esteja fora do plano de execução.Altere o plano considerando os pontos mencionados, mas ainda não execute.

## Fase 4 - Ajustes de CSS e Responsividade

- As margins e a existência do padding mudam quando se tratar de um dispositivo mobile, por conta da responsividade. O que o MUI tem a oferecer para lidar com esse cenário? Crie neste arquivo uma estrutura de loading utilizando Skeletons do MUI que se encaixe com a estrutura do layout da página.Fase 5 - Lógica de paginação server-sideA implementação atual de geração das páginas estáticas tem um problema em que todas as páginas geradas no build conterão o retorno do endpoint /products duplicados, pois a paginação está sendo realizada no client-side através dos dados hidratados. Acho interessante criarmos um plano de alteração que deverá migrar a lógica de paginação para o repository, para evitar custos de build e tamanho da hidratação desnecessários. Gere um plano de alteração em markdown, mas ainda não execute até que eu valide.

## Fase 5 - Testes

- Baseado no arquivo use-products-hook.test.ts implemente testes para o hook "useProducts" a fim de garantir os seguintes comportamentos:

* Um array vazio deve ser retornado enquanto a página carrega, o valor de isLoading deve ser true.
* Um array de Product deve ser retornado, bem como o total de páginas após um fetch bem sucedido ou após a hidratação do cache.
* O método getPage deve ser corretamente chamado com os parâmetros fornecidos.

- Baseado no arquivo use-product-hook.test.ts implemente testes para o hook "use Product" a fim de garantir os seguintes comportamentos:

* Um array vazio deve ser retornado enquanto a página carrega, o valor de isLoading deve ser true.
* Um Product deve ser retornado após um fetch bem sucedido.

- Baseado no arquivo product-repository.test.ts implemente testes para a classe ProductHttpRepository a fim de garantir os seguintes comportamentos:

* O método getAll deve chamar o endpoint /products e trazer todos os dados da api
* Se houverem chamadas concorrentes, ou seja, se o endpoint for chamado novamente enquanto a chamada anterior ainda não foi resolvida, a chamada não deve ser disparada e a mesma promise atual deve ser retornada para evitar chamadas desnecessárias ao backend.
* Deve lidar corretamente com o estado de erro retornado pela API.
* O método getPage deve os dados corretos conforme o número de página. O cache implementado no getAll deve ser utilizado no getPage.
* O método getPage deve calcular corretamente a quantidade de páginas
* O método getId deve chamar a api com o id fornecido e retornar os dados corretamente.
