# Project 2 - Custom Pokédex - MERN Full Stack Application

## Description

Our second project gave us a chance to show what we had learnt about full-stack development. We used express as a framework for our backend, and Vue.js as the frontend. The goal was to create a CRUD (Create, Read, Update, Delete) application with an interesting visual frontend, as well as simple authorisation through Google. I decided to build a pokedex application based on a request from my nine year old son. I wanted for the user to be able to create, edit and delete their own custom pokemon, as well as editing existing pokemon.

## Deployment link

Netlify Frontend:  https://custom-pokedex-club.netlify.app/

## Getting Started/Code Installation

The code for my backend and frontends for the project can be found
GitHub Backend: https://github.com/alexstocking/Unit2ProjectBackend
GitHub Frontend: https://github.com/alexstocking/Unit2ProjectFrontend

## Timeframe & Working Team (Solo/Pair/Group)

I had a week to complete the project, doing most of my work from Monday to Friday of that week, with some planning on the weekend prior. In the project, I worked independently with some assistance from my instructors with refactoring my fetches to the third party api I used.

## Technologies Used

I used express and Vue.js to create the backend and frontend respectively. This also included using HTML, CSS and JavaScript to add full functionality for the application. I used netlify to deploy the website online.


## Brief
Your App Must:
Have at least 2 data entities (data resources) in addition to the User Model - one entity that represents the main functional idea for your app and another with a One:Many or Many:Many relationship with that main entity (embedded or referenced).
Use OAuth authentication.
Implement basic authorization that restricts access to features that need a logged in user in order to work (typically CUD data operations) by "protecting" those routes from anonymous users using the ensureLoggedIn middleware from the OAuth lesson. In addition, ensure that editing and deletion of a data resource can only be done by the user that created that data (this is done in the controller - refer to the Guide to User-Centric CRUD).
Have full-CRUD data operations somewhere within the app's features. For example, you can have functionality that Creates & Updates a post and satisfy Delete functionality by implementing the ability to delete comments.
Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, it should have a consistent and polished user interface.
Be deployed online


## Planning

My planning for this project was an area, on reflection, that could have been a lot better. I spent Friday afternoon coming up with a plan and jotting down ideas on post-it notes. I stuck these near my computer and used them throughout my project. I did this because I had an idea to do this pokedex very early on when thinking about the project and wanted to get started more quickly. This led to problems with my functions and the order I did things in. Whilst I got to the end product I wanted, it took a lot longer than it probably would have had I had a more structured plan.


## Build/Code Process

I will split my build process into days for ease of reading and tracking the progression of the project. I started the project on Friday, and finished it the following Friday.

### Day 1 (Friday): 
My initial planning and thinking through the idea of how I would implement each CRUD function. I also spent this afternoon researching pokéapi (https://pokeapi.co/) and how I could use it for my project. I identified each point of information that I would be fetching and how I would do it. I also built the basic backend and frontend pages so I would be able to start building endpoints for my backend, and further pages for my frontend on Monday.

### Day 2 (Monday): 
I spent Monday building my endpoints on the backend to fetch the information from the pokemon api. These endpoints ended up being a lot longer than I initially thought and needed refactoring when I came to deployment. Here is my endpoint for fetching any given specific pokemon to show how it differentiates between custom pokemon and pokemon that need to be fetched from the api. 

    app.get('/pokemon/:id', async (req, res) => {
        const id = req.params.id;
        const userEmail = req.headers['user-email']
        const pokeApiUrl = `${pokeUrl}/pokemon/${id}`;
        const pokeSpeciesApiUrl = `${pokeUrl}/pokemon-species/${id}`;


      try {
        const findUser = await User.findOne({ 'userEmail': userEmail})
        const customPokemon = await Pokemon.findOne({ id: id }, { _id: 0, __v: 0 });


        if (customPokemon) {
            res.json(customPokemon);
            console.log(customPokemon.user)
            console.log(findUser)
        } else {
            const [pokemonResponse, speciesResponse] = await Promise.all([
                fetch(pokeApiUrl),
                fetch(pokeSpeciesApiUrl),
            ]);


            if (!pokemonResponse.ok || !speciesResponse.ok) {
                throw new Error('Pokémon not found');
            }


            const [pokemonData, speciesData] = await Promise.all([
                pokemonResponse.json(),
                speciesResponse.json(),
            ]);


            const regularAbilities = [];
            const hiddenAbilities = [];


            pokemonData.abilities.forEach((ability) => {
                if (ability.is_hidden) {
                    hiddenAbilities.push(ability.ability.name);
                } else {
                    regularAbilities.push(ability.ability.name);
                }
            });


            const englishFlavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')


            const formattedFlavorText = englishFlavorTextEntry
            ? englishFlavorTextEntry.flavor_text.replace(/\\n/g, '').replace(/\f/g, '')
            : 'No flavor text available'


            const updatedPokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((type) => type.type.name),
                abilities: regularAbilities,
                hiddenAbility: hiddenAbilities.length > 0 ? hiddenAbilities[0] : null,
                evolvesFrom: speciesData.evolves_from_species ? speciesData.evolves_from_species.name : null,
                baseStats: {
                    hp: pokemonData.stats[0].base_stat,
                    attack: pokemonData.stats[1].base_stat,
                    defense: pokemonData.stats[2].base_stat,
                    specialAttack: pokemonData.stats[3].base_stat,
                    specialDefense: pokemonData.stats[4].base_stat,
                    speed: pokemonData.stats[5].base_stat,
                },
                image: getUniqueImageUrl(pokemonData.id),
                flavor_text: formattedFlavorText,
                user: findUser
            };


            await Pokemon.findOneAndUpdate({ id: id }, updatedPokemon, { upsert: true });


            res.json(updatedPokemon);
          }
        } catch (error) {
            console.error(error);
            res.status(404).json({
                error: 'Pokémon not found',
                details: error.message,
            });
        }
    });

This was by far my longest endpoint, but I felt it was necessary so it would fetch all of the necessary information correctly. You can also see my attempts at differentiating pokemon based on the user logged in, which ultimately I wasn’t able to get working. With the way I set up the end point it would dynamically fetch the data fields I specified that I could then fetch through from the frontend. 

### Day 3 (Tuesday): 
With endpoints set up to read, create, edit and delete pokemon, I was able to make the frontend for each region's pokedex, with an overall pokedex and the individual pokemon pages, again dynamically generated based on the url parameters.

    const loadPokemon = () => {
        const id = route.params.id
        isFavorite.value = false
        fetch(`${import.meta.env.VITE_API_URL}/pokemon/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Email': userEmail.value
          }
        })
        .then(response => response.json())
        .then(result => {
            pokemon.value = result
            console.log(result)
        })
        .catch(err => console.error(err))
    }


    <template id="bodyForm">
      <div class="container mt-5 p-4 border border-primary rounded-lg" style="border-radius:3%">
          <div class="row">
            <div class="col-md-12 text-center">
              <h1 class="mb-3">#{{ pokemon.id }}. {{ pokemon.name }}<span @click="toggleFavorite" class="favorite-star" :class="{ 'favorited': isFavorite }">&#9733;</span></h1>
            </div>
          </div>
     
          <div class="row">
            <div class="col-md-4 border-end border-3 border-primary">
              <img :src="pokemon.image" :alt="pokemon.name" class="img-fluid" />
            </div>
            <div class="col-md-8">
    
    
              <h3 v-if="pokemon.types && pokemon.types.length > 1">Types: {{ formatList(pokemon.types) }}</h3>
            <h3 v-else-if="pokemon.types && pokemon.types.length === 1">Type: {{ formatList(pokemon.types) }}</h3>
            <h4 v-if="pokemon.evolvesFrom">Previous Form: {{ pokemon.evolvesFrom }}</h4>
            <h4 v-if="pokemon.abilities && pokemon.abilities.length > 1">Abilities: {{ formatList(pokemon.abilities) }}</h4>
            <h4 v-else-if="pokemon.abilities && pokemon.abilities.length === 1">Ability: {{ formatList(pokemon.abilities) }}</h4>
            <h4 v-if="pokemon.hiddenAbility">Hidden Ability: {{ pokemon.hiddenAbility }}</h4>
            <h4>Base Stats:</h4>
            <ul>
                <li v-if="pokemon.baseStats">HP: {{ pokemon.baseStats.hp }}</li>
                <li v-if="pokemon.baseStats">Atk: {{ pokemon.baseStats.attack }}</li>
                <li v-if="pokemon.baseStats">Def: {{ pokemon.baseStats.defense }}</li>
                <li v-if="pokemon.baseStats">SpAtk: {{ pokemon.baseStats.specialAttack }}</li>
                <li v-if="pokemon.baseStats">SpDef: {{ pokemon.baseStats.specialDefense }}</li>
                <li v-if="pokemon.baseStats">Spd: {{ pokemon.baseStats.speed }}</li>
            </ul>
        <h5>Pokédex Entry: {{ pokemon.flavor_text }}</h5>
        <h5 v-if="pokemon.id < 1026"><a :href="`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pokémon)`" target="_blank">More Info</a></h5>


In these code snippets, you can see how I loaded each pokemon’s information from my backend. The loadpokemon function was used in an onMounted function to automatically run when the page loads. The VueJS template is set up in a way to dynamically fill the fields of that pokemon. I also included the bulbapedia link of each pokemon based on their name.

I then added and customised the navigation bar and found a custom pokémon font to use throughout the webpage. 

### Day 4 (Wednesday): 
I spent most of Wednesday implementing authentication and user settings. I used google auth, and added code to ensure you needed to be signed in to properly see most features of the page. I spent a lot of time trying to have each user have their own pokedex, but ran into various issues, mostly due to how I had set up my endpoints. This is an example of how if I had planned better, I could have made these endpoints with users in mind from the beginning. I also implemented my search bar on my overall pokedex that will filter pokemon automatically based on what is typed.

    const searchTerm = ref('')
    const filteredPokemon = computed(() => {
      return pkmnBe.value.filter(pokemon=>
      pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })
    
      <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="Search by name">
      </div>

Again, I used onMounted to have this function running on the page load and it works very well.

### Day 5 (Thursday): 
I spent Thursday creating the pages to create and delete new pokémon on the frontend, as well as editing predefined and custom pokémon. Some fields were not editable based on the pokedex number of the pokemon. This meant that certain fields were only editable for custom pokemon. 

            <label for="id">Pokédex Number: {{ pokemon.id }}</label>
            <label class="capitalise" v-if="pokemon.id < 1026" for="name">Pokémon Name: {{ pokemon.name }}</label>
            <label v-if="pokemon.id > 1025" for="name">*Pokémon Name:</label>
            <input v-if="pokemon.id > 1025" type="text" name="name" placeholder="Bulbasaur" v-model="pokemon.name" required>
            <label class="capitalise" v-if="pokemon.id < 1026" for="evolvesFrom">Evolves From: {{ pokemon.evolvesFrom }}</label>
            <label v-if="pokemon.id > 1025" for="evolvesFrom">Evolves From:</label>
            <input v-if="pokemon.id > 1025" type="text" name="evolvesFrom" placeholder="" v-model="pokemon.evolvesFrom">

I used v-if to differentiate between new and old pokémon. I had to change some of my endpoints to edit predefined pokemon to stop my fetching method to pull from the pokeapi and override the changes. I did this by automatically saving pokemon to my Mongo database when the user clicks on them. It would then pull from my database for all future views. This allowed edits to stick with changes made. I finished Thursday by adding my third set of data that the brief required and implemented my own database of each of the pokemon games that the user can view and learn about. Each game’s pokedex is accessible through the individual page of each game.

### Day 6 (Friday): 
I spent Friday morning deploying my website to Netlify and ran into issues with how I fetched the entire pokedex (names and images). It was fetching incorrectly because of how I made my endpoint and was fetching each pokemon multiple times. When you’re fetching 1025 individual names and images this is a lot and Netlify wouldn’t allow it. I refactored my backend endpoint and managed to get it working properly. This also sped up my fetching considerably. 

     fetch(pokeListUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch data from the Pokemon list endpoint`);
                }
                return response.json();
            })
            .then((allPokemon) => {
                const pokeApiPokemonList = allPokemon.results.map((pokemon, key) => {
                    // return fetch(`${pokeUrl}/pokemon/${pokemon.name}`)
                    //     .then((pokemonDetailResponse) => {
                    //         if (!pokemonDetailResponse.ok) {
                    //             throw new Error(`Failed to fetch data for ${pokemon.name}`);
                    //         }
                    //         return pokemonDetailResponse.json();
                    //     })
                    //     .then((pokemonDetailData) => {
                            // let uniqueImg = ''
                            // if (pokemonDetailData.id < 1018 && pokemonDetailData.id !== 1013) {
                            //     uniqueImg = `${imageUrl}/${pokemonDetailData.id}.png`
                            // } else {
                            //     uniqueImg = `${altImageUrl}/${pokemonDetailData.id}.png`
                            // }
                            let uniqueImg = ''
                            if ((key + 1) < 1018 && (key + 1) !== 1013) {
                                uniqueImg = `${imageUrl}/${(key + 1)}.png`
                            } else {
                                uniqueImg = `${altImageUrl}/${(key + 1)}.png`
                            }


                        return {
                            id: key + 1,
                            name: pokemon.name,
                            image: uniqueImg,
                        };
                    // });
            });
            return Promise.all(pokeApiPokemonList);
        })
        .then((pokeApiPokemonList) => {
            return Pokemon.find({}, { _id: 0, __v: 0 }).then((customPokemonList) => {
                const allPokemonList = [...pokeApiPokemonList, ...customPokemonList];
                res.json(allPokemonList);
            });

You can see here the refactored code commented out. This was a good lesson in how to fetch from third party apis. I then presented my project on Friday afternoon.

## Challenges

My main challenge of project 2 was user authentication and how to have each user have their own unique pokedex. I wasn’t able to get this feature working, but it felt like I was very close to getting it working. With more time spent on the project, I feel as though I could get it working.

I also wished I planned more thoroughly. I was excited to get started on the project and threw myself into it too quickly and should have structured it properly first.

Since the project, I have started learning about axios, and this might have been an easier way of fetching the data in a quicker manner than the default fetch function.


## Wins

I was particularly pleased with how I used and manipulated a third party api to fetch the information I needed for my app. This was my first experience with it and taught me a lot about how these databases of information can enhance my applications.

I was proud of the website as a whole, but particularly with specific functions like my search bar, and how I edited predefined pokémon. It took a while to work through it, but combining the third party api and MongoDb was very beneficial for what I wanted.

Finally I was really pleased with how I worked through bugs and errors, becoming more confident in reading error messages and console logs. Using console logs more and more to see what is and isn’t working as I worked through functions systematically. 

## Key Learnings/Takeaways

The importance of planning for getting a big picture view of the project and the order I complete things in. I had to go back a lot to endpoints I thought was finished due to new problems I ran into.
Third Party apis are very useful to enhance a user experience and speed up dynamically generating information on a frontend, but how you fetch it is incredibly important to the overall speed of the website, and thus the user experience.
Simplistic ways to style your website without using a css framework. Whilst I will use a css framework for future projects, I wanted to test myself using my own css rules and styling to get how I wanted the site to look.


## Bugs

A few specific pokemon’s bulbapedia links don’t work when their name pulled from the pokemon api doesn’t match the name used in their bulbapedia links. This is only the case with pokemon that have different forms and the pokeapi uses a hyphen and then the base form name after the name.

## Future Improvements

In the future, I would like to continue working on user authentication and each user having their own Pokédex. I would also want to update the database of my pokedexs as new pokémon get added to the pokeapi.





