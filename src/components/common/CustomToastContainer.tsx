"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastContainerProps } from "react-toastify";

const CustomToastContainer = (props: ToastContainerProps) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      closeOnClick
      pauseOnHover={false}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop
      toastClassName="custom-toast"
    />
  );
};

export default CustomToastContainer;
