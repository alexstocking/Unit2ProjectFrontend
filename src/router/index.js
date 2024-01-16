import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameListView from '@/views/GameListView.vue'
import SinglePokemonView from '@/views/SinglePokemonView.vue'
import GenOneView from '@/views/GenOneView.vue'
import GenTwoView from '@/views/GenTwoView.vue'
import GenThreeView from '@/views/GenThreeView.vue'
import GenFourView from '@/views/GenFourView.vue'
import GenFiveView from '@/views/GenFiveView.vue'
import GenSixView from '@/views/GenSixView.vue'
import GenSevenView from '@/views/GenSevenView.vue'
import GenEightView from '@/views/GenEightView.vue'
import GenNineView from '@/views/GenNineView.vue'
import FullPokedexView from '@/views/FullPokedexView.vue'
import NewPokemonView from '@/views/NewPokemonView.vue'
import EditPokemonView from '@/views/EditPokemonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon',
      name: 'games',
      component: GameListView
    },
    {
      path: '/pokemon/kanto',
      name: 'redblue',
      component: GenOneView
    },
    {
      path: '/pokemon/johto',
      name: 'goldsilver',
      component: GenTwoView
    },
    {
      path: '/pokemon/hoenn',
      name: 'rubysapphire',
      component: GenThreeView
    },
    {
      path: '/pokemon/sinnoh',
      name: 'diamondpearl',
      component: GenFourView
    },
    {
      path: '/pokemon/unova',
      name: 'blackwhite',
      component: GenFiveView
    },
    {
      path: '/pokemon/kalos',
      name: 'xy',
      component: GenSixView
    },
    {
      path: '/pokemon/alola',
      name: 'sunmoon',
      component: GenSevenView
    },
    {
      path: '/pokemon/galar',
      name: 'swordshield',
      component: GenEightView
    },
    {
      path: '/pokemon/paldea',
      name: 'scarletviolet',
      component: GenNineView
    },
    {
      path: '/pokemon/pokedex',
      name: 'pokedex',
      component: FullPokedexView
    },
    {
      path: '/pokemon/:id',
      name: 'singlepokemon',
      component: SinglePokemonView
    },
    {
      path: '/pokemon/add',
      name: 'newpokemon',
      component: NewPokemonView
    },
    {
      path: '/pokemon/update/:id',
      name: 'editpokemon',
      component: EditPokemonView
    },
  ]
})

export default router
