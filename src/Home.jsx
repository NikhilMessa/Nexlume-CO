import React, { useEffect, lazy, Suspense } from "react";
import SEO from "./Component/SEO/SEO";
import Hero from "./Component/Body/Hero/Hero";
import "./Home.css";

const InfiniteScroll = lazy(() =>
  import("./Component/Body/InfiniteScrolling/InfiniteScrolling")
);

const VideoDescription = lazy(() =>
  import("./Component/Body/VideoDescription/VideoDescription")
);

const ProjectsSection = lazy(() =>
  import("./Component/Body/ProjectsSection/ProjectsSection")
);

const ServicesSection = lazy(() =>
  import("./Component/Body/ServicesSection/ServicesSection")
);

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".home-container > *");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <SEO
        title="Nexlume | Website Design, App Development & Software Development Company"
        description="Nexlume is a creative website design, web development, mobile app development, UI/UX design, SEO, branding, and software development agency helping startups and businesses grow online."
        canonical="/"
        keywords="Nexlume, website design company, web development agency, app development company, UI UX design agency, SEO optimization, software development company, startup website, ecommerce website"
        image="/NX.png"
      />

      <div className="home-container">
        <Hero />

        <Suspense fallback={null}>
          <InfiniteScroll />
          <VideoDescription />
          <ProjectsSection />
          <ServicesSection />
        </Suspense>
      </div>
    </>
  );
};

export default Home;