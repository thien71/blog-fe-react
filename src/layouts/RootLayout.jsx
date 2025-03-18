import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../components";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default RootLayout;
