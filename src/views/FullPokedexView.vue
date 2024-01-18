<script setup>
import { ref, onMounted, computed }from 'vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()

const pkmnBe = ref([])
const searchTerm = ref('')

const userName = ref('')
const isLoggedIn = ref(false)

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon`)
    .then(response => response.json())
    .then(result => {
        const uniquePokemon = filterDuplicates(result)
        pkmnBe.value = uniquePokemon;
    })
}

const filterDuplicates = (pokemonList) => {
    const uniquePokemon = [];
    const encounteredIds = new Set();

    for (const pokemon of pokemonList) {
        if (!encounteredIds.has(pokemon.id)) {
            uniquePokemon.push(pokemon);
            encounteredIds.add(pokemon.id);
        }
    }

    return uniquePokemon;
}

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

const filteredPokemon = computed(() => {
  return pkmnBe.value.filter(pokemon=>
  pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


onMounted(() => {
  fetchData()
  checkSession()
})


</script>

<template>
  <h1>The Pokédex</h1>
  <div class="search-bar">
    <input type="text" v-model="searchTerm" placeholder="Search by name">
  </div>
  <RouterLink v-if="isLoggedIn" :to="'/pokemon/add'" class="btn btn-outline-primary">Add New Pokemon</RouterLink>
  <div id="pkmnHolder">
    <div class="pokemon-grid" v-for="pokemon in filteredPokemon" :key="pokemon.id">
      <RouterLink :to="'/pokemon/' + pokemon.id">
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
      </RouterLink>
      <p class="pokemonName"><RouterLink :to="'/pokemon/' + pokemon.id">{{ capitalizeFirstLetter(pokemon.name) }}</RouterLink></p>
    </div>
  </div>
</template>

<style scoped>
#pkmnHolder {
display: grid;
grid-template-columns: repeat(10, 1fr);
gap: 5px;
}

h1 {
  margin-bottom: 25px;
}

button {
  margin-bottom: 25px
}

input {
  width: 300px;
}
.pokemon-grid {
text-align: center;
margin: auto;
max-width: 100%;
}

.pokemon-image {
max-width: 100%;
max-height: 100%;
}

.search-bar {
  margin-bottom: 10px;
}
</style>