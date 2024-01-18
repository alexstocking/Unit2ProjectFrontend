<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'
import LoginView from '@/components/LoginView.vue';

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
  <main>
    <h1>Welcome to the Custom Pokedex!</h1>
    <h2>Log in to create your own Pokédex!</h2>
    <br>
    <h3>Check out and edit Pokémon you know already, or create brand new Pokémon!</h3>
    <br>
    <h3>Take a look at the whole Pokédex, or check out pokémon by region!</h3>
    <br>
    <div>
      <RouterLink to="/pokemon" class="btn btn-outline-primary" v-if="isLoggedIn">Search for a Pokémon by region!</RouterLink> &nbsp;
      <RouterLink to="/pokemon/pokedex" class="btn btn-outline-primary" v-if="isLoggedIn">Check out the Full Pokedex!</RouterLink> &nbsp;
      <RouterLink to="/games" class="btn btn-outline-primary" v-if="isLoggedIn">Find out information on the games!</RouterLink>
    </div>
    <br>
    <LoginView />
    <br>
    <div>
      <img src="https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png" alt="Pokédex">
    </div>
  </main>
</template>

<style scoped>

img {
  margin: 0;
  padding: 0
}

</style>
