"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      closeButton={false}
      hideProgressBar={true}
      autoClose={2500}
      pauseOnHover={false}
      newestOnTop
      transition={Slide}
    />
  );
};

export default CustomToastContainer;
