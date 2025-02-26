import { useState, useEffect } from "react";

const MainAreaTest = () => {
  const [pokemonListAll,setPokemonListAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
    
  const filteredPokemonList = pokemonListAll.filter(
    (pokemon) => pokemon.name.includes(searchTerm)
  )

  //fetch selected pokemon
  // const showPokemon = async (url) => {
  //   const response = await fetch (url);
  //   if (!response.ok) {
  //     console.error(`Error fetching Pokemon: ${response.statusText}`);
  //     return;
  //   }
  //   const data = await response.json();
  //   setSelectedPokemon(data)
  // }

  return (
    <div>
      <section className='pokedex-top border-2 border-amber-600'>
        <input className='search-box' type="text" placeholder='Search...' value={searchTerm} onChange={event => setSearchTerm(event.target.value)}
        />
      </section>
      <section className="pokedex-left">

      </section>
      <section className='pokedex-middle'>

      </section>
      <section className='pokedex-right border-2 border-black h-[500px] overflow-y-auto'>
        <ul>
          {filteredPokemonList.map((pokemon)=> {
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

export default MainAreaTest