import React from "react";
import styles from "./styles.module.css";
import { TailSpin as Loader } from "react-loader-spinner";
const Weather = ({ weatherData, loading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>4 Day Forecast</div>
      {loading ? (
        <Loader
          visible={true}
          height="100"
          width="100"
          color="#fff"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{ marginTop: "40px" }}
          wrapperClass=""
        />
      ) : null}
      {!loading && !!weatherData ? (
        <div className={styles.box}>
          {(weatherData || []).map((item, index) => {
            return (
              <div className={styles.card}>
                <div className={styles.cardMain}>{item?.day}</div>
                <div className={styles.cardToday}>
                  {index === 0 ? "Today" : ""}
                </div>
                <div className={styles.cardDate}>{item?.date}</div>
                <div className={styles.cardTemp}>{item?.temp}&deg;C</div>
                <div className={styles.cardDesc}>
                  {item?.desc}
                  <img src={item?.icon} alt="Status" />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
