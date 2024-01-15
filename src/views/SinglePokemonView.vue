<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'

const pokemon = ref({})
const route = useRoute()
const router = useRouter()


onMounted(() => {
    loadPokemon()
})

const loadPokemon = () => {
    const id = route.params.id
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${id}`)
    .then(response => response.json())
    .then(result => {
        pokemon.value = result
    })
    .catch(err => console.error(err))
}

watch(() => route.params.id, () => {
    loadPokemon()
})

const previousPokemonId = () => {
    return pokemon.value.id > 1 ? pokemon.value.id - 1 : null
}

const nextPokemonId = () => {
    const totalPokemon = 1026
    return pokemon.value.id < totalPokemon ? pokemon.value.id + 1 : null
}

const formatList = (list) => {
    if (!list || list.length === 0) {
        return '';
    } else if (list.length === 1) {
        return list[0];
    } else {
        return list.join(', ');
    }
}

function deletePokemon(pokemonId) {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`, {
        method: "DELETE"
    })
    .then(() => {
        router.push({name: 'pokedex' })
        alert('Pokemon Deleted')
    })
}

</script>

<template>

    <RouterLink v-if="previousPokemonId()" :to="'/pokemon/' + previousPokemonId()">Previous Pokemon</RouterLink> &nbsp;
    <RouterLink v-if="nextPokemonId()" :to="'/pokemon/' + nextPokemonId()">Next Pokemon</RouterLink>
    <br>
    <br>
    <button @click="deletePokemon(pokemon.id)">Delete Pokemon from Pokedex</button>

    <h1>#{{ pokemon.id }}. {{ pokemon.name }}</h1>
    <img :src="pokemon.image" :alt="pokemon.name">
    <h3 v-if="pokemon.types && pokemon.types.length > 1">Types: {{ formatList(pokemon.types) }}</h3>
    <h3 v-else-if="pokemon.types && pokemon.types.length === 1">Type: {{ formatList(pokemon.types) }}</h3>
    <h4 v-if="pokemon.evolvesFrom">Previous Form: {{ pokemon.evolvesFrom }}</h4>
    <h4 v-if="pokemon.abilities && pokemon.abilities.length > 1">Abilities: {{ formatList(pokemon.abilities) }}</h4>
    <h4 v-else-if="pokemon.abilities && pokemon.abilities.length === 1">Ability: {{ formatList(pokemon.abilities) }}</h4>
    <h4 v-if="pokemon.hiddenAbility">Hidden Ability: {{ pokemon.hiddenAbility }}</h4>
    <h4>Base Stats:</h4>
        <ul>
            <li v-if="pokemon.baseStats">HP: {{ pokemon.baseStats.hp }}</li>
            <li v-if="pokemon.baseStats">Atk: {{ pokemon.baseStats.attack }}</li>
            <li v-if="pokemon.baseStats">Def: {{ pokemon.baseStats.defense }}</li>
            <li v-if="pokemon.baseStats">SpAtk: {{ pokemon.baseStats.specialAttack }}</li>
            <li v-if="pokemon.baseStats">SpDef: {{ pokemon.baseStats.specialDefense }}</li>
            <li v-if="pokemon.baseStats">Spd: {{ pokemon.baseStats.speed }}</li>
        </ul>
</template>

<style scoped>
h1 { 
    text-transform: capitalize;
}

h3 {
    text-transform: capitalize;
}

h4 {
    text-transform: capitalize;
}

RouterLink {
    margin-right: 10px;
    font-size: 14px;
    text-transform: lowercase;
}

</style>