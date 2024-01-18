<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pokemon">Pokémon</RouterLink>
        <RouterLink to="/games">Games</RouterLink>
      </nav>
    </div>
    <br>
    <h1 class="title">Custom Pokédex</h1>
  </header>

  <RouterView />
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/pokemon-solid');

body {
  background-color: lightblue;
  text-align: center;
  /* background-image: url("https://wallpapers.com/images/hd/basic-pokeball-cover-mcs4xg2ash4hj4e9.jpg"); */
}

header {
  font-family: 'Pokemon Solid', sans-serif;
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
  letter-spacing: 1px;
}

.wrapper {
  display: flex;
  justify-content: center;
}

.nav {
  display: flex;
  gap: 20px;
}

h1 {
  margin-bottom: 50px;
}

a {
  text-decoration: none;
  z-index: 1;
  position: relative;
}

.title {
  margin-bottom: 0;
  padding-bottom: 30px;
}

ul {
  list-style-type: none;
}

.pokemonName {
  font-family: 'Pokemon Solid', sans-serif; 
}

</style>
