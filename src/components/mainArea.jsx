import { useState, useEffect } from "react";

const MainArea = () => {
  const [pokemonListAll,setPokemonListAll] = useState([])

  //makes showPokemonList run once page opens
  useEffect(() => {
    showPokemonList()
  }, [])


  //pokemon list fetch
  const showPokemonList = async () => {
    const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    setPokemonListAll(data.results)
    console.log(data.results)   
  }
    

  return (
    <div>
      <section className='pokedex-left'>

      </section>
      <section className='pokedex-middle'>

      </section>
      <section className='pokedex-right border-2 border-black h-[500px] overflow-y-auto'>
        <ul>
          {pokemonListAll.map((pokemon)=> {
            return(
              <li key={pokemon.url}>
                <a href="#" >{pokemon.name}</a>
              </li>
            )
          })

          }
        </ul>
      </section>
    </div>
  )
}

export default MainArea