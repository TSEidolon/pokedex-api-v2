import { useState, useEffect } from "react";

const MainAreaTest = () => {
  const [pokemonListAll,setPokemonListAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    // console.log(data.results)   
  }
    
  const filteredPokemonList = pokemonListAll.filter(
    (pokemon) => pokemon.name.includes(searchTerm)
  )

  //Index handling
  const handleSelect = (index) => {
    setSelectedIndex(index);
    console.log(index)
  }
  const totalPokemon = pokemonListAll.length
  const prevIndex = (selectedIndex - 1 + totalPokemon) % totalPokemon;
  const nextIndex = (selectedIndex + 1) % totalPokemon;

  const highlightPokemon = pokemonListAll[selectedIndex];
  const prevPokemon = pokemonListAll[prevIndex];
  const nextPokemon = pokemonListAll[nextIndex];
  console.log(highlightPokemon,prevPokemon,nextPokemon)

  //fetch selected pokemon
  const showPokemon = async (url) => {
    const response = await fetch (url);
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    console.log(data)
    setSelectedPokemon(data)
  }

  

  return (
    <div>
      <section className='pokedex-top border-2 border-amber-600'>
        <input className='search-box' type="text" placeholder='Search...' value={searchTerm} onChange={event => setSearchTerm(event.target.value)}
        />
      </section>
      <main className="flex justify-center items-center gap-5">
        <section className='pokedex-left flex flex-col gap-5'>
          <div className="h-[100px] w-[100px] border-2 border-green-600">Top</div>
          <div className="h-[100px] w-[100px] border-2 border-green-600">Bottom</div>
        </section>
        <section className="pokedex-middle h-[400px] w-[350px] border-2 border-black">
          {
            selectedPokemon && (
              <div>
                <h2 className="">{selectedPokemon.name}</h2>
                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}  />
                <p>Height: {selectedPokemon.height}</p>
                <p>Weight: {selectedPokemon.weight}</p>

                {
                  selectedPokemon.stats.map((stat, index) => (
                    <div>
                      <p> {stat.stat.name}: {stat.base_stat} </p>
                    </div>
                  ))
                }
              </div>
            )
          }
        </section>

        <section className='pokedex-right border-2 border-black h-[500px] overflow-y-auto'>
          <ul>
            {filteredPokemonList.map((pokemon, index)=> {
              return(
                <li key={pokemon.url}>
                  <a onClick={()=> {showPokemon(pokemon.url), handleSelect(index)}} href="#" >{pokemon.name}</a>
                </li>
              )
            })

            }
          </ul>
        </section>
      </main>
    </div>
  )
}

export default MainAreaTest