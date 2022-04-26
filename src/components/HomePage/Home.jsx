import React from 'react';
import { useSelector } from 'react-redux';
import Input from '../Input/Input';
import Card from '../Card/Card';
import st from './home.module.scss';

export default function Home() {
  const { city } = useSelector(store => store.homeSlice);

  return (
    <>
      <Input />
      <div className={st.cardList}>
        {city.map(el => (
          <Card key={el.id} data={el} />
        ))}
      </div>
      <p>test</p>
    </>
  );
}
