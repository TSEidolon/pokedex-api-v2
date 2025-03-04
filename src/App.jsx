import Header from "./components/header"
import MainArea from "./components/mainArea"
import MainAreaTest from "./components/mainAreaTest"


function App() {
  

  return (
    <div className="bg-[url(./assets/pokeBackground.jpg)] w-full h-screen flex justify-center flex-col gap-5">
      <Header/>
      <MainArea/>
    </div>
  )
}

export default App
