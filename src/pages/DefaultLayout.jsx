import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";

import { useGlobalContext } from "../contexts/GlobalContext";
export default function DefaultLayout() {
  const { isLoading } = useGlobalContext();
  return (
    <>
      <HeaderComponent />
      {isLoading && <Loader />}
      <main className="container py-4">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}
