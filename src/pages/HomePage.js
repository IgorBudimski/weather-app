import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherWidget from '../components/WeatherWidget';
import Quotes from '../components/Quotes';
import { getWeather } from '../requests/getWeather';
import { defGrad } from '../constants/constants';
import { colorFromTemp } from "../helpers/colorFromTemp";
import { averageFive } from '../helpers/averageFive';
import { background } from '../helpers/background';
import './HomePage.css';


const HomePage = () => {
    const [data, setData] = useState(null);
    const [average, setAverage] = useState(null);
    const [search, setSearch] = useState(null);
    const [gradients, setGradients] = useState(null);

    useEffect(() => {
        if (search) {
            getWeather(search, true, 1, null, null).then(res =>
                res.cod >= 200 && res.cod < 300
                    ?
                    getWeather(null, true, 7, res.city.coord.lat, res.city.coord.lon).then(result => setData(result))
                    :
                    setData(res)
            );
        }
    }, [search])

    useEffect(() => {
        if (data) {
            if (data.cod >= 200 && data.cod < 300) {
                const avg = averageFive(data.list);
                setAverage(avg);
                setGradients([colorFromTemp(avg - 20 <= -40 ? -40 : avg - 20), colorFromTemp(avg)]);
            } else {
                setGradients(null);
            }
        }
    }, [data])

    return (
        <div className="homeContainer" style={background(gradients ? gradients : defGrad)}>
            <div className="container">
                <Quotes />
                <SearchBar data={data} searchPhrase={(val) => setSearch(val)} />
                <WeatherWidget data={data} average={average} />
            </div>
        </div>
    );
}

export default HomePage;