<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const addPokemon = () => {
    if(pokemon.value.name === '' || pokemon.value.id === '' || pokemon.value.types.length === 0) {
        alert('Fields marked with a * are required')
        return
    }
    console.log(pokemon)

    const typesArray = pokemon.value.types.split(',').map(type => type.trim())
    const abilitiesArray = pokemon.value.abilities.split(',').map(ability => ability.trim())
    const baseStats = {
        hp: pokemon.value.baseStats.hp,
        attack: pokemon.value.baseStats.attack,
        defense: pokemon.value.baseStats.defense,
        specialAttack: pokemon.value.baseStats.specialAttack,
        specialDefense: pokemon.value.baseStats.specialDefense,
        speed: pokemon.value.baseStats.speed
    };

    fetch(`${import.meta.env.VITE_API_URL}/pokemon/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...pokemon.value,
            types: typesArray,
            abilities: abilitiesArray,
            baseStats: baseStats
            // userId: getUserId()
        })
    })
    .then(() => {
        alert('New Pokemon Created!')
        router.push({name: 'pokedex'})

    })
    .catch(err => console.error(err))
}

</script>

<template>
<h1>Add a new Pokemon!</h1>
<div id="pokemonForm">
    <label for="id">*Pokédex Number: </label>
    <input type="number" name="id" min="1026" placeholder="Must be a unique number!" v-model="pokemon.id" required>
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
    <input type="text" name="baseStatshp" placeholder="HP" v-model="pokemon.baseStats.hp">
    <input type="text" name="baseStatsatk" placeholder="Attack" v-model="pokemon.baseStats.attack">
    <input type="text" name="baseStatsdef" placeholder="Defense" v-model="pokemon.baseStats.defense">
    <input type="text" name="baseStatsspatk" placeholder="Special Attack" v-model="pokemon.baseStats.specialAttack">
    <input type="text" name="baseStatsspdef" placeholder="Special Defense" v-model="pokemon.baseStats.specialDefense">
    <input type="text" name="baseStatsspd" placeholder="Speed" v-model="pokemon.baseStats.speed">
    <label for="image">Image: </label>
    <input type="text" name="image" placeholder="Paste image link here" v-model="pokemon.image">
    
    <button @click="addPokemon">Add New Pokemon</button>
</div>

</template>

<style scoped>
h1 {
    text-transform: capitalize
}

input {
    text-transform: capitalize
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