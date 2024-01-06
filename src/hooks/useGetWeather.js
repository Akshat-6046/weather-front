import axios from "axios";
import { useState } from "react";
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDayFromDate = (date) => {
  const dateObject = new Date(date);
  const dayIndex = dateObject.getDay();
  return weekdays[dayIndex];
};
const formatCity = (data) => {
  if (data === "Delhi") return "New Delhi";
  return data;
};

const format = (data) => {
  const forecast = data?.forecast?.forecastday?.map((item) => {
    const day = getDayFromDate(item?.date);
    return {
      date: item?.date,
      day,
      temp: item?.day?.avgtemp_c,
      desc: item?.day?.condition?.text,
      icon: item?.day?.condition?.icon,
    };
  });

  return [...forecast];
};
function useGetWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getWeather = async (city) => {
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_END_POINT}/weather/`,
        headers: {
          "Content-Type": "application/json",
        },
        params: { name: formatCity(city) },
      });
      setData(format(res?.data));
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    getWeather,
    data,
    loading,
  };
}

export default useGetWeather;
