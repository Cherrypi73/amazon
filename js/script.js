//Carrega um arquivo JSON
//filePath é o parâmetro que você deve usar para informar o nome do arquivo. Ex: 'filmes.json'
var loadFile = function (filePath, done) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () { return done(this.responseText) }
  xhr.open("GET", filePath, true);
  xhr.send();
}

let dadosUsuario = {}
let dadosProdutos = {}

const carregaDados = function(){
  console.log("Carregando dados dos produtos ...");  
  loadFile('/data/data.json', function (responseText) {
    dadosProdutos = JSON.parse(responseText)
    console.log("OK dados produtos");
    console.log("Carregando dados do usuário ...");  
    loadFile('/data/usuario.json', function (responseText) {
      dadosUsuario = JSON.parse(responseText)    
      console.log("OK dados usuario");
       document.getElementById("nome").innerHTML = dadosUsuario.usuario.nome
      document.getElementById("local").innerHTML = dadosUsuario.usuario.local
     let preferencias = []
     for (preferenciaUsuario of dadosUsuario.usuario.categoriasPref){
       if(preferenciaUsuario == "Livros"){
           apenasLivros = dadosProdutos.produtos.filter(filterLivros)
           preferencias = preferencias.concat(apenasLivros)
       }
      if(preferenciaUsuario == "Eletrônicos e Tecnologia"){
       apenasEletronico = dadosProdutos.produtos.filter( filterEletronicos)
  preferencias = preferencias.concat(apenasEletronico)
      }
      if(preferenciaUsuario == "Beleza"){
       apenasBeleza = dadosProdutos.produtos.filter( filterBeleza)
 
   preferencias = preferencias.concat(apenasBeleza)
      } 
      if(preferencias == "Casa e Cozinha"){
         apenasCasaeCozinha = dadosProdutos.produtos.filter(filterCasa)
   preferencias = preferencias.concat(apenasCasaeCozinha)
      }
     }
       carregaProdutos(preferencias)
      return 1
 })
  })
}

let carrinho = []
const limparCarrinho = function(){
carrinho = []

}
const removerItem = function(produtosCarrinho){
  produtosCarrinho.pop() 
 console.log(carrinho)
  carregaCarrinho(produtosCarrinho)
}
function init() {
  carregaDados()   
}
const pesquisar = function(){
  let barraPesquisa =  document.getElementById("barraPesquisa")
  console.log(barraPesquisa.value)

  let produtosPesquisa = dadosProdutos.produtos.filter(
    produto => produto.titulo == barraPesquisa.value
  )

  console.log(produtosPesquisa)

  carregaProdutos(produtosPesquisa, "Pesquisa")
}
function carregaCarrinho(produtosCarrinho) {

  let containerCarrinho = document.getElementById("containerCarrinho")
  let child = containerCarrinho.lastElementChild
  while (child){
    containerCarrinho.removeChild(child)
    child = containerCarrinho.lastElementChild
  }

  for (let produto of produtosCarrinho) {
    //Cria a div card para o produto
    let novaDiv = document.createElement('div')
    novaDiv['className'] = "card"
    containerCarrinho.appendChild(novaDiv);

    //cria a imagem dentro da div do card
    let img = document.createElement('img')
    img['src'] = produto.img    
    novaDiv.appendChild(img)

    //Cria o titulo do produto na div
    //<h1 class="nome">Leave in Urban men</h1>
    let nH1 = document.createElement('h1');
    nH1['className'] = "nome"
    nH1.textContent = produto.titulo
    novaDiv.appendChild(nH1)

    //Cria o preco
    //<p class="preco">R$ 19.99</p>
    let pPreco = document.createElement('p')
    pPreco['className'] = "preco"
    pPreco.textContent = produto.valor
    novaDiv.appendChild(pPreco)

    //Cria a marca
    //<p class = "marca">Urban</p>
    let pMarca = document.createElement('p')
    pMarca['className'] = "marca"
    pMarca.textContent = produto.marca
    novaDiv.appendChild(pMarca)
  }   
}


function carregaProdutos(dadosProdutos, categoria) {
  let containerCategoria = document.getElementById("containerCategoria")

  let child = containerCategoria.lastElementChild
  while (child){
    containerCategoria.removeChild(child)
    child = containerCategoria.lastElementChild
  }

  //Cria o título da categoria dentro do container
  let titulo = document.createElement('h1')
  titulo['className'] = "titulo"
  titulo.textContent = categoria
  containerCategoria.appendChild(titulo)

  //Carrega todos os produtos no container (div)
  let containerProdutos =  document.getElementById("containerProdutos")

  child = containerProdutos.lastElementChild
  while (child){
    containerProdutos.removeChild(child)
    child = containerProdutos.lastElementChild
  }

  for (let produto of dadosProdutos) {
    //Cria a div card para o produto
    let novaDiv = document.createElement('div')
    novaDiv['className'] = "card"
    containerProdutos.appendChild(novaDiv);

    //cria a imagem dentro da div do card
    let img = document.createElement('img')
    img['src'] = produto.img    
    novaDiv.appendChild(img)

    //Cria o titulo do produto na div
    //<h1 class="nome">Leave in Urban men</h1>
    let nH1 = document.createElement('h1');
    nH1['className'] = "nome"
    nH1.textContent = produto.titulo
    novaDiv.appendChild(nH1)

    //Cria o preco
    //<p class="preco">R$ 19.99</p>
    let pPreco = document.createElement('p')
    pPreco['className'] = "preco"
    pPreco.textContent = produto.valor
    novaDiv.appendChild(pPreco)

    //Cria a marca
    //<p class = "marca">Urban</p>
    let pMarca = document.createElement('p')
    pMarca['className'] = "marca"
    pMarca.textContent = produto.marca
    novaDiv.appendChild(pMarca)

    //Cria o botão
    //<p><button>Comprar</button></p>
    let pComprar = document.createElement('p')   
    novaDiv.appendChild(pComprar)
    let bBotao = document.createElement('button')
    bBotao['id'] = produto.id
    bBotao.onclick = comprarItemClick
    bBotao.textContent = "Comprar"
    pComprar.appendChild(bBotao)
  }   
}
const filterCasa = function(produto){
  return produto.categoria == "Casa e Cozinha"
}

const carregarCasa = function(){ 
  apenasCasaeCozinha = dadosProdutos.produtos.filter(filterCasa)
  carregaProdutos(apenasCasaeCozinha, "Casa e Cozinha")
}
const filterBeleza= function(produto){
  return produto.categoria == "Beleza"
}

const carregarBeleza = function(){ 
  apenasBeleza = dadosProdutos.produtos.filter(filterBeleza)
  carregaProdutos(apenasBeleza, "Beleza")
}
const filterEletronicos = function(produto){
  return produto.categoria == "Eletrônicos e Tecnologia"
}

const carregarEletronico = function(){ 
  apenasEletronico = dadosProdutos.produtos.filter( filterEletronicos)
  carregaProdutos(  apenasEletronico, "Eletrônicos e Tecnologia")
}

const filterLivros = function(produto){
  return produto.categoria == "Livros"
}

const carregarLivrosClick = function(){ 
  apenasLivros = dadosProdutos.produtos.filter(filterLivros) 
  carregaProdutos(apenasLivros, "Livros")
}

const adicionarCarrinho = function(item){

carrinho.push(item)
console.log(carrinho.length)
carregaCarrinho(carrinho)

}

const comprarItemClick = function (){
  console.log("Comprando item ", this.id)
  let produto = dadosProdutos.produtos.filter( produto => produto.id == this.id)[0]
  console.log(produto)
}