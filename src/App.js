import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCity, geo } from './redux/homeSlice';
import HomePage from './components/HomePage/Home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('geo')) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        dispatch(geo({ latitude, longitude }));
      });
    }

    dispatch(setCity(JSON.parse(localStorage.getItem('city-data')) || []));
  }, []);
  return <HomePage />;
}

export default App;
