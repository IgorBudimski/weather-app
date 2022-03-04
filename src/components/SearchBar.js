import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '../hooks/useDebounceHook';
import weatherImg from '../assets/img/weather.png';
import spinner from '../assets/img/spinner.png';
import './SearchBar.css';


const SearchBar = (props) => {
    const [icon, setIcon] = useState('search');
    const [iconColor, setIconColor] = useState('gray');
    const [borderClass, setborderClass] = useState('searchWrapper');
    const [inputValue, setInputValue] = useState('');
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const debounced = useDebounce(inputValue, 600);
    const inputRef = useRef();

    useEffect(() => {
        if (props.data) {
            setIcon('search');
            if (props.data.cod >= 200 && props.data.cod < 300) {
                setError(null);
            } else {
                setInputValue('');
                setError(props.data.message);
            }
        }
    }, [props.data])

    useEffect(() => {
        if (search) {
            props.searchPhrase(search);
        }
    }, [search, props])

    useEffect(() => {
        if (debounced) {
            setIcon('loading');
            setborderClass('searchWrapper');
            setSearch(debounced);
        }
    }, [debounced])

    const handleChange = (e) => {
        if (e.target.value.length > 0) {
            setIconColor('black');
            setInputValue(e.target.value);
            setborderClass('searchWrapperActive');
        } else {
            setIcon('search');
            setIconColor('gray');
            setborderClass('searchWrapper');
            setInputValue(e.target.value);
        }
    }

    const handleClick = (e) => e.target.select();

    return (
        <div className="searchContainer">
            <div className="imgWrapper"><img src={weatherImg} className="imgDefault" alt="" /></div>
            <div className={borderClass}>
                <input ref={inputRef} value={inputValue} onChange={handleChange} onClick={handleClick}
                    type="text" className={error ? "searchBar error" : "searchBar"} placeholder={error ? 'error: ' + error : "Please enter your location..."}>
                </input>
                <div className="iconWrapper">
                    {icon === 'search'
                        ?
                        <FontAwesomeIcon icon={faMagnifyingGlass} id="icon" color={iconColor} />
                        :
                        <img className='spinner' src={spinner} alt="" />
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchBar;