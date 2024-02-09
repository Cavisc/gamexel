let FILTRO_GENERO = "all";

const btnPesquisar = document.querySelector("#btn_pesquisar");

const btnAbreMenu = document.querySelector(".menu_abre");
const btnFechaMenu = document.querySelector(".menu_fecha");
const menu = document.querySelector(".menu");
const menuItens = document.querySelectorAll(".menu_item");

// busca e monta os jogos
fetch(
  "https://api.rawg.io/api/games?key=f86230ad675a41239c7e3d45ec7fd4c0&tags=pixel-graphics"
)
  .then((res) => res.json())
  .then((data) => {
    let str = "";
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      str += `<div class="jogo">
      <h3 class="jogo_titulo">${result.name}</h3>
      <img width="230" height="157" src="${result.background_image}">
      <p class="jogo_rating">Avaliação: ${result.rating}</p>
      <p class="jogo_tag">Tag principal: ${result.genres[0].name}</p>
      <a href="detalhes.html?category=games&id=${result.id}" class="jogo_mensagem">Mais detalhes...</a>
  </div>`;
    }
    const jogos = document.querySelector(".jogos_main");
    jogos.innerHTML = str;
  });

// busca e monta as stores
fetch("https://api.rawg.io/api/stores?key=f86230ad675a41239c7e3d45ec7fd4c0")
  .then((res) => res.json())
  .then((data) => {
    let str = "";
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      str += `<div class="store">
      <h3 class="store_titulo">${result.name}</h3>
      <img class="store_imagem" src="${result.image_background}">
      <h4 class="store_jogos-titulo">Link: <a class="store_link" href="http://${result.domain}">${result.name}</a></h4>
      <a href="detalhes.html?category=stores&id=${result.id}" class="store_mensagem">Mais detalhes...</a>
  </div>`;
    }
    const stores = document.querySelector(".stores_container");
    stores.innerHTML = str;
  });

// busca e monta as publishers
fetch("https://api.rawg.io/api/publishers?key=f86230ad675a41239c7e3d45ec7fd4c0")
  .then((res) => res.json())
  .then((data) => {
    let str = "";
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      str += `<div class="publisher">
    <h3 class="publisher_titulo">${result.name}</h3>
    <img class="publisher_logo" src="${result.image_background}">
    <h4 class="publisher_jogos-titulo">Principais jogos</h4>
    <ul class="lista_jogos">
        <li class="publisher_jogo">${result.games[0].name}</li>
        <li class="publisher_jogo">${result.games[1].name}</li>
        <li class="publisher_jogo">${result.games[2].name}</li>
    </ul>
    <a href="detalhes.html?category=publishers&id=${result.id}" class="publisher_mensagem">Mais detalhes...</a>
</div>`;
    }
    const publishers = document.querySelector(".publishers_container");
    publishers.innerHTML = str;
  });

// filtra jogos
function filtraJogos(genre) {
  const jogos = document.querySelector(".jogos_main");
  jogos.innerHTML = "";
  fetch(
    "https://api.rawg.io/api/games?key=f86230ad675a41239c7e3d45ec7fd4c0&tags=pixel-graphics"
  )
    .then((res) => res.json())
    .then((data) => {
      let str = "";
      const results = data.results;
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        let genreJogo = result.genres.findIndex((elem) => elem.slug == genre);
        if (genreJogo != -1) {
          str += `<div class="jogo">
            <h3 class="jogo_titulo">${result.name}</h3>
            <img width="230" height="157" src="${result.background_image}">
            <p class="jogo_rating">Avaliação: ${result.rating}</p>
            <a href="#" class="jogo_mensagem">Mais detalhes...</a>
        </div>`;
        } else if (genre == "all") {
          str += `<div class="jogo">
            <h3 class="jogo_titulo">${result.name}</h3>
            <img width="230" height="157" src="${result.background_image}">
            <p class="jogo_rating">Avaliação: ${result.rating}</p>
            <p class="jogo_tag">Tag principal: ${result.genres[0].name}</p>
            <a href="detalhes.html?category=games&id=${result.id}" class="jogo_mensagem">Mais detalhes...</a>
        </div>`;
        }
      }
      if (str == "") {
        str = `<h1 class="jogo_vazio">NENHUM JOGO ENCONTRADO</h1>`;
      }
      const jogos = document.querySelector(".jogos_main");
      jogos.innerHTML = str;
    });
}

// pesquisa jogos
btnPesquisar.addEventListener("click", (e) => {
  const cxPesquisa = document.querySelector(".pesquisa");

  fetch(
    "https://api.rawg.io/api/games?key=f86230ad675a41239c7e3d45ec7fd4c0&search=" +
      cxPesquisa.value
  )
    .then((res) => res.json())
    .then((data) => {
      let str = "";
      const results = data.results;
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        str += `<div class="jogo">
      <h3 class="jogo_titulo">${result.name}</h3>
      <img width="230" height="157" src="${result.background_image}">
      <p class="jogo_rating">Avaliação: ${result.rating}</p>
      <p class="jogo_tag">Data de lançamento: ${result.released}</p>
      <a href="detalhes.html?category=games&id=${result.id}" class="jogo_mensagem">Mais detalhes...</a>
  </div>`;
      }
      const jogos = document.querySelector(".jogos_main");
      jogos.innerHTML = str;
    });
});

// dinâmica de menu mobile
if (window.screen.width < 768) {
  btnAbreMenu.addEventListener("click", (e) => {
    btnFechaMenu.style.display = "initial";
    menu.style.display = "flex";
    btnAbreMenu.style.display = "none";
  });
  btnFechaMenu.addEventListener("click", (e) => {
    btnFechaMenu.style.display = "none";
    menu.style.display = "none";
    btnAbreMenu.style.display = "initial";
  });
  menuItens.forEach((item) => {
    item.addEventListener("click", (e) => {
      btnFechaMenu.style.display = "none";
      menu.style.display = "none";
      btnAbreMenu.style.display = "initial";
    });
  });
}

document.body.onload = () => {
  let filtro = document.querySelector("#genero");

  filtro.addEventListener("change", (e) => {
    FILTRO_GENERO = filtro.value;
    filtraJogos(FILTRO_GENERO);
  });
};
