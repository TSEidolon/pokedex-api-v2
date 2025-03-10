import { useState, useEffect, useRef } from "react";
import pokeBallBackground from "../assets/pokeBallBackground.png"

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
    <div className="flex flex-col justify-center items-center ">
      <section className='pokedex-top flex justify-center w-[350px] lg:w-[250px] pb-2 lg:pb-5'>
        <input className='bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#DA5B1E] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-sm px-5 lg:px-3 py-2 shadow-md focus:shadow-lg focus:shadow-[#DA5B1E] text-center w-full lg:w-auto' type="text" placeholder='Pokesearch...' value={searchTerm}  
        onChange={(event) => {
          setSearchTerm(event.target.value);
          const foundPokemon = pokemonListAll.find(pokemon => pokemon.name.includes(event.target.value));
          if (foundPokemon) {
            scrollToPokemon(foundPokemon.name);
          }}}
        />
      </section>
      <main className="flex justify-center items-center gap-2 lg:gap-5 h-full lg:h-[440px] lg:flex-row flex-col-reverse">
        <section className='pokedex-left flex flex-row lg:flex-col h-full gap-5  lg:justify-between lg:w-auto w-full justify-center select-none'>
          <div className="prevSelectedIndex-container">
            <div className=" lg:h-[150px] lg:w-[150px] h-[110px]  w-[110px] border-2 border-black rounded-sm bg-white/30 backdrop-blur-sm relative">
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
                <img className="w-[80%]" src={prevSelectedIndex.sprites.front_default} alt={prevSelectedIndex.name} />
                <h2 className="font-semibold">{capitalizeFirstLetter(prevSelectedIndex.name)}</h2>
              </div>
            )}
            <img src={pokeBallBackground} alt="pokeball background" className="absolute object-contain top-0 left-0 opacity-20 -z-10" />
            </div>
            <div className="relative pt-4 animate-bounce select-none">
              <span className="triangle absolute top-[6%] left-[45%] "></span>
              <p className="border-2 border-black rounded-sm text-center bg-white/30 backdrop-blur-sm">Previous Entry</p>
            </div>
          </div>
          <div className="nextSelectedIndex-container">
            <div className="lg:h-[150px] lg:w-[150px] h-[110px]  w-[110px] border-2 border-black rounded-sm bg-white/30 backdrop-blur-sm relative">
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
                <img className="w-[80%]" src={nextSelectedIndex.sprites.front_default} alt={nextSelectedIndex.name} />
                <h2 className="font-semibold">{capitalizeFirstLetter(nextSelectedIndex.name)}</h2>
              </div>
            )}
            <img src={pokeBallBackground} alt="pokeball background" className="absolute object-contain top-0 left-0 opacity-20 -z-10" />
            </div>
            <div className="relative pt-4 animate-bounce select-none">
              <span className="triangle absolute top-[6%] left-[45%] "></span>
              <p className="border-2 border-black rounded-sm text-center bg-white/30 backdrop-blur-sm">Next Entry</p>
            </div>
          </div>


        </section>
        <section className="pokedex-middle h-[440px] w-[350px] border-2 border-black rounded-sm bg-[#DA5B1E] backdrop-blur-xs relative ">
          {
            selectedPokemon && (
              <div>
                <div className="flex justify-stretch p-5">
                  <img className="size-[140px] border-2 border-black bg-zinc-200  rounded-sm select-none" src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name}  />
                  <div className="text-lg text-yellow-50 flex flex-col justify-between w-full pl-3">
                    <h2 className="font-semibold text-xl ">{capitalizeFirstLetter(selectedPokemon.name)}</h2>
                    <p className="pb-1 ">Height: {(selectedPokemon.height)/10} m</p>
                    <p>Weight: {(selectedPokemon.weight)/10} kg</p>
                    <button onClick={()=> window.open(`https://pokemondb.net/pokedex/${selectedPokemon.name}`)} className="border-2 border-black p-0.5 text-black bg-zinc-200 rounded-sm w-full hover:text-white hover:font-bold hover:bg-black hover:border-white shadow-md hover:shadow-lg hover:shadow-white duration-300 ease-in-out cursor-pointer select-none">
                      More Info
                    </button>
                  </div>
                </div>
                <div className="mx-5 rounded-sm border-2 border-black bg-zinc-200 select-none ">
                  <div className="py-3">
                    {
                      selectedPokemon.stats.map((stat, index) => (
                        <div className="px-5 py-[3px] " key={index}>
                          <div className="flex  relative pb-1">
                            <p className="pr-1 z-10"> {capitalizeFirstLetter(stat.stat.name)}: </p>
                            <p className="z-10"> {stat.base_stat} </p>
                            <span className="absolute bottom-0 bg-amber-400 w-full h-[7px] z-0 rounded-sm" style={{width: `${stat.base_stat * 1.5}px` }} ></span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>

              </div>
            )
          }
          <img src={pokeBallBackground} alt="pokeball background" className="absolute object-contain h-full top-0 left-0 opacity-10 -z-10" />
        </section>

        <section className='pokedex-right rounded-sm border-2 border-black lg:h-[440px] lg:w-[150px] overflow-y-auto bg-white/30 backdrop-blur-sm [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-[#DA5B1E] h-[120px] w-[350px] '>
          <ul className="">
            {pokemonListAll.map((pokemon, index) => (
            <li key={pokemon.url} ref={(spotlight) => (pokemonRefs.current[pokemon.name] = spotlight)} className={` text-sm lg:text-base text-center lg:py-1 py-0.5 ${highlightedPokemon === pokemon.name ? " text-[#DA5B1E] font-bold " : " text-black "}`}>
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
      <section className="pokedex-bottom  grid justify-items-center items-end lg:grid-cols-6 lg:py-5  py-2 grid-cols-3 select-none">
        <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif" alt="Eevee"/>
        <img src="https://img.pokemondb.net/sprites/black-white/anim/shiny/metagross.gif" alt="Metagross"/>
        <img className="" src="https://img.pokemondb.net/sprites/black-white/anim/normal/gengar.gif" alt="Gengar"/>
        <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/tyranitar.gif" alt="Tyranitar"/>
        <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/electivire.gif" alt="Electivire"/>
        <img className="" src="https://img.pokemondb.net/sprites/black-white/anim/normal/typhlosion.gif" alt="Typhlosion"/>
        
      </section>
      <section className="border-2 border-black bg-white/20 backdrop-blur-sm rounded-sm p-1 my-2 flex select-none">
       
        Brought to life by Edgar, fueled by coffee ☕. 
      </section>

    </div>
  )
}

export default MainArea