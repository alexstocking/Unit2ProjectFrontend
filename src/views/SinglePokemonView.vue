<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()

const pokemon = ref({})
const route = useRoute()
const router = useRouter()

const userName = ref('')
const isLoggedIn = ref(false)



const loadPokemon = () => {
    const id = route.params.id
    isFavorite.value = false
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${id}`)
    .then(response => response.json())
    .then(result => {
        pokemon.value = result
        console.log(result)
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
    const totalPokemon = 1040
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

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

onMounted(() => {
    loadPokemon()
    checkSession()
})

function deletePokemon(pokemonId) {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon/${pokemonId}`, {
        method: "DELETE"
    })
    .then(() => {
        router.push({name: 'pokedex' })
        alert('Pokemon Deleted')
    })
}

const isFavorite = ref(false);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
}


</script>


<template id="bodyForm">
  <div class="container mt-5 p-4 border border-primary rounded-lg" style="border-radius:3%">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1 class="mb-3">#{{ pokemon.id }}. {{ pokemon.name }}<span @click="toggleFavorite" class="favorite-star" :class="{ 'favorited': isFavorite }">&#9733;</span></h1>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-4 border-end border-3 border-primary">
          <img :src="pokemon.image" :alt="pokemon.name" class="img-fluid" />
        </div>
        <div class="col-md-8">

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
    <h5>Pokédex Entry: {{ pokemon.flavor_text }}</h5>
    <h5 v-if="pokemon.id < 1026"><a :href="`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pokémon)`" target="_blank">More Info</a></h5>
  
          <div class="mt-3">
            <RouterLink v-if="isLoggedIn" :to="'/pokemon/update/' + pokemon.id" class="btn btn-outline-primary">
              Edit Pokemon
            </RouterLink> &nbsp;
            <button v-if="pokemon.id > 1025 && isLoggedIn" @click="deletePokemon(pokemon.id)" class="btn btn-danger">
              Delete Pokemon from Pokedex
            </button>
          </div>
        </div>
      </div>
  
      <div class="row mt-3">
        <div class="col-md-12 text-center">
          <RouterLink v-if="previousPokemonId()" :to="'/pokemon/' + previousPokemonId()" class="btn btn-outline-primary">
            Previous Pokemon
          </RouterLink>
          &nbsp;
          <RouterLink v-if="nextPokemonId()" :to="'/pokemon/' + nextPokemonId()" class="btn btn-outline-primary">
            Next Pokemon
          </RouterLink>
          <br>
        </div>
      </div>
    </div>
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

li {
  font-weight: bold;
}

RouterLink {
    margin-right: 10px;
    font-size: 14px;
    text-transform: lowercase;
}

.favorite-star {
    cursor: pointer;
    font-size: 24px;
    float: right
}

.favorite-star.favorited {
    color: gold;
}


</style>