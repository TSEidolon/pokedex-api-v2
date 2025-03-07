import pokeball from "../assets/pokeball.png"

const Header = () => {
  return (
    <div className='flex justify-center items-center text-4xl py-2 lg:py-4 select-none gap-2' >
      <p className="font-semibold">Pokedex API</p> 
      <img className="size-[30px] " src={pokeball} alt="different pokeballs" />
    </div>
  )
}

export default Header