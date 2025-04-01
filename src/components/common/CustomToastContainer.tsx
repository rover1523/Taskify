"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide, toast } from "react-toastify";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1700}
      hideProgressBar={true}
      closeButton={false}
      pauseOnHover={false}
      newestOnTop
      transition={Slide}
    />
  );
};

export default CustomToastContainer;
