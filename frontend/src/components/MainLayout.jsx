import { Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toast from "./Toast";
import { useApp } from "../context/AppContext";

function MainLayout({ children }) {
  const { logado, isMobile, mobileNavOpen, setMobileNavOpen } = useApp();

  if (!logado) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {isMobile && mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.4)",
            zIndex: 30,
            animation: "overlayIn 0.2s ease"
          }}
        />
      )}

      <Sidebar />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, padding: isMobile ? "16px" : "28px", overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <Toast />
    </div>
  );
}

export default MainLayout;
