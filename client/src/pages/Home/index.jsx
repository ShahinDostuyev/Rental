import React from "react";
import ImageComponent from "../../components/ImageComponent";
import SearchBar from "../../components/SearchBar";
import Layout from "../../layout/Layout";

function Home() {
  console.log("salam home");
  return (
    <Layout> 
      <ImageComponent />
      <SearchBar />
    </Layout>
  );
}

export default Home;
