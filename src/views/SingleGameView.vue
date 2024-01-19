<script setup>
import { ref, onMounted }from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const game = ref({})

const formatGamesReleased = (games) => {
    if (!games || games.length === 0) {
        return '';
    }

    const lastGame = games[games.length - 1];
    const otherGames = games.slice(0, -1);

    return otherGames.join(', ') + (otherGames.length ? ', ' : '') + 'and ' + lastGame;
}

onMounted(() => {
    const route = useRoute() 
    const id = route.params.id
    fetch(`${import.meta.env.VITE_API_URL}/games/${id}`)
    .then(response => response.json())
    .then(result => {
        game.value = result
    })
    .catch(err => console.error(err))
})
</script>

<template>
    <div id="gameForm">
        <h1>Generation {{ game.generation }}</h1>
        <h1>Pokémon {{ formatGamesReleased(game.gamesReleased) }}</h1>
        <h2>Platform: {{ game.platforms }}</h2>
        <h4>Released: {{ game.yearReleased }}</h4>
        <h4 class="capitalise">Games Region: {{ game.region }}</h4>
        <h4>Popular Pokémon released in generation {{ game.generation }}: {{ game.wellKnownPokemon }}</h4>
        <img :src="game.image" :alt="formatGamesReleased(game.gamesReleased)" class="game-image">
        <br>
        <br>
        <RouterLink :to="'/pokemon/' + game.region" class="btn btn-outline-primary">Check out the pokemon of <span class="capitalise">{{ game.region }}</span></RouterLink>
        <br>
        <br>
        <RouterLink to="/games" class="btn btn-outline-primary">Back to Games</RouterLink>
    </div>
</template>

<style>
.capitalise {
    text-transform: capitalize;
}

#gameForm {
    padding: 0
}

.game-image {
    max-height: 250px; /* Set the desired height */
    width: auto;
    border-radius: 8px;
    margin-top: 10px;
}

</style>