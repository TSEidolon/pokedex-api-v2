import React from 'react'

const MainArea = () => {


  //pokemon list fetch
  async function pokemonList() {
    const pokemonListURL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    try{
      const listResponse = await fetch (pokemonListURL);
      if(!listResponse.ok){
        throw new error(`Response for pokemon list: ${listResponse.status}`)
      }
    const pokemonListData = await listResponse.json();
    console.log(pokemonListData)
    } 
    
    catch (error) {
      console.error(error.message);
    }
  }

  pokemonList()
  return (
    <div>
      <section className='pokedex-left'>

      </section>
      <section className='pokedex-middle'>

      </section>
      <section className='pokedex-right'>

      </section>
    </div>
  )
}

export default MainArea