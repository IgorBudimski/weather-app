import { combineDates } from "../helpers/combineDates";
import { longDay } from "../helpers/longDay";
import './WidgetDay.css';


const WidgetDay = (props) => {
    const { avgTemp, data, temp, id } = props;

    return (
        <>
            {data
                ?
                <div className={avgTemp ? "averageWrapper" : null}>
                    <span className="title">
                        {avgTemp ? combineDates(data[0].dt, data[6].dt) : id || id === 0 ? longDay(data[id].dt) : null}
                    </span>
                    <div className="tempWrapper">
                        <span className={avgTemp ? "average" : "current"}>{avgTemp ? avgTemp : Math.round(temp)}</span>
                        <span className={avgTemp ? "exp" : "currentExp"}>°C</span>
                    </div>
                </div>
                :
                null
            }
        </>
    );
}

export default WidgetDay;