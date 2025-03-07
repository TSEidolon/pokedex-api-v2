 ## [Live Website](https://pokedex-tseidolon.netlify.app/)
 - [Figma Mockup](https://www.figma.com/design/ZjhKNX4SJLmqhdf7YKuuXK/Pokedex-Api?node-id=0-1&t=HPZ8UZpWkXefTma6-1)
  - Uses the pokemon API from [pokeapi](https://pokeapi.co/)

 - Had trouble with the next and previous pokemon to fetch at the same time as the main pokemon. Turns out that the states of the next and previous pokemon updated at a different interval as the main. This lead to the them being one state behind.
 - Fixed by transfering the troublemakers into the filteredPokemonList click event.

```

{filteredPokemonList.map((pokemon, index)=> {
  return(
    <li key={pokemon.url}>
      <a onClick={()=> {
        showPokemon(pokemon.url); 
        handleSelect(index);

        const total = pokemonListAll.length;
        const prevIndex = (index - 1 + total) % total;
        const nextIndex = (index + 1) % total;

        indexPokemonPrev(pokemonListAll[prevIndex]);
        indexPokemonNext(pokemonListAll[nextIndex]);
        }} href="#">
        {pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}
        </a>
    </li>
 )})}

```



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# pokedex-api-v2
