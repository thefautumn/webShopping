// src/pages/Shop.js
import React from 'react';
import ProductList from '../components/ProductList';

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

const products = [
  { id: 1, name: 'DRY-EX Áo Polo Half-Zip', price: '489.000 VND', image: 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/item/vngoods_58_476248.jpg?width=320', rating: 4.5 },
  { id: 2, name: 'Áo Polo Vải Dry Pique | Kẻ Sọc', price: '489.000 VND', image: 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/465191/item/vngoods_56_465191.jpg?width=320', rating: 5.0 },
  // Add more products as needed
];

const ShopPage = () => {
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
          <span>Kết Quả: 257 Sản phẩm</span>
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
