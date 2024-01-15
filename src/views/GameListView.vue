<script setup>
// import { ref, onMounted }from 'vue'
import { RouterLink } from 'vue-router';
// import { useCookies } from 'vue3-cookies'
// import { decodeCredential } from 'vue3-google-login'


</script>

<template>
  <h1>See the Pokémon introduced in each game!</h1>
  <ul>
    <li>
      <RouterLink to="/pokemon/kanto">Red, Blue, and Yellow</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/johto">Gold, Silver and Crystal</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/hoenn">Ruby, Sapphire and Emerald</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/sinnoh">Diamond, Pearl and Platinum</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/unova">Black, White, Black 2 and White 2</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/kalos">X and Y</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/alola">Sun, Moon, Ultra Sun and Ultra Moon</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/galar">Sword, Shield and Legends:Arceus</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/paldea">Scarlet and Violet</RouterLink>
    </li>
    <br>
    <li>
      <RouterLink to="/pokemon/pokedex">See full Pokédex and create new Pokémon!</RouterLink>
    </li>
  </ul>
</template>

<style>
body {
  text-align: center;
}

ul {
  list-style-type: none;
}
</style>
