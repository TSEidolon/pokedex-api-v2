import { useState, useEffect, useRef } from "react";

const MainArea = () => {
  const pokemonRefs = useRef({})
  const [highlightedPokemon, setHighlightedPokemon] = useState(null);
  const [pokemonListAll,setPokemonListAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [prevSelectedIndex, setPrevSelectedIndex] = useState(null);
  const [nextSelectedIndex, setNextSelectedIndex] = useState(null);

  //capitalzes first letter 
  const capitalizeFirstLetter = (name) => (
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "")

  //makes showPokemonList run once page opens
  useEffect(() => {
    showPokemonList()
  }, [])

  //pokemon list fetch
  const showPokemonList = async () => {
    const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0')
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    setPokemonListAll(data.results)
  }
    
  // const filteredPokemonList = pokemonListAll.filter(
  //   (pokemon) => pokemon.name.includes(searchTerm)
  // )

  //scroll to pokemon on search
  const scrollToPokemon = (pokemonName) => {
    if (pokemonRefs.current[pokemonName]) {
      pokemonRefs.current[pokemonName].scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedPokemon(pokemonName); 
    }
  };

  //Index handling
  const handleSelect = (index) => {
    setSelectedIndex(index);

  }

  //fetch prev and next pokemon
  const indexPokemonPrev = async (pokemon) => {
    if (!pokemon) return;
    try {
      const responsePrev = await fetch(pokemon.url);
      if (!responsePrev.ok) {
        throw new Error(`Error fetching Pokemon: ${responsePrev.statusText}`);
      }
      const prevData = await responsePrev.json();
      setPrevSelectedIndex(prevData);
    } catch (error) {
      console.error(error);
    }
  };
  const indexPokemonNext = async (pokemon) => {
    if (!pokemon) return;
    try {
      const responseNext = await fetch(pokemon.url);
      if (!responseNext.ok) {
        throw new Error(`Error fetching Pokemon: ${responseNext.statusText}`);
      }
      const nextData = await responseNext.json();
      setNextSelectedIndex(nextData);
    } catch (error) {
      console.error(error);
    }
  };
  
  //fetch selected pokemon
  const showPokemon = async (url) => {
    const response = await fetch (url);
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    setSelectedPokemon(data)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <section className='pokedex-top border-2 border-amber-600 w-[200px]'>
        <input className='search-box' type="text" placeholder='Search...' value={searchTerm}  
        onChange={(event) => {
          setSearchTerm(event.target.value);
          const foundPokemon = pokemonListAll.find(pokemon => pokemon.name.includes(event.target.value));
          if (foundPokemon) {
            scrollToPokemon(foundPokemon.name);
          }}}
        />
      </section>
      <main className="flex justify-center items-center gap-5">
        <section className='pokedex-left flex flex-col gap-5'>
          <div className="h-[150px] w-[150px] border-2 border-green-600">
            {prevSelectedIndex && (
              <div 
                className="flex flex-col justify-between items-center p-2 cursor-pointer" 
                onClick={() => {
                  setSelectedPokemon(prevSelectedIndex);
                  handleSelect(selectedIndex - 1 < 0 ? pokemonListAll.length - 1 : selectedIndex - 1);

                  // Get new previous and next indices
                  const total = pokemonListAll.length;
                  const newIndex = (selectedIndex - 1 + total) % total;
                  const newPrevIndex = (newIndex - 1 + total) % total;
                  const newNextIndex = (newIndex + 1) % total;

                  indexPokemonPrev(pokemonListAll[newPrevIndex]);
                  indexPokemonNext(pokemonListAll[newNextIndex]);
                }}
              >
                <h2>{capitalizeFirstLetter(prevSelectedIndex.name)}</h2>
                <img className="w-[80%]" src={prevSelectedIndex.sprites.front_default} alt={prevSelectedIndex.name} />
              </div>
            )}


          </div>
          <div className="h-[150px] w-[150px] border-2 border-green-600">
            {nextSelectedIndex && (
              <div 
                className="flex flex-col justify-between items-center p-2 cursor-pointer"
                onClick={() => {
                  setSelectedPokemon(nextSelectedIndex);
                  handleSelect((selectedIndex + 1) % pokemonListAll.length);

                  // Get new previous and next indices
                  const total = pokemonListAll.length;
                  const newIndex = (selectedIndex + 1) % total;
                  const newPrevIndex = (newIndex - 1 + total) % total;
                  const newNextIndex = (newIndex + 1) % total;

                  indexPokemonPrev(pokemonListAll[newPrevIndex]);
                  indexPokemonNext(pokemonListAll[newNextIndex]);
                }}
              >
                <h2>{capitalizeFirstLetter(nextSelectedIndex.name)}</h2>
                <img className="w-[80%]" src={nextSelectedIndex.sprites.front_default} alt={nextSelectedIndex.name} />
              </div>
            )}
          </div>

        </section>
        <section className="pokedex-middle h-[400px] w-[350px] border-2 border-black">
          {
            selectedPokemon && (
              <div>
                <h2 className="">{capitalizeFirstLetter(selectedPokemon.name)}</h2>
                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}  />
                <p>Height: {selectedPokemon.height}</p>
                <p>Weight: {selectedPokemon.weight}</p>

                {
                  selectedPokemon.stats.map((stat, index) => (
                    <div key={index}>
                      <p> {stat.stat.name}: {stat.base_stat} </p>
                    </div>
                  ))
                }
                <button onClick={()=> window.open(`https://pokemondb.net/pokedex/${selectedPokemon.name}`)} className="border-2 border-red-400 p-2">
                  More Info
                </button>
              </div>
            )
          }
        </section>

        <section className='pokedex-right border-2 border-black h-[500px] overflow-y-auto'>
          <ul>
            {pokemonListAll.map((pokemon, index) => (
            <li key={pokemon.url} ref={(spotlight) => (pokemonRefs.current[pokemon.name] = spotlight)} className={highlightedPokemon === pokemon.name ? " text-red-500 font-bold " : " text-black "}>
              <a
                onClick={() => {
                  showPokemon(pokemon.url);
                  handleSelect(index);
                  setHighlightedPokemon(pokemon.name)

                  const total = pokemonListAll.length;
                  const prevIndex = (index - 1 + total) % total;
                  const nextIndex = (index + 1) % total;

                  indexPokemonPrev(pokemonListAll[prevIndex]);
                  indexPokemonNext(pokemonListAll[nextIndex]);
                }}
                href="#"
              >
                {capitalizeFirstLetter(pokemon.name)}
              </a>
            </li>
            ))}
          </ul>
        </section>
      </main>
      <section className="pokedex-bottom">
      <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/gengar.gif" alt="Gengar"/>
      </section>
    </div>
  )
}

export default MainArea