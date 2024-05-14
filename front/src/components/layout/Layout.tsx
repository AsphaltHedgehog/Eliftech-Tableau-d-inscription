import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import { Slide, ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />

      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
