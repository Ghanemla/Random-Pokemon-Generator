const typeColor = {
  normal: "#545436",
  Fire: "#d2600e",
  water: "#0e3289",
  grass: "#5f902d",
  electric: "#826904",
  ice: "#4fd5d5",
  fighting: "#9a2620",
  poison: "#803380",
  ground: "#564410",
  flying: "#270f70",
  psychic: "#950631",
  bug: "#86931a",
  rock: "#93802d",
  ghost: "#5a467a",
  dark: "#5a463a",
  dragon: "#3506a9",
  steel: "#313149",
  fairy: "#561219",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById('card');
const btn = document.getElementById('btn');


let getPokemonData = () => {
  //genarate a random pokemon from 1 to 905
  let id = Math.floor(Math.random() * 905) + 1;
  // get the URL for the random pokemon
  const pokeUrl = url + id;
  //fetch the URL that got generated
  fetch(pokeUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);
    });
}


// genarate random pokemon card

let generateCard = (data) => {
  console.log(data)
  const hp = data.stats[0].base_stat;
  const atk = data.stats[1].base_stat;
  const def = data.stats[2].base_stat;
  const spAtk = data.stats[3].base_stat;
  const spDef = data.stats[4].base_stat;
  const spd = data.stats[5].base_stat;
  const pokeImg = data.sprites.other.home.front_default;
  const shinyImg = data.sprites.other.home.front_shiny;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);


  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);
  card.innerHTML = `

        <p class="hp">
        <span>HP</span>
          ${hp}
      </p>
      <div class="imgs">
        <img src=${pokeImg} />
        <img src=${shinyImg} />
      </div
      <h2 class="poke-name"${pokeName}</h2>
      <div class="types">

      </div>

      <div class="stats">
      <div>
        <h3>${atk}</h3>
        <p>Attack</p>
      </div>
      <div>
        <h3>${def}</h3>
        <p>Defense</p>
      </div>
      <div>
        <h3>${spAtk}</h3>
        <p>Sp.Attack</p>
      </div>
      <div>
        <h3>${spDef}</h3>
        <p>Sp.Defense</p>
      </div>
      <div>
        <h3>${spd}</h3>
        <p>Speed</p>
      </div>
    </div>
    `;
  appendTypes(data.types);
  styleCard(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement('SPAN');
    span.textContent = item.type.name;
    document.querySelector('.types').appendChild(span);
  });
};

let styleCard = (color) => {
  card.querySelectorAll('.types span').forEach((typeColor) => {
    typeColor.style.background = color;
  });
};

btn.addEventListener('click', getPokemonData);
window.addEventListener('load', getPokemonData);