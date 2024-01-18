<script setup>
import { ref, onMounted }from 'vue'


const pkmnBe = ref([])


const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/pokemon`)
    .then(response => response.json())
    .then(result => {
        pkmnBe.value = result.slice(386, 493 )
        console.log(result)
    })
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

onMounted(fetchData)


</script>

<template>
  <h1>Pokemon Introduced in Diamond, Pearl and Platinum (The Sinnoh Region)</h1>
  <div id="pkmnHolder">
    <div class="pokemon-grid" v-for="pokemon in pkmnBe" :key="pokemon.id">
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

.pokemon-grid {
text-align: center;
margin: auto;
max-width: 100%;
}

.pokemon-image {
max-width: 100%;
max-height: 100%;
}
</style>