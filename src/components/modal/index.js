import React from "react";
import ReactDOM from "react-dom";
import PortalModal from "./PortalModal";
function Modal(props) {
  return ReactDOM.createPortal(
    <PortalModal {...props} />,
    document.getElementById("portalReact")
  );
}

export default Modal;
