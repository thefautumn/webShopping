import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/productService'; 

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();  
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-lg">
      <div className="flex flex-col w-full">
        {/* Main content area for products */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <span>Kết Quả: {products.length} Sản phẩm</span> {/* Display the number of products */}
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 font-bold">Sắp Xếp Theo</label>
              <select id="sort" className="bg-gray-200 px-4 py-2 rounded">
                <option value="featured">Tiêu Biểu</option>
                <option value="price-asc">Giá: Thấp Đến Cao</option>
                <option value="price-desc">Giá: Cao Đến Thấp</option>
                <option value="newest">Mới Nhất</option>
              </select>
            </div>
          </div>

          {/* Product list display */}
          <ProductList products={products} />

          {/* Load more button */}
          <div className="flex justify-center mt-8">
            <button className="bg-gray-200 px-6 py-2 rounded">Tải Thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
