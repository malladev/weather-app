import axios from 'axios'
import { apiKey } from '../constants'

const forecatApi = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}aqi=no&alerts=no`
const locationApi = params => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`


const apiCall = async (api) => {
    const options ={ 
        method: 'GET',
        url: api
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log('error====',error)
        return null
    }
}

export const fetchWeatherData = params => {
    return apiCall(forecatApi(params))
}

export const fetchLocationsData = params => {
    return apiCall(locationApi(params))
}