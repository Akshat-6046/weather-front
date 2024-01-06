import axios from "axios";
import { useState } from "react";

const format = (data) => {
  return (data || []).map((item) => {
    return { name: item?.city };
  });
};
function useGetCities() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getCities = async (country) => {
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "get",
        url:`${process.env.REACT_APP_API_END_POINT}/cities/`,
        headers: {
          "Content-Type": "application/json",
        },
        params: { name: country?.name || "India" },
      });

      setData(format(res?.data || []));
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCities: getCities,
    data,
    loading,
  };
}

export default useGetCities;
