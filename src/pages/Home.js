
import Banner from '../components/Banner';
import ProductCategories from '../components/ProductCategories';
import ProductOverview from '../components/ProductOverview';
import ScrollToTopButton from '../components/ScrollTopButton';
const Home = () => (
    <>
    <div>
    <Banner />
      <ProductCategories />
      <ProductOverview />
    </div>
    <ScrollToTopButton />
   
    </>
    
  );
  export default Home;
  