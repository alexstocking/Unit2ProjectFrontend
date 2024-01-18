<script setup>
// import { ref, onMounted }from 'vue'
import { RouterLink } from 'vue-router';
// import { useCookies } from 'vue3-cookies'
// import { decodeCredential } from 'vue3-google-login'


</script>

<template>
  <h1>See the Pokémon introduced in each game!</h1>
  <ul class="container">
    <li>
      <RouterLink to="/pokemon/kanto"><span style="color:red">Red,</span> <span style="color:blue">Blue</span>, and <span style="color:yellow">Yellow</span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/johto"><span style="color:gold">Gold</span>, <span style="color: silver">Silver</span> and Crystal</RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/hoenn"><span style="color:#e0115f">Ruby</span>, <span style="color:#0f52ba">Sapphire</span> and <span style="color:#50c878">Emerald</span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/sinnoh"><span style="color:#b9f2ff">Diamond</span>, <span style="color:#b768a2">Pearl</span> and <span style="color:#e5e4e2">Platinum</span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/unova"><span style="color:black">Black</span>, <span style="color:white">White</span>, <span style="color:black">Black 2</span>, <span style="color:white">White 2</span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/kalos"><span style="color:darkblue">X</span> and <Span style="color:darkred">Y</Span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/alola"><span style="color:#9c7c38">Sun</span>, <span style="color:#004953">Moon</span>, <span style="color:#9c7c38">Ultra Sun</span>, <span style="color:#004953">Ultra Moon</span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/galar"><span style="color:	#fb607f">Sword</span>, <span style="color:#00ffff">Shield</span> and <span style="color:#3b2f2f">Legends Arceus</span></RouterLink>
    </li>
    <li>
      <RouterLink to="/pokemon/paldea"><span style="color:#ff2400">Scarlet</span> and <span style="color:violet">Violet</span></RouterLink>
    </li>
    <br>
    <li>
      <RouterLink to="/pokemon/pokedex">See full Pokédex and create new Pokémon!</RouterLink>
    </li>
  </ul>
</template>

<style scoped>
body {
  text-align: center;
}

li {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  text-shadow: 2px 2px black;
  font-family: 'Pokemon Solid', sans-serif; 
  letter-spacing: 3px;
}

</style>
