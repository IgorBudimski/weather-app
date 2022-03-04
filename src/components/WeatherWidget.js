import WidgetDay from "./WidgetDay";
import './WeatherWidget.css';


const WeatherWidget = (props) => {
    const { average, data } = props;

    return (
        <div className="gridContainer">
            <WidgetDay data={data ? data.list : null} avgTemp={average ? average : null} id={null} temp={null} />
            {data && data.list
                ?
                data.list.map((item, index) => <WidgetDay key={index} data={data.list} avgTemp={null} id={index} temp={item.temp.day} />)
                :
                null
            }
        </div>
    );
}

export default WeatherWidget;