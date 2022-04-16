import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import citysList from '../../city.list.json';
import { serch } from '../../redux/homeSlice';
import st from './input.module.scss';

export default function Input() {
  const [isActive, setIsActive] = useState(false);
  const [citys, setCitys] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputName, setInputName] = useState('');

  const dispatch = useDispatch();
  const { city } = useSelector(store => store.homeSlice);

  const onChange = e => {
    setIsActive(true);
    setInputValue(e.currentTarget.value);
    setCitys(
      citysList
        .filter(city =>
          city.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
        )
        .slice(0, 3)
    );
  };

  const onClick = (name, country) => {
    setInputValue(`${name}, ${country}`);
    setInputName(name);
    setIsActive(false);
  };

  const onSubmit = e => {
    e.preventDefault();

    const lowFilter = inputName.toLowerCase();
    if (city.find(it => it.name.toLowerCase() === lowFilter)) {
      return;
    } else {
      dispatch(serch(inputName));
    }
    setInputName('');
    setInputValue('');
  };

  return (
    <form onSubmit={onSubmit} className={st.inputBlock}>
      <div>
        <input
          type="text"
          className={st.input}
          placeholder="City..."
          onChange={onChange}
          value={inputValue}
        />
        {isActive && (
          <ul className={st.citysList}>
            {citys.map(({ id, name, country }) => (
              <li key={id} onClick={() => onClick(name, country)}>
                {name}, {country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className={st.btn}>
        Add
      </button>
    </form>
  );
}
