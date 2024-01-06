import React, { useEffect } from "react";
import styles from "./styles.module.css";

function PortalModal({ content = null, setShowModal = () => {} }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div
        className={styles.modalOuterContainer}
        onClick={() => setShowModal(null)}
      ></div>
      <div className={styles.modalContainer}>{content}</div>
    </>
  );
}

export default PortalModal;
