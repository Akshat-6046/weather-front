import React from "react";
import styles from "./styles.module.css";
import ButtonCards from "../ButtonCards";
import useGetCountries from "../../hooks/useGetCountries";

const Locations = (props) => {
  const { data } = useGetCountries();

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Select City For Weather Details</div>
      <ButtonCards {...props} countries={data} />
    </div>
  );
};

export default Locations;
