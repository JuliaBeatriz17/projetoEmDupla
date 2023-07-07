const url = "https://rafaelescalfoni.github.io/desenv_web/filmes.json";

fetch(url)
.then(function(resposta){
    //O if está dizendo "Se der erro, retorne o status do erro(100,200,300 ou 400) e o texto"
    if(resposta.ok !== true){
        let msgErro = resposta.status + '-' + resposta.statusText
        document.querySelector("#erro").textContent = msgErro
    }return resposta
})
// Como o fetch tem como efeito o promisse, ou seja, so vai executar
// Depois que o outro .then acima ter dado certo, podemos chama-ló direto.
.then((resposta) => resposta.json())
.then(filme => {
    let secao = document.querySelector(".filmes")
    filme.forEach(filmes => {
        secao.innerHTML += apresentacao(filmes)
    })
})
// O catch serve para qualquer erro nos .then no qual, se der um erro
// ele vai direto pro catch e não irá executar os .then abaixo
.catch((erro) => "Erro: " + erro)

let genero = filme =>filme.generos.reduce((elementos, item) => elementos + `<li class="list">${item}</li>`, "")

let elenco = filme =>filme.elenco.reduce((elementos, item) => elementos + `<li class="list">${item}</li>`, "")

let avaliacao = function(filme) {
    switch (filme) {
        case 5:
            return `<i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i>`
        case 4:
            return `<i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star"></i>`
        case 3:
            return `<i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
        case 2:
            return `<i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
        case 1:
            return `<i class="fa-solid fa-star yellow"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`
        default:
            return filme
    }
}

let indica = function (filme) {
    if(filme >= 18)
        return `<span><p class="indica red">${filme}</p></span>`
    else if(filme > 14)
        return `<span><p class="indica yellow">${filme}</p></span>`
    else(filme <= 14)
        return `<span><p class="indica green">${filme}</p></span>`
}

let opiniao = filme => filme.opinioes.reduce((elementos, item) => elementos + `<div class="ratingBox"><li class="listaRating"><q>${item.descricao}</q></li><li class="listaRating">${avaliacao(item.rating)}</li></div>`, "")

let apresentacao = function (filme){
    return `
    <div class="filme">
        <img class="imgFilme" src="${filme.figura}" alt="${filme.titulo}">
        <div>
            <div class="tituloFilme">
                <h2>${filme.titulo}</h2>
                ${indica(filme.classificacao)}
            </div>
                <p class="descricao">${filme.resumo}</p>
            <div class="genero">
                <p class="nomeClassificacao">Gêneros: </p>
                <ul>
                    ${genero(filme)}
                </ul>
            </div>
            <div class="elenco">
                <p class="nomeClassificacao">Elenco: </p>
                <ul>
                    ${elenco(filme)} 
                </ul>
            </div>
            <div class="rating">
                <p class="nomeClassificacao">Comentários: </p>
                <ul>
                    ${opiniao(filme)}
                </ul>
            </div>
        </div>
    </div>`
}