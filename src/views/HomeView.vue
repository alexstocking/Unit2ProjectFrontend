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
    <h1>Custom Pokedex!</h1>
    <h2>Log in to create your own Pokédex!</h2>
    <h3>Check out and edit Pokémon you know already, or create brand new Pokémon!</h3>
    <h3>Take a look at the whole Pokédex, or check out pokémon by region!</h3>
    <div>
      <button><RouterLink to="/pokemon">Search for a Pokémon by region</RouterLink></button> &nbsp;
      <button><RouterLink to="/pokemon/pokedex">Check out the Full Pokedex</RouterLink></button>
    </div>

    <LoginView />
  </main>
</template>
