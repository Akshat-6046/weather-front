import axios from "axios";
import { useState, useEffect } from "react";

function useGetCountries() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCountries = async () => {
    try {
      setData(null);
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_END_POINT}/countries/`,
      });

      setData(res?.data);
    } catch (error) {
      setData(error?.response?.data || error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  return {
    getCountries,
    data,
    loading,
  };
}

export default useGetCountries;
