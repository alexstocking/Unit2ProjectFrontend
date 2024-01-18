<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pokemonId = route.params.id

const pokemon = ref({
    id: '',
    name: '',
    types: [],
    abilities: [].join(', '),
    hiddenAbility: '',
    evolvesFrom: '',
    baseStats: {
        hp: '',
        attack: '',
        defense: '',
        specialAttack: '',
        specialDefense: '',
        speed: ''
    },
    image: '',
    flavor_text: ''
})

const pokemonTypes = [
  'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark',
  'dragon', 'steel', 'fairy',
]


const loadPokemonData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`)
    .then(res => res.json())
    .then(data => {
        pokemon.value = {
            id: data.id,
            name: data.name,
            types: data.types,
            abilities: data.abilities.join(', '),
            hiddenAbility: data.hiddenAbility,
            evolvesFrom: data.evolvesFrom,
            baseStats: data.baseStats,
            image: data.image
        }
    })
}

const updatePokemon = () => {
    // const typesArray = pokemon.value.types.split(',').map(type => type.trim())
    const abilitiesArray = pokemon.value.abilities.split(',').map(ability => ability.trim())

    if(pokemon.value.name === '' || pokemon.value.id === '' || pokemon.value.types.length === 0) {
        alert('Fields marked with a * are required')
        return
    }

    if (pokemon.value.types.length > 2 || abilitiesArray.length > 2 || abilitiesArray.filter(ability => ability.includes('(Hidden Ability)')).length > 1) {
        alert('Invalid input! Ensure there are no more than 2 types, no more than 2 abilities, and at most 1 hidden ability.');
        return; 
    }
    
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...pokemon.value,
            // types: typesArray,
            abilities: abilitiesArray
            // userId: getUserId()
        })
    })
    .then(() => {
        alert('Pokemon Updated!')
        router.push({name: 'pokedex'})

    })
    .catch(err => console.error(err))
}

onMounted(loadPokemonData)

</script>

<template>
<h1>Update {{ pokemon.name }}</h1>
<div id="pokemonPage">
    <div id="pokemonForm">
        <form> 
            <label for="id">Pokédex Number: {{ pokemon.id }}</label>
            <label class="capitalise" v-if="pokemon.id < 1026" for="name">Pokémon Name: {{ pokemon.name }}</label>
            <label v-if="pokemon.id > 1025" for="name">*Pokémon Name:</label>
            <input v-if="pokemon.id > 1025" type="text" name="name" placeholder="Bulbasaur" v-model="pokemon.name" required>
            <label class="capitalise" v-if="pokemon.id < 1026" for="evolvesFrom">Evolves From: {{ pokemon.evolvesFrom }}</label>
            <label v-if="pokemon.id > 1025" for="evolvesFrom">Evolves From:</label>
            <input v-if="pokemon.id > 1025" type="text" name="evolvesFrom" placeholder="" v-model="pokemon.evolvesFrom">
    
            <label for="types">*Type/s:</label>
                <div id="types">
                <label v-for="type in pokemonTypes" :key="type">
                    <input type="checkbox" name="type" :value="type" v-model="pokemon.types" required>
                    {{ type }}
                </label>
                </div>
    
            <label for="abilities">Abilities:</label>
            <input type="text" name="abilities" placeholder="First Ability, Second Ability" v-model="pokemon.abilities">
            <label for="hiddenAbility">Hidden Ability:</label>
            <input type="text" name="hiddenAbility" placeholder="Only one" v-model="pokemon.hiddenAbility">
            
            <label for="baseStats">Base Stats:</label>
            <div id="baseStats">
                <div class="inputWithLabel">
                    <label class="baseStatLabel" for="baseStatshp">HP:</label>
                    <input type="text" name="baseStatshp" placeholder="HP" v-model="pokemon.baseStats.hp">
                </div>
                <div class="inputWithLabel">
                    <label class="baseStatLabel" for="baseStatsatk">Attack:</label>
                    <input type="text" name="baseStatsatk" placeholder="Attack" v-model="pokemon.baseStats.attack">
                </div>
                <div class="inputWithLabel">
                    <label class="baseStatLabel" for="baseStatsdef">Defense:</label>
                    <input type="text" name="baseStatdef" placeholder="Defense" v-model="pokemon.baseStats.defense">
                </div>
                <div class="inputWithLabel">
                    <label class="baseStatLabel specialLabel" for="baseStatsspattk">Special Attack:</label>
                    <input type="text" name="baseStatspatk" placeholder="Special Attack" v-model="pokemon.baseStats.specialAttack">
                </div>
                <div class="inputWithLabel">
                    <label class="baseStatLabel specialLabel" for="baseStatsspdef">Special Defense</label>
                    <input type="text" name="baseStatspdef" placeholder="Special Defense" v-model="pokemon.baseStats.specialDefense">
                </div>
                <div class="inputWithLabel">
                    <label class="baseStatLabel" for="baseStatsspd">Speed</label>
                    <input type="text" name="baseStatspd" placeholder="Speed" v-model="pokemon.baseStats.speed">
                </div>
            </div>
            <label v-if="pokemon.id > 1025" for="image">Image: (There are lots of great fakemon images on google that you can add to you new Pokémon) </label>
            <input v-if="pokemon.id > 1025" type="text" name="image" placeholder="Paste image link here" v-model="pokemon.image">
            <button @click="updatePokemon">Update Pokemon</button>
        </form>
    </div>
    <div id="pokemonImage">
        <img :src="pokemon.image" :alt="pokemon.name">
    </div>
</div>

</template>

<style scoped>

#pokemonPage {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto
}

#pokemonForm {
    max-width: 450px;
    margin-right: 30px;
    margin-top: -30px
}

#pokemonImage {
    max-width: 100%;
    margin-top: 40px;
}

h1 {
    text-transform: capitalize;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    font-weight: bold;
}

input {
    margin-bottom: 10px;
}

#types {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    text-transform: capitalize;
}

#baseStats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

button {
    margin-top: 20px;   
}

.inputWithLabel {
    display: flex;
    align-items: baseline; 
    margin-bottom: 10px;
}

.baseStatLabel {
    margin-right: 10px;
    width: 60px; 
}

#baseStats input {
    width: 120px;
}


</style>
