import React, { useState } from "react";
import styles from "./styles.module.css";

const CustomSelect = ({
  list = [],
  option = null,
  setFunction = () => {},
  defaultLabel = "Select Country",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortcmp = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const selectOption = (option) => {
    setFunction(option);
    toggleDropdown();
  };

  return (
    <div className={`${styles.custom_select} ${isOpen ? styles.open : ""}`}>
      {defaultLabel}
      <div className={styles.select_box} onClick={toggleDropdown}>
        {!!option
          ? `${option?.name || option} ${option?.unicodeFlag || ""}`
          : defaultLabel}
      </div>

      {isOpen && (
        <div className={styles.dropdown_content}>
          {list?.sort(sortcmp)?.map((item) => (
            <div
              key={item?.id || item}
              className={styles.option}
              onClick={() => selectOption(item)}
            >
              {item?.unicodeFlag} {item?.name || item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
