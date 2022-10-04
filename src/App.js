import { useState } from 'react'

import { FaSearch } from 'react-icons/fa'

import City from './components/City'
import NotFound from './components/404'

import './App.css';

function App() {

  const [search, setSearch] = useState("")
  const [imageBackground, setImageBackground] = useState("")
  const [climate, setClimate] = useState([])
  const [notFoundErro, setNotFoundErro] = useState(false)
  const [hide, setHide] = useState(true)

  const searchCity = async(e) => {
    e.preventDefault()
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}&lang=pt_br`)
    const data = await res.json()
    if (data.cod === "404") {
      setNotFoundErro(true)
      setImageBackground(false)
    } else {
      setHide(false)
      setClimate([data])
      setImageBackground(process.env.REACT_APP_IMAGE_BACKGROUND + data.name)
      setNotFoundErro(false)
    }
  }

  const handleKeyUp = (e) => {
    if (e.code === "Enter" && search !== "") {
      searchCity()
      setSearch("");
    }
  }

  return (
    <div className="App">
      <div className={imageBackground ? 'backgroundImage' : 'hide'}>
        <img src={imageBackground} alt="imagem relativa a cidade" />
      </div>
      <div className="container">
        <h1>Confira o clima de uma cidade:</h1>
        <form onSubmit={searchCity}>
          <input 
            type="text" 
            placeholder="Digite o nome da cidade"
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyUp}
            value={search}
          />
          <button><FaSearch /></button>
        </form>
        {notFoundErro === true ? (
          <NotFound />
        ) : (
          climate.map((city, index) => (
            <City 
              key={index}
              name={city.name}
              flag={city.sys.country}
              temp={(parseInt(parseInt(city.main.temp) - 273,15) - 10)}
              description={city.weather[0].description}
              icon={city.weather[0].icon}
              humidity={city.main.humidity}
              speed={city.wind.speed}
              hide={hide}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
