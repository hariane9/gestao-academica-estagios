import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "20px"
        }}
      >
        <Sidebar />
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px"
        }}
      >
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;