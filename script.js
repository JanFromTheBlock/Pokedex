let currentPokemon;
async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon)

    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'];
    document.getElementById('pokemon-pic').src = currentPokemon['sprites']['front_default'];
    document.getElementById('poke-index').innerHTML = /*html*/`#00${currentPokemon['id']}`;
    document.getElementById('type1').innerHTML = currentPokemon['types']['0']['type']['name'];
    if (currentPokemon['types']['1']) {
        document.getElementById('type2').innerHTML = currentPokemon['types']['1']['type']['name'];
        document.getElementById('type2').classList.remove('d-none');
    }
}
function openAbout() {
    document.getElementById('about').classList.add('open-topic');
    document.getElementById('info-area').innerHTML = /*html*/`
        <div>
            <h2>Overview</h2>
           <table>
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