import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useState, useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import Footer from "./Component/Footer/Footer";
import Navbar from "./Component/Navbar/Navbar";
import Contact from "./Component/Contacts/Contact";
import Services from "./Component/Service/Service";
import Team from "./Component/Team/Team";
import { prefetchTeam } from "./lib/teamCache";

// Lazy load heavy 3D components
const Projects = lazy(() => import("./Component/Projects/Project"));
const ProjectDetails = lazy(
  () => import("./Component/Projects/ProjectDetailsNew"),
);

// Loading fallback component for lazy-loaded routes
const LazyLoadingFallback = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0a0a0a",
    }}
  >
    <RingLoader color="#d40000ff" size={40} />
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change with smooth animation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleLoad = () => {
       setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!loading) prefetchTeam();
  }, [loading]);

  return (
    <>
      {loading ? (
        // 🌀 Loader
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0a0a0a",
          }}
        >
          <RingLoader color="#d40000ff" size={60} />
        </div>
      ) : (
        // 🌐 Actual App
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<LazyLoadingFallback />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <Suspense fallback={<LazyLoadingFallback />}>
                  <ProjectDetails />
                </Suspense>
              }
            />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
          </Routes>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      )}
    </>
  );
}

export default App;
