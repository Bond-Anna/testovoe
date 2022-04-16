const KEY = '06a1cc5423fc093dfd95cd3ed437b180';

export const Api = async city => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;

  const res = await fetch(URL);
  return res.json();
};

export const MyGeo = async ({ latitude, longitude }) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;

  const res = await fetch(URL);
  return res.json();
};
