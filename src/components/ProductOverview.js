import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/productService';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';

const ProductOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data); // Add this line to check the data
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  const handleSeeMore = () => {
    navigate(ROUTES.SHOP); // Navigate to the shop page when the button is clicked
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-12 overflow-x-auto" style={{ minWidth: '1024px' }}>
      <h2 className="text-3xl font-bold mb-6">Product Overview</h2>
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 font-bold">Sắp xếp theo</label>
          <select id="sort" className="bg-gray-200 px-4 py-2 rounded">
            <option value="featured">Tiêu biểu</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>
      </div>
      <ProductList products={products} />
      <div className="flex justify-center mt-8">
        <button onClick={handleSeeMore}>See More</button> {/* Attach the click handler */}
      </div>
    </div>
  );
};

export default ProductOverview;
