<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pokemon = ref({
    id: '',
    name: '',
    types: [],
    abilities: [].join(', '),
    hiddenAbility: '',
    evolvesFrom: '',
    baseStats: {
        hp: '',
        attack: '',
        defense: '',
        specialAttack: '',
        specialDefense: '',
        speed: ''
    },
    image: ''
})

const pokemonTypes = [
  'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark',
  'dragon', 'steel', 'fairy',
]

const addPokemon = () => {
    const abilitiesArray = pokemon.value.abilities.split(',').map(ability => ability.trim())
    if(pokemon.value.name === '' || pokemon.value.id === '' || pokemon.value.types.length === 0) {
        alert('Fields marked with a * are required')
        return
    }

    if (pokemon.value.types.length > 2 || abilitiesArray.length > 2 || abilitiesArray.filter(ability => ability.includes('(Hidden Ability)')).length > 1) {
        alert('Invalid input! Ensure there are no more than 2 types, no more than 2 abilities, and at most 1 hidden ability.');
        return; 
    }
    
    console.log(pokemon)

    const baseStats = {
        hp: pokemon.value.baseStats.hp,
        attack: pokemon.value.baseStats.attack,
        defense: pokemon.value.baseStats.defense,
        specialAttack: pokemon.value.baseStats.specialAttack,
        specialDefense: pokemon.value.baseStats.specialDefense,
        speed: pokemon.value.baseStats.speed
    };

    fetch(`${import.meta.env.VITE_API_URL}/pokemon/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...pokemon.value,
            // types: typesArray,
            abilities: abilitiesArray,
            baseStats: baseStats
            // userId: getUserId()
        })
    })
    .then(() => {
        alert('New Pokemon Created!')
        router.push({name: 'pokedex'})

    })
    .catch(err => console.error(err))
}

</script>

<template>
    <div id="pokemonForm">
      <h1>Add a New Pokemon!</h1>
      <form>
        <label for="id">*Pokédex Number:</label>
        <input type="number" name="id" min="1026" placeholder="Must be a unique number starting from 1026!" v-model="pokemon.id" required>
  
        <label for="name">*Pokémon Name:</label>
        <input type="text" name="name" placeholder="Bulbasaur" v-model="pokemon.name" required>
  
        <label for="types">*Type/s:</label>
        <div id="types">
          <label v-for="type in pokemonTypes" :key="type">
            <input type="checkbox" name="type" :value="type" v-model="pokemon.types" required>
            {{ type }}
          </label>
        </div>
  
        <label for="abilities">Abilities:</label>
        <input type="text" name="abilities" placeholder="First Ability, Second Ability" v-model="pokemon.abilities">
  
        <label for="hiddenAbility">Hidden Ability:</label>
        <input type="text" name="hiddenAbility" placeholder="Only one" v-model="pokemon.hiddenAbility">
  
        <label for="evolvesFrom">Evolves From:</label>
        <input type="text" name="evolvesFrom" placeholder="" v-model="pokemon.evolvesFrom">
  
        <label for="baseStats">Base Stats:</label>
        <div id="baseStats">
          <input type="text" name="baseStatshp" placeholder="HP" v-model="pokemon.baseStats.hp">
          <input type="text" name="baseStatsatk" placeholder="Attack" v-model="pokemon.baseStats.attack">
          <input type="text" name="baseStatsdef" placeholder="Defense" v-model="pokemon.baseStats.defense">
          <input type="text" name="baseStatsspatk" placeholder="Special Attack" v-model="pokemon.baseStats.specialAttack">
          <input type="text" name="baseStatsspdef" placeholder="Special Defense" v-model="pokemon.baseStats.specialDefense">
          <input type="text" name="baseStatsspd" placeholder="Speed" v-model="pokemon.baseStats.speed">
        </div>
  
        <label for="image">Image:</label>
        <input type="text" name="image" placeholder="Paste image link here" v-model="pokemon.image">
  
        <button @click.prevent="addPokemon">Add New Pokemon</button>
      </form>
    </div>
  </template>
  
  <style scoped>
  #pokemonForm {
    max-width: 400px;
    margin: 0 auto;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input {
    margin-bottom: 10px;
  }
  
  #types {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    text-transform: capitalize;
  }
  
  #baseStats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  button {
    margin-top: 20px;
  }
  
  </style>