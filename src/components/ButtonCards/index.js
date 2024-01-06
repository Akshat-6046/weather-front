import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import CustomSelect from "../CustomSelect";
import Modal from "../modal";
import useGetCities from "../../hooks/useGetCities";
import { ThreeDots as Loader } from "react-loader-spinner";
const ButtonCards = ({
  locations,
  handleLocationSave,
  countries,
  currentLocation,
  setCurrentLocation,
  deleteLocations = () => {},
}) => {
  const { data: cityList = [], fetchCities, loading } = useGetCities();

  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(false);
  console.log(cityList, selectedCountry, "ppppp");

  const handleAddEvent = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setCity(null);
    if (selectedCountry) {
      fetchCities(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    setError(false);
  }, [city, selectedCountry]);

  return (
    <>
      <div className={styles.container}>
        {locations.map((item) => {
          return (
            <div
              role="presentation"
              key={item}
              className={
                currentLocation === item ? styles.active : styles.button
              }
              onClick={() => setCurrentLocation(item)}
            >
              <div className={styles.text}>{item}</div>
              {currentLocation !== item ? (
                <div
                  role="presentation"
                  onClick={(e) => deleteLocations(e, item)}
                  className={styles.delete}
                >
                  &#x2716;
                </div>
              ) : null}
            </div>
          );
        })}
        <button className={styles.button} onClick={handleAddEvent}>
          + Add City
        </button>
      </div>

      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          content={
            <>
              <div className={styles.heading}>Add City</div>
              <div className={styles.container}>
                <CustomSelect
                  list={countries}
                  option={selectedCountry}
                  setFunction={setSelectedCountry}
                />
                {selectedCountry && !loading ? (
                  <CustomSelect
                    list={cityList}
                    option={city}
                    setFunction={setCity}
                    defaultLabel="Select City"
                  />
                ) : null}
                <div className={styles.buttoncontainer}>
                  {loading ? (
                    <Loader
                      visible={true}
                      height="30"
                      width="60"
                      color="#36c183"
                      radius="16"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : null}
                  {selectedCountry && !loading ? (
                    <button
                      className={styles.savebutton}
                      onClick={() => {
                        if (!city) {
                          setError(true);
                          return;
                        }
                        handleLocationSave(city);
                        setCity(null);
                        setShowModal(false);
                      }}
                    >
                      Save
                    </button>
                  ) : null}
                  <button
                    className={styles.savebutton}
                    onClick={() => setShowModal(false)}
                    style={{ background: "#ff0000af" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {error ? (
                <div className={styles.error}>Country or City is empty!</div>
              ) : null}
            </>
          }
        />
      ) : null}
    </>
  );
};

export default ButtonCards;
