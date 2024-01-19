<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()
const userName = ref('')
const isLoggedIn = ref(false)


const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

onMounted(checkSession)

</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pokemon" v-if="isLoggedIn">Pokémon</RouterLink>
        <RouterLink to="/games" v-if="isLoggedIn">Games</RouterLink>
      </nav>
    </div>
    <br>
    <h1 class="title">Custom Pokédex</h1>
  </header>

  <RouterView />
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/pokemon-solid');
@import url('https://fonts.googleapis.com/css2?family=Lemon&display=swap');

body {
  background-color: lightblue;
  text-align: center;
  font-family: "Lemon", serif
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
  font-size: 22px;
}

</style>
