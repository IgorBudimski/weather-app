import React, { useState, useEffect } from 'react';
import { getQuotes } from '../requests/getQuotes';
import { getRandomInt } from '../helpers/getRandomInt';
import '../components/Quotes.css';


const Quotes = () => {
    const [data, setData] = useState(null);
    const [rnd, setRnd] = useState(null);

    useEffect(() => {
        getQuotes().then(res => {
            setData(res);
            setRnd(getRandomInt(0, res.length));
            setInterval(() => {
                setRnd(getRandomInt(0, res.length));
            }, 30000);
        });
    }, [])

    return (
        <div className={data ? "quotesContainer" : null}>
            <span className="quote">{data && rnd ? "\"" + data[rnd].text + "\"" : null}</span>
            <span className="author">{data && rnd ? data[rnd].author : null}</span>
        </div>
    );
}
export default Quotes;