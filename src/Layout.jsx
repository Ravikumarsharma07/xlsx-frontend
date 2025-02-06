import React from "react";
import Hero from "./components/Hero.tsx";
import Navbar from "./components/Navbar.tsx";
import JsonFileContextProvider from "./context/JsonFileContextProvider.tsx";

const Layout = () => {
  return (
    <>
      <JsonFileContextProvider>
        <Navbar />
        <Hero />
      </JsonFileContextProvider>
    </>
  );
};

export default Layout;
