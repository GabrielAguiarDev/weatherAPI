import { MdLocationOn } from 'react-icons/md'
import { BsDroplet } from 'react-icons/bs'
import { FiWind } from 'react-icons/fi'

export default function City({ name, flag, temp, description, icon, humidity, speed, hide }) {
    return (
        <div id="weather-data" className={hide ? "hide" : ""}>
          <h2>
            <MdLocationOn />
            <span>{name}</span>
            <img src={process.env.REACT_APP_URL_COUNTRY + flag} alt="bandeira do pais"id="country" />
          </h2>
          <p className="temp"><span>{temp}</span>&deg;C</p>
          <div id="description">
            <p>{description}</p>
            <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="condições do tempo" />
          </div>
          <div id="details">
            <p>
              <BsDroplet />
              <span>{humidity}%</span>
            </p>
            <p>
              <FiWind />
              <span>{speed}km/h</span>
            </p>
          </div>
        </div>
    )
}