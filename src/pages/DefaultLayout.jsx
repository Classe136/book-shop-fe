import { HeaderComponent } from "../components/HeaderComponent";
import { FooterComponent } from "../components/FooterComponent";
import { Outlet } from "react-router-dom";
export default function DefaultLayout() {
  return (
    <>
      <HeaderComponent />
      <main className="container py-4">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}
