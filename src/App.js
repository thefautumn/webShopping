import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductCategories from './components/ProductCategories';
import ProductOverview from './components/ProductOverview';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <ProductCategories />
      <ProductOverview />
      <Footer />
    </div>
  );
}

export default App;
