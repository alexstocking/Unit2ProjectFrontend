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
    abilities: [],
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
    image: ''
})

const loadPokemonData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`)
    .then(res => res.json())
    .then(data => {
        pokemon.value = {
            id: data.id,
            name: data.name,
            types: data.types.join(', '),
            abilities: data.abilities.join(', '),
            hiddenAbility: data.hiddenAbility,
            evolvesFrom: data.evolvesFrom,
            baseStats: data.baseStats,
            image: data.image
        }
    })
}

const updatePokemon = () => {
    const typesArray = pokemon.value.types.split(',').map(type => type.trim())
    const abilitiesArray = pokemon.value.abilities.split(',').map(ability => ability.trim())
    
    
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...pokemon.value,
            types: typesArray,
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
<div id="pokemonForm">
    <label for="id">Pokédex Number: {{ pokemon.id }}</label>
    <label for="name">*Pokémon Name:</label>
    <input type="text" name="name" placeholder="Bulbasaur" v-model="pokemon.name" required>
    <label for="types">*Type/s:</label>
    <input type="text" name="types" placeholder="Grass, Poison" v-model="pokemon.types" required>
    <label for="abilities">Abilities:</label>
    <input type="text" name="abilities" placeholder="First Ability, Second Ability" v-model="pokemon.abilities">
    <label for="hiddenAbility">Hidden Ability:</label>
    <input type="text" name="hiddenAbility" placeholder="Only one" v-model="pokemon.hiddenAbility">
    <label for="evolvesFrom">Evolves From:</label>
    <input type="text" name="evolvesFrom" placeholder="" v-model="pokemon.evolvesFrom">
    <label for="baseStats">Base Stats:</label>
    <input type="text" name="baseStatshp" placeholder="hp" v-model="pokemon.baseStats.hp">
    <input type="text" name="baseStatsatk" placeholder="Attack" v-model="pokemon.baseStats.attack">
    <input type="text" name="baseStatsdef" placeholder="Defense" v-model="pokemon.baseStats.defense">
    <input type="text" name="baseStatsspatk" placeholder="Special Attack" v-model="pokemon.baseStats.specialAttack">
    <input type="text" name="baseStatsspdef" placeholder="Special Defense" v-model="pokemon.baseStats.specialDefense">
    <input type="text" name="baseStatsspd" placeholder="Speed" v-model="pokemon.baseStats.speed">
    <button @click="updatePokemon">Update Pokemon</button>
</div>

</template>

<style scoped>

h1, input {
    text-transform: capitalize;
}

#pokemonForm {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

label {
    margin-bottom: 5px; /* Adjust the margin as needed */
}

input {
    margin-bottom: 10px; /* Adjust the margin as needed */
}


</style>