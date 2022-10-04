import { useState, KeyboardEvent } from 'react'

import { FaSearch } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { BsDroplet } from 'react-icons/bs'
import { FiWind } from 'react-icons/fi'

import './App.css';

function App() {

  const [search, setSearch] = useState("")
  const [climate, setClimate] = useState({})
  const [hide, setHide] = useState(true)

  const searchCoordinates = async(e) => {
    e.preventDefault()
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${process.env.REACT_APP_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    let lat = data[0].lat
    let lon = data[0].lon
    searchCity(lat, lon)
  }

  const searchCity = async(lat, lon) => {
    console.log(lat, lon)
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json()
    setClimate(data)
    setHide(false)
  }

  const handleKeyUp = (e) => {
    if (e.code === "Enter" && search !== "") {
      searchCoordinates()
      setSearch("");
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Confira o clima de uma cidade:</h1>
        <form onSubmit={searchCoordinates}>
          <input 
            type="text" 
            placeholder="Digite o nome da cidade"
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyUp}
            value={search}
          />
          <button><FaSearch /></button>
        </form>
        <div id="weather-data" className={hide ? "hide" : ""}>
          <h2>
            <MdLocationOn />
            <span>{climate.name}</span>
            <img src={process.env.REACT_APP_URL_COUNTRY + climate.sys.country} alt="bandeira do pais"id="country" />
          </h2>
          <p><span>{climate.wind.deg}</span>&deg;C</p>
          <div id="description">
            <p>{climate.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${climate.weather[0].icon}.png`} alt="condições do tempo" />
          </div>
          <div id="details">
            <p>
              <BsDroplet />
              <span>{climate.main.humidity}%</span>
            </p>
            <p>
              <FiWind />
              <span>{climate.wind.speed}km/h</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
