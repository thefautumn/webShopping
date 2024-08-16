// src/pages/Shop.js
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { getProducts } from '../services/productService'; // Import the getProducts service

const categories = [
  {
    title: 'Áo Thun, Áo Ni & Áo Giả Lông Cừu',
    items: ['Áo Thun', 'Áo Polo', 'Áo Thun In Họa Tiết', 'Áo Ni & Hoodie', 'Áo Len & Cardigan', 'Áo Sơ Mi Công Sở', 'Áo Sơ Mi Casual', 'PEACE FOR ALL'],
  },
  {
    title: 'Sweaters & Knitwear',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
  {
    title: 'Phụ Kiện',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
  // Add more categories as needed
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Fetch products from backend
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
    <div className="container mx-auto px-4 py-12 flex overflow-x-auto" style={{ minWidth: '1024px' }}>
      <div className="w-1/4 pr-8">
        {categories.map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="font-bold text-lg mb-4">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-800 hover:text-black">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-3/4">
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
        <ProductList products={products} />
        <div className="flex justify-center mt-8">
          <button className="bg-gray-200 px-6 py-2 rounded">Tải Thêm</button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
