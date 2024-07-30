import axios from 'axios'
import React, {  useState } from 'react'

export default function Home() {
  const [city,setCity] = useState("")
  const [data,setData] = useState({
    celcius:10,
    name:"London",
    humidity: 10,
    speed:2,
    image : "/Assets/sun.png"
  })
 
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(city!== ""){
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=05b4a996ee286024c164d556734cb530&units=metric`
      axios.get(apiURL)
      .then(res => {
        let imagePath = "";
        if(res.data.weather[0].main === "Clouds"){
          imagePath = "/Assets/clouds.png"
        }
        else if(res.data.weather[0].main === "Rain"){
          imagePath = "/Assets/rain.png"
        }
        else if(res.data.weather[0].main === "Mist"){
          imagePath = "/Assets/sun.png"
        }
       else if(res.data.weather[0].main === "Clear"){
          imagePath = "/Assets/day.png"
        }
        else{
          imagePath = "/Assets/sun.png"
        }

        setData({
          ...data, celcius: res.data.main.temp, name:res.data.name, humidity: res.data.main.humidity, 
          speed:res.data.wind.speed , image: imagePath
        })
      })
      .catch(err => {
        if(err.response.status===404){
          alert("This city weather is not available")
        }
      })
    }
    if(city===404){
      alert("City is not Found in api")
    }
  }
  return (
    <main>
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <div className="card text-center p-3">
                       <div className="search">
                     <form onSubmit={handleSubmit}>
                     <input type="text" placeholder='Enter City Name' className='me-3 py-2 px-3 mb-0' onChange={e => setCity(e.target.value)} />
                     <button className=' button btn btn-outline-dark px-3 py-2 mb-2' type='submit'>Search</button>
                     </form>
                       </div>
                       <div className="winfo mt-3 py-3">
                       <img src={data.image} alt="" className='py-5' />
                        <h1>{Math.round(data.celcius)}°C</h1>
                        <h2>{data.name}</h2>
                        <div className="details py-3">
                          <div className="col">
                            <img src="/Assets/humidity.png" alt="" />
                            <div className='hum'>
                              <p>{Math.round(data.humidity)}%</p>
                              <p>Humidity</p>
                            </div>
                          </div>
                          <div className="col">
                            <img src="/Assets/speed.png" alt="" />
                            <div className='wind'>
                              <p>{Math.round(data.speed)} km/h</p>
                              <p>Wind</p>
                            </div>
                          </div>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
