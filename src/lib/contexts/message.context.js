import React, { useState, createContext } from "react";

export const ToastMessageContext = createContext({});

export default function ToastMessageProvider({ children }) {
  const [toastMessage, setToastMessageState] = useState({
    variant: "info",
    message: "",
    open: false,
  });

  const showToastMessage = (data) => {
    setToastMessageState({
      ...toastMessage,
      open: true,
      ...data,
    });
  };
  let toastMessageValue = { toastMessage, showToastMessage };
  return (
    <ToastMessageContext.Provider value={toastMessageValue}>
      {children}
    </ToastMessageContext.Provider>
  );
}
