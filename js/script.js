let pokemonName = document.querySelector('.pokemon_name');
let pokemonNumber = document.querySelector('.pokemon_number');
let pokemonImage = document.querySelector('.pokemon_image');
let input = document.querySelector('.input_search');
let stats = document.querySelector('.stats');
let stats2 = document.querySelector('.stats2');
let exp = document.querySelector('.exp');
let form = document.querySelector('.form');
let weight = document.querySelector('.weight');
let moves = document.querySelector('.moves');
let buttonPrev = document.querySelector('.button-prev');
let buttonNext = document.querySelector('.button-next');
let searchPokemon = 1;

const fetchPokemon= async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200 ){
        const data = await APIResponse.json();
        return data
    }
}
const renderPokemon = async(pokemon)=>{
    pokemonName.innerHTML = 'Loanding... '
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        stats.innerHTML = data.types.map(type => type.type.name);
        stats2.innerHTML = data.stats.map(stat => `${stat.stat.name}:${stat.base_stat}`);
        moves.innerHTML = data.moves.map(move => `${move.move.name}`);
        weight.innerHTML = data.weight
        exp.innerHTML = data['base_experience']
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
        input.value = '';
    }
};
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon --;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', ()=>{
   searchPokemon ++;
   renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon)