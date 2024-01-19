<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const gamesBe = ref([])


const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/games`)
    .then(response => response.json())
    .then(result => {
        gamesBe.value = result
    })
}



onMounted(fetchData)

</script>

<template>
    <h1>Game List</h1>
    <h3>Check out information on each generation of Pokémon</h3>
    <div id="genForm">
      <div id="gameList">
        <div class="card" v-for="game in gamesBe" :key="game.id">
          <RouterLink :to="'/games/' + game._id"> 
            <img class="thumbnail" :src="game.image" alt="Thumbnail">
            <p>Generation {{ game.generation }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
  #genForm {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
  }
  
  #gameList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .card {
    flex: 0 1 calc(33.33% - 20px);
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .card:hover {
    background-color: #f0f0f0;
  }
  
  .thumbnail {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  


</style>