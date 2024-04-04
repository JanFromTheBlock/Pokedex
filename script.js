let currentPokemon;
let currentIndex;
let currentColor;
let amountOfPokemonToLoad = 31;
let numberOfLoadedPokemon = 1;
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

async function loadPokedex() {
    document.getElementById('loading-animation').classList.remove('d-none');
    for (let index = numberOfLoadedPokemon; index < amountOfPokemonToLoad; index++) {
        await definePokemon(index);
        currentPokemonName = currentPokemon['name'];
        numberOfLoadedPokemon++;
        loadPokedexHtml(index);
        definePokedexVariables(index);
        getColorForType();
        document.getElementById('pokemon' + index).style.background = `radial-gradient(circle, rgba(249,249,249,1) 0%, ${currentColor} 100%)`;
    }
    document.getElementById('loading-animation').classList.add('d-none');
}

function loadPokedexHtml(index) {
    return document.getElementById('pokedex').innerHTML +=/*html*/`
        <div onclick='loadPokemon("${index}")' class='pokemon' id='pokemon${index}'>
            <div class='pokemon-overview'>
                <div class="pokemon-overview-title" id='pokemon-overview-title${index}'></div>
            </div>
            <div class="img">
                <img class="pokemon-overview-pic" id="pokemon-overview-pic${index}" src="">
            </div>
            <div class="types">
                <div class='pokemon-type' id='pokemon-overview-type1${index}'></div>
                <div class='pokemon-type d-none' id='pokemon-overview-type2${index}'></div>
            </div>
        </div>
        `
}

function definePokedexVariables(index) {
    document.getElementById('pokemon-overview-title' + index).innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-overview-pic' + index).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemon-overview-type1' + index).innerHTML = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types']['1']) {
        document.getElementById('pokemon-overview-type2' + index).innerHTML = currentPokemon['types']['1']['type']['name'];
        document.getElementById('pokemon-overview-type2' + index).classList.remove('d-none');
    }
}

async function loadPokemon(pokemonToLoad) {
    await definePokemon(pokemonToLoad);
    renderPokemonInfo();
    document.getElementById('detail-window').classList.remove('d-none');
    document.getElementById('pokedex-lock').classList.remove('d-none');
    document.getElementById('body').style.overflow = 'hidden';
    window.scrollTo(0, 0);
    openAbout();
}

function closePokemon() {
    document.getElementById('detail-window').classList.add('d-none');
    document.getElementById('pokedex-lock').classList.add('d-none');
    document.getElementById('body').style.overflow = 'auto';
}

async function definePokemon(pokemonToLoad) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonToLoad}/`;
    currentIndex = pokemonToLoad;
    let response = await fetch(url);
    currentPokemon = await response.json();
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-pic').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let pokemonId = ('000' + currentPokemon['id']).substr(-3);
    document.getElementById('poke-index').innerHTML = /*html*/`#${pokemonId}`;
    document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types']['1']) {
        document.getElementById('type2').innerHTML = currentPokemon['types']['1']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
    }
    getColorForType()
    SetBackgroundColor();
}

function getColorForType() {
    typeName = currentPokemon['types']['0']['type']['name'];
    for (let i = 0; i < typeColors.length; i++) {
        if (typeColors[i].type === typeName) {
            currentColor = typeColors[i].color;
        }
    }
}

function SetBackgroundColor() {
    document.getElementById('pokemon-detail').style.background = currentColor;
}

function openAbout() {
    document.getElementById('about').classList.add('open-topic');
    document.getElementById('base-stats').classList.remove('open-topic');
    renderAboutHtml();
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        const element = currentPokemon['abilities'][i]['ability']['name'];
        if (i + 1 !== currentPokemon['abilities'].length) {
            document.getElementById('abilities').innerHTML += `${element}, `;
        } else {
            document.getElementById('abilities').innerHTML += element;
        }
    }
}

function renderAboutHtml() {
    return document.getElementById('info-area').innerHTML = /*html*/`
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
}

function openBaseStats() {
    document.getElementById('base-stats').classList.add('open-topic');
    document.getElementById('about').classList.remove('open-topic');
    renderBaseStatsHtml();
    for (let index = 0; index < 6; index++) {
        let progress = currentPokemon['stats'][index]['base_stat'];
        progress = progress / 2;
        document.getElementById('progress' + index).style.width = `${progress}%`
        document.getElementById('progress' + index).style.background = currentColor
    }
}

function renderBaseStatsHtml() {
    return document.getElementById('info-area').innerHTML = /*html*/`
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
}

function loadMorePokemon() {
    amountOfPokemonToLoad = amountOfPokemonToLoad + 30;
    loadPokedex();
}
