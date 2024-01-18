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
        <ul>
            <li v-for="game in gamesBe" :key="game.id">
                <RouterLink :to="'/games/' + game._id"> 
                    Generation {{ game.generation }}
                 </RouterLink>
            </li>
        </ul>
    </div>
    <div id="gameImage">
        <img id=bigPicture src="https://pm1.aminoapps.com/7850/908346db04390195a76d3f460888db8b58932dbdr1-1280-720v2_uhq.jpg" alt="Pokemon">
    </div>
</div>

</template>

<style scoped>

#genForm {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

#gameList {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px
}

#gameList ul {
    list-style-type: none;
    padding: 0;
}

#gameList li {
    margin-bottom: 10px;
    font-size: 3.5vmin;
}

#bigPicture {
    scale: 0.8;
    margin-top: -60px
}


</style>