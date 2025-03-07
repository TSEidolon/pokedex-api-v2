import pokeball from "../assets/pokeball.png"

const Header = () => {
  return (
    <div className='flex justify-center text-4xl py-2 lg:py-4 select-none gap-2' >
      <p className="font-semibold">Pokedex API</p> 
      <img className="w-[35px] h-[35px] " src={pokeball} alt="different pokeballs" />
    </div>
  )
}

export default Header