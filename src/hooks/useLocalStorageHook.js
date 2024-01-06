import { useState, useEffect } from "react";

function useLocalStorageHook({ locations, setLocations }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const localStorageRaw = localStorage.getItem("locations");
    let localStorageParsed = [];
    if (localStorageRaw) {
      localStorageParsed = JSON.parse(localStorageRaw);
    }

    if (localStorageParsed?.length > 0) {
      setLocations(localStorageParsed);
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if ((locations || [])?.length > 0) {
      localStorage.setItem("locations", JSON?.stringify(locations));
    }
  }, [locations]);

  return {
    loading,
  };
}

export default useLocalStorageHook;
