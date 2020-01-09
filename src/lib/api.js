import axios from 'axios';

export function getAPOD(date=''){
  return axios.get(`https://api.nasa.gov/planetary/apod?api_key=5DSmqXVBeFKjDKck2H58HA75gZgIjGiEm2imWiOh&date=${date}`)
}