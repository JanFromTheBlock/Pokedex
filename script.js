let currentPokemon;
let currentColor;
let typeColors = [
    { type: "normal", color: "#C6C6A7" },
    { type: "fire", color: "#FFAB60" },
    { type: "water", color: "#9DB7F5" },
    { type: "grass", color: "#A7DB8D" },
    { type: "electric", color: "#FFD86F" },
    { type: "ice", color: "#BCE2E8" },
    { type: "fighting", color: "#D56723" },
    { type: "poison", color: "#B084AC" },
    { type: "ground", color: "#EBD69D" },
    { type: "flying", color: "#C6B7F5" },
    { type: "psychic", color: "#FA92B2" },
    { type: "bug", color: "#C6D16E" },
    { type: "rock", color: "#D1C17D" },
    { type: "ghost", color: "#A292BC" },
    { type: "dragon", color: "#A27DFA" },
    { type: "dark", color: "#8D8D68" },
    { type: "steel", color: "#D1D1E0" },
    { type: "fairy", color: "#F4BDC9" }
  ];
async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon)

    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-pic').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('poke-index').innerHTML = /*html*/`#00${currentPokemon['id']}`;
    document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types']['1']) {
        document.getElementById('type2').innerHTML = currentPokemon['types']['1']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
    }
    getColorForType()
    SetBackgroundColor();
}

function getColorForType(){
    typeName = currentPokemon['types']['0']['type']['name'];
    for (let i = 0; i < typeColors.length; i++) {
        if (typeColors[i].type === typeName) {
          currentColor = typeColors[i].color;
        }
      }
}
function SetBackgroundColor(){
    document.getElementById('pokedex').style.background = currentColor;
}
function openAbout() {
    document.getElementById('about').classList.add('open-topic');
    document.getElementById('info-area').innerHTML = /*html*/`
        <div>
           <table id="table-about">
           <tr>
               <td>Height</td>
               <td>${currentPokemon['height']}</td> 
            </tr>
            <tr>
               <td>Weight</td>
               <td>${currentPokemon['weight']}</td> 
            </tr>
            <tr>
               <td>BaseEXP</td>
               <td>${currentPokemon['base_experience']}</td> 
            </tr>
            <tr>
               <td>Abilities</td>
               <td id = "abilities"></td> 
            </tr>
           </table> 
        </div>
    `
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        const element = currentPokemon['abilities'][i]['ability']['name'];
        if (i + 1 !== currentPokemon['abilities'].length) {
            document.getElementById('abilities').innerHTML += `${element}, `;
        } else {
            document.getElementById('abilities').innerHTML += element;
        }
    }
}

function openBaseStats() {
    document.getElementById('base-stats').classList.add('open-topic');
    document.getElementById('info-area').innerHTML = /*html*/`
    <div>
    <table id="table-base-stats">
        <tr>
            <td>HP</td>
            <td>${currentPokemon['stats'][0]['base_stat']}</td>
            <td><div class="progress-bar-outisde">
                    <div class="progress-bar-inside" id="progress0"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>${currentPokemon['stats'][1]['base_stat']}</td>
            <td><div class="progress-bar-outisde">
                    <div class="progress-bar-inside" id="progress1"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Defense</td>
            <td>${currentPokemon['stats'][2]['base_stat']}</td>
            <td><div class="progress-bar-outisde">
            <div class="progress-bar-inside" id="progress2"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Special Attack</td>
            <td>${currentPokemon['stats'][3]['base_stat']}</td>
            <td><div class="progress-bar-outisde">
            <div class="progress-bar-inside" id="progress3"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Special Defense</td>
            <td>${currentPokemon['stats'][4]['base_stat']}</td>
            <td><div class="progress-bar-outisde">
            <div class="progress-bar-inside" id="progress4"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>${currentPokemon['stats'][5]['base_stat']}</td>
            <td><div class="progress-bar-outisde">
            <div class="progress-bar-inside" id="progress5"></div>
                </div>
            </td>
        </tr>
    </table>
    </div>
        
    `

    for (let index = 0; index < 6; index++) {
        const progress = currentPokemon['stats'][index]['base_stat'];
        document.getElementById('progress' + index).style.width = `${progress}%`
        document.getElementById('progress' + index).style.background = currentColor
    }
}
