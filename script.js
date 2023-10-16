let currentPokemon;
async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon)

    renderPokemonInfo();
}

function renderPokemonInfo(){
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-pic').src = currentPokemon['sprites']['front_default'];
    document.getElementById('poke-index').innerHTML = /*html*/`#00${currentPokemon['id']}`;
    document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types']['1']) {
        document.getElementById('type2').innerHTML = currentPokemon['types']['1']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
    }
}