import React, { useState } from 'react';
import classNames from 'classnames';
import Cross from '../../icons/cross.js';
import st from './card.module.scss';
import { useDispatch } from 'react-redux';
import { delCity, editCity } from '../../redux/homeSlice';

export default function Card({ data }) {
  const dispatch = useDispatch();
  const [isCel, setIsCel] = useState(() => data.main.flag_isCelsius);

  const date = new Date().toUTCString().slice(0, -18);
  const time = new Date().toLocaleTimeString().slice(0, -3);
  const dateTime = date.concat(', ', time);

  const iconS = data.weather[0].icon;
  const link = `http://openweathermap.org/img/wn/${iconS}@2x.png`;

  const onBtnC = () => {
    dispatch(editCity({ id: data.id, isCel: true }));
    setIsCel(true);
  };

  const onBtnF = () => {
    dispatch(editCity({ id: data.id, isCel: false }));
    setIsCel(false);
  };

  return (
    <div
      className={classNames(st.card, {
        [st.worm]: data.main.tempC > 0,
        [st.cold]: data.main.tempC <= 0,
      })}
    >
      <div className={st.topInfo}>
        <div className={st.location}>
          {data.name}, {data.sys.country}
        </div>
      </div>
      <div className={st.weather}>
        <img src={link} alt="icon" />
        {data.weather[0].main}
      </div>
      <p className={st.date}>{dateTime}</p>
      <div className={st.graph}></div>
      <div className={st.bottomInfo}>
        <div>
          <div className={st.bottomInfoTemperature}>
            {isCel ? (
              <span className={st.degrees}>{data.main.tempC}</span>
            ) : (
              <span className={st.degrees}>{data.main.tempF}</span>
            )}
            <div className={st.units}>
              <button
                className={classNames(st.celsius, { [st.active]: isCel })}
                onClick={onBtnC}
              >
                °C
              </button>
              <button
                className={classNames(st.fahrenheit, { [st.active]: !isCel })}
                onClick={() => onBtnF()}
              >
                °F
              </button>
            </div>
          </div>
          <p className={st.feels}>
            Feels like:{' '}
            {isCel ? (
              <span>{data.main.feelsC} °C</span>
            ) : (
              <span>{data.main.feelsF} °F</span>
            )}
          </p>
        </div>
        <ul className={st.bottomInfoPrecipitation}>
          <li>
            Wind: <span className={st.worm}>{data.wind.speed} m/s</span>
          </li>
          <li>
            Humidity: <span className={st.worm}>{data.main.humidity}%</span>
          </li>
          <li>
            Pressure: <span className={st.worm}>{data.main.pressure}Pa</span>
          </li>
        </ul>
      </div>
      <Cross
        trigger={() => dispatch(delCity(data.id))}
        className={st.iconCross}
      />
    </div>
  );
}
