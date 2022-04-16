import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api, MyGeo } from './api';

const initialState = {
  city: [],
};

export const serch = createAsyncThunk('serch-name', async city => {
  const response = await Api(city);
  return response;
});

export const geo = createAsyncThunk('geo', async ({ latitude, longitude }) => {
  const response = await MyGeo({ latitude, longitude });
  return response;
});

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,

  reducers: {
    delCity: (state, action) => {
      state.city = state.city.filter(el => el.id !== action.payload);
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    editCity: (state, action) => {
      const pickedCity = state.city.find(it => it.id === action.payload.id);
      pickedCity.main.flag_isCelsius = action.payload.isCel;
      localStorage.setItem('city-data', JSON.stringify(state.city));
    },
  },
  extraReducers: {
    [serch.fulfilled]: (state, action) => {
      action.payload.main.tempC = Math.round(action.payload.main.temp - 273.15);
      action.payload.main.tempF = Math.round(
        1.8 * (action.payload.main.temp - 273.15) + 32
      );
      action.payload.main.feelsC = Math.round(
        action.payload.main.feels_like - 273.15
      );
      action.payload.main.feelsF = Math.round(
        1.8 * (action.payload.main.feels_like - 273.15) + 32
      );
      action.payload.main.flag_isCelsius = true;
      state.city.push(action.payload);
      localStorage.setItem('city-data', JSON.stringify(state.city));
    },

    [serch.rejected]: (state, action) => {
      alert('Server Error');
    },
    [geo.fulfilled]: (state, action) => {
      action.payload.main.tempC = Math.round(action.payload.main.temp - 273.15);
      action.payload.main.tempF = Math.round(
        1.8 * (action.payload.main.temp - 273.15) + 32
      );
      action.payload.main.feelsC = Math.round(
        action.payload.main.feels_like - 273.15
      );
      action.payload.main.feelsF = Math.round(
        1.8 * (action.payload.main.feels_like - 273.15) + 32
      );
      action.payload.main.flag_isCelsius = true;
      localStorage.setItem('geo', true);
      localStorage.setItem('city-data', JSON.stringify(action.payload));
      state.city.unshift(action.payload);
    },
  },
});

export const { delCity, setCity, editCity } = homeSlice.actions;

export default homeSlice.reducer;
