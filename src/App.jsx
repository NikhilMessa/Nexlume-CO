import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import Footer from "./Component/Footer/Footer";
import Navbar from "./Component/Navbar/Navbar";
import Contact from "./Component/Contacts/Contact";
import Services from "./Component/Service/Service";
import Team from "./Component/Team/Team";
import { prefetchTeam } from "./lib/teamCache";
import { RingLoader } from "react-spinners";

const Projects = lazy(() => import("./Component/Projects/Project"));
const ProjectDetails = lazy(() =>
  import("./Component/Projects/ProjectDetailsNew")
);

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
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    prefetchTeam();

    fetch("https://nexlume-backend.onrender.com/api/projects")
      .then((r) => r.json())
      .then((json) => {
        const list = Array.isArray(json) ? json : json.data || [];
        sessionStorage.setItem("nexlume_projects", JSON.stringify(list));
      })
      .catch(() => {});
  }, []);

  return (
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
  );
}

export default App;